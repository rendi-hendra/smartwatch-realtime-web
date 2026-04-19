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
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <span className="text-xl font-bold tracking-tight text-blue-600">SmartFit</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <DeviceSelector className="scale-75 origin-right -mr-2 sm:scale-100 sm:mr-0" />
        <button className="relative rounded-full p-2 text-slate-400 hover:text-slate-500 hover:bg-slate-100 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-red-600 ring-2 ring-white"></span>
        </button>
        <Avatar className="h-8 w-8 border border-slate-200">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
