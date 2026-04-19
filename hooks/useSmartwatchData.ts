"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { ref, onValue, query, limitToLast, orderByChild } from 'firebase/database';
import { useDevice } from '@/components/device-provider';

export interface DeviceData {
  deviceId: string;
  deviceName: string;
  lastSync: number;
  status: 'Online' | 'Offline';
}

export interface HealthMetric {
  timestamp: number;
  heartRate?: number;
  steps?: number;
  oxygenSaturation?: number;
  heartRateVariabilityRmssd?: number;
  activeCaloriesBurned?: number;
}

export interface DashboardData {
  loading: boolean;
  device: DeviceData | null;
  latestMetric: HealthMetric | null;
  history: HealthMetric[];
}

export function useSmartwatchData() {
  const { selectedDeviceId } = useDevice();
  const [data, setData] = useState<DashboardData>({
    loading: true,
    device: null,
    latestMetric: null,
    history: [],
  });

  useEffect(() => {
    if (!selectedDeviceId) {
      setData(prev => ({ ...prev, loading: false, device: null, history: [], latestMetric: null }));
      return;
    }

    // 1. Listen to the currently selected device to get its details & sync status
    const deviceRef = ref(db, `devices/${selectedDeviceId}`);
    const unsubscribeDevice = onValue(deviceRef, (snapshot) => {
      if (snapshot.exists()) {
        const devData = snapshot.val();
        
        // Determine online status (offline if no sync for 10 seconds)
        const now = Date.now();
        const isOnline = (now - devData.lastSync) < 10000;
        
        const device = {
          deviceId: selectedDeviceId,
          deviceName: devData.deviceName || 'Smartwatch',
          lastSync: devData.lastSync,
          status: isOnline ? 'Online' : 'Offline' as 'Online'|'Offline',
        };

        setData(prev => ({ ...prev, device }));

        // 2. Listen to this device's health data (last 30 entries)
        const healthQuery = query(ref(db, `health_data/${selectedDeviceId}`), limitToLast(30));
        onValue(healthQuery, (healthSnapshot) => {
          if (healthSnapshot.exists()) {
            const healthData = healthSnapshot.val();
            
            // Sort by timestamp
            const historyArray: HealthMetric[] = Object.keys(healthData)
              .map(key => ({
                timestamp: parseInt(key),
                ...healthData[key]
              }))
              .map(item => ({
                timestamp: item.timestamp,
                heartRate: item.heartRate,
                steps: item.steps,
                oxygenSaturation: item.oxygenSaturation,
                heartRateVariabilityRmssd: item.heartRateVariabilityRmssd,
                activeCaloriesBurned: item.activeCaloriesBurned,
              }))
              .sort((a, b) => a.timestamp - b.timestamp);

            const latestMetric = historyArray.length > 0 ? historyArray[historyArray.length - 1] : null;

            setData(prev => ({
              ...prev,
              history: historyArray,
              latestMetric,
              loading: false
            }));
          } else {
            setData(prev => ({ ...prev, history: [], latestMetric: null, loading: false }));
          }
        });
      } else {
        setData(prev => ({ ...prev, loading: false, device: null, history: [], latestMetric: null }));
      }
    });

    // Cleanup interval for forcing "Online/Offline" check
    const statusCheckInterval = setInterval(() => {
      setData(prev => {
        if (prev.device) {
          const isOnline = (Date.now() - prev.device.lastSync) < 10000;
          if (prev.device.status === (isOnline ? 'Online' : 'Offline')) return prev; // no change
          return {
            ...prev,
            device: {
              ...prev.device,
              status: isOnline ? 'Online' : 'Offline'
            }
          }
        }
        return prev;
      })
    }, 3000);

    return () => {
      unsubscribeDevice();
      clearInterval(statusCheckInterval);
    };
  }, [selectedDeviceId]);

  return data;
}
