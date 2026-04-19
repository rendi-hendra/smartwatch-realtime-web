"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { ref, onValue, query, limitToLast } from 'firebase/database';
import { HealthMetric, DeviceData } from './useSmartwatchData';
import { useDevice } from '@/components/device-provider';

export interface AnalyticsStats {
  avgHeartRate: number;
  maxHeartRate: number;
  minHeartRate: number;
  avgHrv: number;
  totalSteps: number;
  avgSpO2: number;
  hrZones: {
    resting: number; // < 60
    fatBurn: number; // 60 - 90
    cardio: number;  // 90 - 120
    peak: number;    // > 120
  };
}

export interface AnalyticsData {
  loading: boolean;
  device: DeviceData | null;
  history: HealthMetric[];
  stats: AnalyticsStats | null;
}

export function useAnalyticsData() {
  const { selectedDeviceId } = useDevice();
  const [data, setData] = useState<AnalyticsData>({
    loading: true,
    device: null,
    history: [],
    stats: null,
  });

  useEffect(() => {
    if (!selectedDeviceId) {
      setData(prev => ({ ...prev, loading: false, device: null, history: [], stats: null }));
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

        const healthQuery = query(ref(db, `health_data/${selectedDeviceId}`), limitToLast(200));
          onValue(healthQuery, (healthSnapshot) => {
            if (healthSnapshot.exists()) {
              const healthData = healthSnapshot.val();
              const historyArray: HealthMetric[] = Object.keys(healthData)
                .map(key => ({
                  timestamp: parseInt(key),
                  ...healthData[key]
                }))
                .sort((a, b) => a.timestamp - b.timestamp);

              // 3. Calculate Stats
              const hrValues = historyArray.map(m => m.heartRate || 0).filter(v => v > 0);
              const hrvValues = historyArray.map(m => m.heartRateVariabilityRmssd || 0).filter(v => v > 0);
              const spo2Values = historyArray.map(m => m.oxygenSaturation || 0).filter(v => v > 0);
              const latestSteps = historyArray.length > 0 ? (historyArray[historyArray.length - 1].steps || 0) : 0;

              const zones = { resting: 0, fatBurn: 0, cardio: 0, peak: 0 };
              hrValues.forEach(hr => {
                if (hr < 60) zones.resting++;
                else if (hr < 90) zones.fatBurn++;
                else if (hr < 120) zones.cardio++;
                else zones.peak++;
              });

              const stats: AnalyticsStats = {
                avgHeartRate: Math.round(hrValues.reduce((a, b) => a + b, 0) / (hrValues.length || 1)),
                maxHeartRate: Math.max(...(hrValues.length ? hrValues : [0])),
                minHeartRate: Math.min(...(hrValues.length ? hrValues : [0])),
                avgHrv: Math.round(hrvValues.reduce((a, b) => a + b, 0) / (hrvValues.length || 1)),
                totalSteps: latestSteps,
                avgSpO2: Math.round(spo2Values.reduce((a, b) => a + b, 0) / (spo2Values.length || 1)),
                hrZones: zones
              };

              setData({
                loading: false,
                device,
                history: historyArray,
                stats
              });
            } else {
              setData(prev => ({ ...prev, loading: false, device, history: [], stats: null }));
            }
          });
      } else {
        setData(prev => ({ ...prev, loading: false, device: null }));
      }
    });

    return () => unsubscribeDevice();
  }, [selectedDeviceId]);

  return data;
}
