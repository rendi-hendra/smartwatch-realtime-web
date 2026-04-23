"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { ref, onValue, query } from 'firebase/database';
import { useDevice } from '@/components/device-provider';

export interface PersonalBestData {
  maxHeartRate: number;
  maxSteps: number;
  maxCalories: number;
  loading: boolean;
}

export function usePersonalBest() {
  const { selectedDeviceId } = useDevice();
  const [pb, setPb] = useState<PersonalBestData>({
    maxHeartRate: 0,
    maxSteps: 0,
    maxCalories: 0,
    loading: true,
  });

  useEffect(() => {
    if (!selectedDeviceId) {
      setPb({ maxHeartRate: 0, maxSteps: 0, maxCalories: 0, loading: false });
      return;
    }

    setPb(prev => ({ ...prev, loading: true }));
    
    // Fetch all health data to find all-time max for this device
    const healthQuery = query(ref(db, `health_data/${selectedDeviceId}`));
    const unsubscribe = onValue(healthQuery, (snapshot) => {
      if (snapshot.exists()) {
        const healthData = snapshot.val();
        
        let maxHeartRate = 0;
        let maxSteps = 0;
        let maxCalories = 0;
        
        Object.values(healthData).forEach((item: any) => {
          if (item.heartRate && item.heartRate > maxHeartRate) maxHeartRate = item.heartRate;
          if (item.steps && item.steps > maxSteps) maxSteps = item.steps;
          if (item.activeCaloriesBurned && item.activeCaloriesBurned > maxCalories) maxCalories = item.activeCaloriesBurned;
        });

        setPb({
          maxHeartRate,
          maxSteps,
          maxCalories,
          loading: false
        });
      } else {
        setPb({ maxHeartRate: 0, maxSteps: 0, maxCalories: 0, loading: false });
      }
    });

    return () => unsubscribe();
  }, [selectedDeviceId]);

  return pb;
}
