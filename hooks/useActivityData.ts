"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { ref, onValue, query, limitToLast } from 'firebase/database';
import { HealthMetric, DeviceData } from './useSmartwatchData';
import { useDevice } from '@/components/device-provider';

export interface ActivitySummary {
  dailySteps: number;
  stepGoal: number;
  goalProgress: number;
  activeCalories: number;
  hourlySteps: { hour: string; steps: number }[];
  weeklySteps: { day: string; steps: number }[]; // Placeholder for now or aggregate from history
}

export interface ActivityData {
  loading: boolean;
  device: DeviceData | null;
  history: HealthMetric[];
  summary: ActivitySummary | null;
  updateStepGoal?: (newGoal: number) => void;
}

export function useActivityData() {
  const { selectedDeviceId } = useDevice();
  const [stepGoal, setStepGoalState] = useState(10000);
  const [data, setData] = useState<ActivityData>({
    loading: true,
    device: null,
    history: [],
    summary: null,
  });

  useEffect(() => {
    const savedGoal = localStorage.getItem("smartfit_step_goal");
    if (savedGoal) setStepGoalState(parseInt(savedGoal, 10));
  }, []);

  const updateStepGoal = (newGoal: number) => {
    localStorage.setItem("smartfit_step_goal", newGoal.toString());
    setStepGoalState(newGoal);
  };

  useEffect(() => {
    if (!selectedDeviceId) {
       setData(prev => ({ ...prev, loading: false, device: null, history: [], summary: null }));
       return;
    }

    const deviceRef = ref(db, `devices/${selectedDeviceId}`);
    const unsubscribeDevice = onValue(deviceRef, (snapshot) => {
      if (snapshot.exists()) {
        const devData = snapshot.val();
        
        const now = Date.now();
        const device: DeviceData = {
          deviceId: selectedDeviceId,
          deviceName: devData.deviceName || 'Smartwatch',
          lastSync: devData.lastSync,
          status: (now - devData.lastSync) < 10000 ? 'Online' : 'Offline',
        };

        const healthQuery = query(ref(db, `health_data/${selectedDeviceId}`), limitToLast(100));
          onValue(healthQuery, (healthSnapshot) => {
            if (healthSnapshot.exists()) {
              const healthData = healthSnapshot.val();
              const historyArray: HealthMetric[] = Object.keys(healthData)
                .map(key => ({
                  timestamp: parseInt(key),
                  ...healthData[key]
                }))
                .sort((a, b) => a.timestamp - b.timestamp);

              const latest = historyArray[historyArray.length - 1];
              const dailySteps = latest.steps || 0;
              const activeCalories = latest.activeCaloriesBurned || 0;

              // Aggregate hourly steps (simplified for recent entries)
              const hourlyMap: Record<string, number> = {};
              historyArray.forEach(m => {
                const hour = new Date(m.timestamp).getHours();
                const hourStr = `${hour}:00`;
                hourlyMap[hourStr] = m.steps || 0;
              });

              const hourlySteps = Object.keys(hourlyMap).map(hour => ({
                hour,
                steps: hourlyMap[hour]
              }));

              const summary: ActivitySummary = {
                dailySteps,
                stepGoal,
                goalProgress: Math.min(Math.round((dailySteps / stepGoal) * 100), 100),
                activeCalories,
                hourlySteps,
                weeklySteps: [
                  { day: "Mon", steps: 6400 },
                  { day: "Tue", steps: 8200 },
                  { day: "Wed", steps: 4900 },
                  { day: "Thu", steps: 9100 },
                  { day: "Fri", steps: 7300 },
                  { day: "Sat", steps: 11000 },
                  { day: "Sun", steps: dailySteps }
                ]
              };

              setData({
                loading: false,
                device,
                history: historyArray,
                summary,
                updateStepGoal
              });
            } else {
              setData(prev => ({ ...prev, loading: false, device, history: [], summary: null, updateStepGoal }));
            }
          });
      } else {
        setData(prev => ({ ...prev, loading: false, device: null, updateStepGoal }));
      }
    });

    return () => unsubscribeDevice();
  }, [stepGoal, selectedDeviceId]);

  return data;
}
