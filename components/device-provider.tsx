"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";

export interface DeviceBasicInfo {
  deviceId: string;
  deviceName: string;
}

interface DeviceContextType {
  availableDevices: DeviceBasicInfo[];
  selectedDeviceId: string | null;
  setSelectedDeviceId: (id: string) => void;
  isLoadingDevices: boolean;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export function useDevice() {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
}

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [availableDevices, setAvailableDevices] = useState<DeviceBasicInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceIdState] = useState<string | null>(null);
  const [isLoadingDevices, setIsLoadingDevices] = useState(true);

  // Load from local storage initially
  useEffect(() => {
    const saved = localStorage.getItem("smartfit_selected_device");
    if (saved) setSelectedDeviceIdState(saved);
  }, []);

  const setSelectedDeviceId = (id: string) => {
    localStorage.setItem("smartfit_selected_device", id);
    setSelectedDeviceIdState(id);
  };

  useEffect(() => {
    const devicesRef = ref(db, 'devices');
    const unsubscribe = onValue(devicesRef, (snapshot) => {
      if (snapshot.exists()) {
        const payload = snapshot.val();
        const devicesList: DeviceBasicInfo[] = Object.keys(payload).map((key) => ({
          deviceId: key,
          deviceName: payload[key].deviceName || 'Unknown Device',
        }));
        
        setAvailableDevices(devicesList);

        // If no device is currently selected, or the selected one isn't in the list anymore
        // Pick the first available device automatically
        setSelectedDeviceIdState((prev) => {
             // If there's no previous, or we can't find it in the new list, pick the first
             if (!prev || !devicesList.some(d => d.deviceId === prev)) {
                 const newSelection = devicesList[0].deviceId;
                 localStorage.setItem("smartfit_selected_device", newSelection);
                 return newSelection;
             }
             return prev;
        });
      } else {
        setAvailableDevices([]);
        setSelectedDeviceIdState(null);
      }
      setIsLoadingDevices(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <DeviceContext.Provider value={{ availableDevices, selectedDeviceId, setSelectedDeviceId, isLoadingDevices }}>
      {children}
    </DeviceContext.Provider>
  );
}
