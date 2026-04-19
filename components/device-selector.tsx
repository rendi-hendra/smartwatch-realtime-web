"use client";

import React from "react";
import { useDevice } from "./device-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Watch, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function DeviceSelector({ className }: { className?: string }) {
  const { availableDevices, selectedDeviceId, setSelectedDeviceId, isLoadingDevices } = useDevice();

  if (isLoadingDevices) {
    return (
      <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-500", className)}>
         <Loader2 className="h-4 w-4 animate-spin" />
         <span className="text-sm font-medium">Loading...</span>
      </div>
    );
  }

  if (availableDevices.length === 0) {
    return (
      <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-500", className)}>
         <AlertCircle className="h-4 w-4" />
         <span className="text-sm font-medium">No Devices</span>
      </div>
    );
  }

  // Gunakan ID yang terpilih, jika tidak ada pakai yang pertama sebagai fallback
  const currentId = selectedDeviceId || availableDevices[0]?.deviceId;

  return (
    <div className={className}>
      <Select value={currentId} onValueChange={setSelectedDeviceId}>
        <SelectTrigger className="w-auto min-w-[160px] max-w-[220px] h-9 bg-white border-slate-200 shadow-sm rounded-full font-medium text-slate-700 px-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <Watch className="h-4 w-4 shrink-0 text-blue-500" />
            <SelectValue placeholder="Select device" />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl border-slate-100 shadow-xl min-w-[200px]">
          {availableDevices.map((device) => (
            <SelectItem 
               key={device.deviceId} 
               value={device.deviceId}
               className="rounded-lg cursor-pointer py-2"
            >
              <div className="flex flex-col gap-0.5">
                 <span className="font-semibold text-slate-800">{device.deviceName}</span>
                 <span className="text-[10px] text-slate-400 font-mono leading-none">{device.deviceId.slice(0, 8)}...</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
