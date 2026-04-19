"use client";

import React, { useState, createContext, useContext } from "react";
import { Sidebar } from "./sidebar";
import { MobileHeader } from "./mobile-header";
import { DeviceProvider } from "./device-provider";
import { cn } from "@/lib/utils";

interface LayoutContextType {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) throw new Error("useLayout must be used within DashboardShell");
  return context;
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setCollapsed] = useState(false);

  return (
    <DeviceProvider>
      <LayoutContext.Provider value={{ isSidebarOpen, setSidebarOpen, isCollapsed, setCollapsed }}>
        <div className="flex min-h-screen w-full bg-slate-50 overflow-hidden">
          {/* Sidebar Overlay (Mobile Only) */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden" 
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <Sidebar 
            className={cn(
              "fixed inset-y-0 left-0 z-50 transition-all duration-300 md:relative",
              isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
              isCollapsed ? "md:w-20 w-64" : "w-64"
            )} 
          />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
            <main className="flex-1 overflow-y-auto custom-scrollbar">
              {children}
            </main>
          </div>
        </div>
      </LayoutContext.Provider>
    </DeviceProvider>
  );
}
