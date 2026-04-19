"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Activity, 
  BarChart3, 
  Home,
  ChevronLeft,
  ChevronRight,
  History
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLayout } from "./dashboard-shell";

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { isCollapsed, setCollapsed } = useLayout();

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      active: pathname === "/analytics",
    },
    {
      label: "History",
      icon: History,
      href: "/history",
      active: pathname === "/history",
    },
    {
      label: "Activity",
      icon: Activity,
      href: "/activity",
      active: pathname === "/activity",
    },
  ];

  return (
    <div className={cn("border-r bg-white min-h-screen flex flex-col relative", className)}>
      {/* Desktop Toggle Button */}
      <button
        onClick={() => setCollapsed(!isCollapsed)}
        className="hidden md:flex absolute -right-4 top-6 h-8 w-8 items-center justify-center rounded-full border bg-white text-slate-500 shadow-sm hover:text-slate-700 hover:bg-slate-50 z-50 transition-transform"
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      <div className="space-y-4 py-4 flex-grow overflow-y-auto no-scrollbar">
        <div className="px-3 py-2">
          <h2 className={cn(
            "mb-2 font-bold tracking-tight text-blue-600 transition-all duration-300",
            isCollapsed ? "md:px-2 md:text-center md:text-xl px-4 text-2xl" : "px-4 text-2xl"
          )}>
            <span className={cn(isCollapsed ? "hidden md:inline" : "hidden")}>SF</span>
            <span className={cn(isCollapsed ? "md:hidden inline" : "inline")}>SmartFit</span>
          </h2>
          <div className="space-y-1 mt-6">
            {routes.map((route) => (
              <Link
                key={route.label}
                href={route.href}
                className={cn(
                  "flex items-center rounded-lg transition-all font-medium group",
                  isCollapsed ? "md:justify-center md:p-2 gap-3 px-3 py-2" : "gap-3 px-3 py-2",
                  route.active 
                    ? "text-blue-600 bg-blue-50/50" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                )}
                title={isCollapsed ? route.label : undefined}
              >
                <route.icon className={cn("h-5 w-5 shrink-0", route.active ? "text-blue-600" : "text-slate-500 group-hover:text-slate-900")} />
                <span className={cn(isCollapsed ? "md:hidden inline" : "inline")}>{route.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
