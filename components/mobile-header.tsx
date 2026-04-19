"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Menu, X } from "lucide-react";
import { useLayout } from "./dashboard-shell";
import { DeviceSelector } from "./device-selector";

export function MobileHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { isSidebarOpen } = useLayout();

  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b bg-white shadow-sm sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        <span className="text-xl font-bold tracking-tight text-blue-600">
          SmartFit
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <DeviceSelector className="scale-100 origin-right -mr-2 sm:scale-100 sm:mr-0" />
      </div>
    </div>
  );
}
