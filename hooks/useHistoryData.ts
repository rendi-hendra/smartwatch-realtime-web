"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { ref, onValue, query, orderByChild, startAt, endAt } from 'firebase/database';
import { HealthMetric, DeviceData } from './useSmartwatchData';
import { useDevice } from '@/components/device-provider';

export interface HistoryData {
  loading: boolean;
  device: DeviceData | null;
  history: HealthMetric[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export function useHistoryData(initialDate: Date = new Date()) {
  const { selectedDeviceId } = useDevice();
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [data, setData] = useState<Omit<HistoryData, 'selectedDate' | 'setSelectedDate'>>({
    loading: true,
    device: null,
    history: [],
  });

  useEffect(() => {
    setData(prev => ({ ...prev, loading: true }));
    
    if (!selectedDeviceId) {
      setData({ loading: false, device: null, history: [] });
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

          // Calculate start and end of the selected date
          const startOfDay = new Date(selectedDate);
          startOfDay.setHours(0, 0, 0, 0);
          const startTimestamp = startOfDay.getTime();

          const endOfDay = new Date(selectedDate);
          endOfDay.setHours(23, 59, 59, 999);
          const endTimestamp = endOfDay.getTime();

          // Query data within the specific day. In Realtime Database, keys are ordered lexicographically by default,
          // but since keys are stringified numbers, we might need a generic approach.
          // Since we query all data for the device, and filter locally if Firebase querying by key range fails.
          // Wait, startAt and endAt work on keys if we use orderByKey()
          
          const healthQuery = query(
            ref(db, `health_data/${selectedDeviceId}`)
          );

          onValue(healthQuery, (healthSnapshot) => {
            if (healthSnapshot.exists()) {
              const healthData = healthSnapshot.val();
              const historyArray: HealthMetric[] = Object.keys(healthData)
                .map(key => ({
                  timestamp: parseInt(key),
                  ...healthData[key]
                }))
                .filter(m => m.timestamp >= startTimestamp && m.timestamp <= endTimestamp)
                .sort((a, b) => a.timestamp - b.timestamp);

              setData({
                loading: false,
                device,
                history: historyArray,
              });
            } else {
              setData({ loading: false, device, history: [] });
            }
          });
      } else {
        setData({ loading: false, device: null, history: [] });
      }
    });

    return () => unsubscribeDevice();
  }, [selectedDate, selectedDeviceId]);

  return {
    ...data,
    selectedDate,
    setSelectedDate
  };
}
