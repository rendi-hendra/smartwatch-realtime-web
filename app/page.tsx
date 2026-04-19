"use client";

import { useSmartwatchData } from "@/hooks/useSmartwatchData";
import { HeartRateChart } from "@/components/charts/heart-rate-chart";
import { ActivityChart } from "@/components/charts/activity-chart";
import { DeviceSelector } from "@/components/device-selector";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Activity, Clock, Watch, AlertCircle, Info, Heart, Loader2 } from "lucide-react";

export default function Home() {
  const { device, latestMetric, history, loading } = useSmartwatchData();

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
        <h2 className="text-xl font-medium text-slate-700">Connecting to Firebase...</h2>
      </div>
    );
  }

  // Real metrics from DB
  const spO2 = latestMetric?.oxygenSaturation || 0;
  const hrv = latestMetric?.heartRateVariabilityRmssd || 0;
  const calories = latestMetric?.activeCaloriesBurned || 0;
  const steps = latestMetric?.steps || 0;

  // Calculate trends
  const currentHR = latestMetric?.heartRate || 0;
  const previousHR = history.length > 1 ? history[history.length - 2].heartRate || 0 : 0;
  const hrDiff = currentHR - previousHR;

  // Determine HR status
  let hrStatusColor = "bg-emerald-50 text-emerald-600 border-emerald-200";
  let hrIndicatorColor = "bg-emerald-600";
  let healthText = "Normal";
  
  if (currentHR > 100 || currentHR < 60) {
    hrStatusColor = "bg-yellow-50 text-yellow-600 border-yellow-200";
    hrIndicatorColor = "bg-yellow-600";
    healthText = "Warning";
  }
  if (currentHR > 120 || currentHR < 50) {
    hrStatusColor = "bg-red-50 text-red-600 border-red-200";
    hrIndicatorColor = "bg-red-600";
    healthText = "Critical";
  }

  if (!device) {
     return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <AlertCircle className="h-12 w-12 text-slate-400 mb-4" />
        <h2 className="text-xl font-medium text-slate-700">No Devices Found</h2>
        <p className="text-slate-500">Wait for a smartwatch to sync to the Realtime Database.</p>
      </div>
    ); 
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Top Navbar Section */}
      <div className="hidden md:flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-1 text-slate-500">Real-time health monitoring overview</p>
        </div>
        <div className="flex items-center gap-4">
          <DeviceSelector />
          <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
          <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=e2e8f0" alt="User Avatar" />
          </div>
        </div>
      </div>

      {/* Realtime Summary Cards (4 Cards) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Heart Rate (LIVE) */}
        <Card className="rounded-2xl border-slate-200/60 shadow-sm bg-white overflow-hidden relative">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-slate-600">Heart Rate</CardTitle>
            <Badge variant="outline" className={`${hrStatusColor} flex items-center gap-1.5 rounded-full px-2.5 py-0.5 animate-pulse`}>
              <span className={`h-1.5 w-1.5 rounded-full ${hrIndicatorColor}`}></span>
              LIVE
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-slate-800 tracking-tight">{currentHR || '--'}</span>
              <span className="text-sm font-medium text-slate-500">bpm</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
              <div className={`h-2 w-2 rounded-full ${hrDiff > 0 ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
              <span>
                <span className={`font-medium ${hrDiff > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                   {hrDiff > 0 ? '+' : ''}{hrDiff} bpm
                </span> from last sync
              </span>
            </div>
          </CardContent>
        </Card>

        {/* SpO2 */}
        <Card className="rounded-2xl border-slate-200/60 shadow-sm bg-white overflow-hidden relative">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-slate-600">SpO2</CardTitle>
            <div className="p-1.5 bg-blue-50 text-blue-500 rounded-lg">
              <Activity className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-slate-800 tracking-tight">{spO2 || '--'}</span>
              <span className="text-sm font-medium text-slate-500">%</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none font-semibold rounded text-[10px] uppercase">Normal</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Health Status */}
        <Card className="rounded-2xl border-slate-200/60 shadow-sm bg-white overflow-hidden relative">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-slate-600">Health Status</CardTitle>
            <div className="p-1.5 bg-emerald-50 text-emerald-500 rounded-lg">
              <Heart className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-bold tracking-tight ${healthText === 'Normal' ? 'text-emerald-600' : 'text-yellow-600'}`}>
                {healthText}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-500">
              <AlertCircle className="h-3.5 w-3.5 text-slate-400" />
              <span>{healthText === 'Normal' ? 'No anomalies detected' : 'Abnormal HR detected'}</span>
            </div>
          </CardContent>
        </Card>

        {/* Device Status */}
        <Card className="rounded-2xl border-slate-200/60 shadow-sm bg-white overflow-hidden relative">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-slate-600">Device Status</CardTitle>
            <Badge variant="outline" className={`${device.status === 'Online' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-600 border-slate-200'} flex items-center gap-1.5 rounded-full px-2 py-0.5`}>
              {device.status}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Watch className="h-8 w-8 text-slate-700" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-800 tracking-tight line-clamp-1" title={device.deviceName}>{device.deviceName}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-500">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>Last sync: <strong>{new Date(device.lastSync).toLocaleTimeString()}</strong></span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid Layout */}
      <div className="grid gap-6 md:grid-cols-7">
        
        {/* LEFT COLUMN: Main Chart & Secondary Section */}
        <div className="md:col-span-5 flex flex-col gap-6">
          
          {/* Main Chart Section: Heart Rate Monitoring */}
          <Card className="rounded-2xl border-slate-200/60 shadow-sm bg-white overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <CardTitle className="text-lg text-slate-800">Heart Rate Monitoring</CardTitle>
                <CardDescription>Real-time analytics over the last points.</CardDescription>
              </div>
              <div className="flex flex-col items-end gap-1 text-right">
                <Badge variant="outline" className={`${hrStatusColor} px-2.5 rounded-full font-semibold mb-1`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${hrIndicatorColor} mr-1.5 animate-pulse inline-block`}></span>
                  LIVE
                </Badge>
                <span className="text-[11px] text-slate-400 font-medium">Last update: {latestMetric ? new Date(latestMetric.timestamp).toLocaleTimeString() : '--'}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6 pl-2 pb-6">
              <HeartRateChart history={history} />
            </CardContent>
          </Card>

          {/* Secondary Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="rounded-2xl border-slate-200/60 shadow-sm bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-slate-800">Movement History</CardTitle>
                <CardDescription>Steps progress over recent syncs</CardDescription>
              </CardHeader>
              <CardContent className="pl-0 pb-6 pt-2">
                <ActivityChart history={history} />
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-slate-200/60 shadow-sm bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-slate-800">Calorie Burn & HRV</CardTitle>
                <CardDescription>Latest physiological metrics</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-500">Active Calories</p>
                    <p className="text-2xl font-bold text-slate-800">{calories} <span className="text-sm font-normal text-slate-400">kcal</span></p>
                  </div>
                  <div className="p-2 bg-orange-50 text-orange-500 rounded-lg">
                    <Activity className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-500">HRV (RMSSD)</p>
                    <p className="text-2xl font-bold text-slate-800">{hrv} <span className="text-sm font-normal text-slate-400">ms</span></p>
                  </div>
                  <div className="p-2 bg-purple-50 text-purple-500 rounded-lg">
                    <Clock className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* RIGHT COLUMN: Right Panel (Secondary Information) */}
        <div className="md:col-span-2 flex flex-col gap-6">
          
          {/* Quick Insight Box */}
          <Card className="rounded-2xl border border-blue-100 shadow-sm bg-gradient-to-b from-blue-50 to-white overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Info className="h-5 w-5" />
                <CardTitle className="text-sm font-semibold">Quick Insight</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mt-1">
                <li className="flex gap-2">
                  <div className={`mt-1 h-1.5 w-1.5 rounded-full ${healthText === 'Normal' ? 'bg-blue-500' : 'bg-red-500'} shrink-0`} />
                  <p className="text-sm text-slate-700 leading-snug">
                    {healthText === 'Normal' ? 'Heart rate is completely stable.' : 'Heart Rate anomaly detected!'}
                  </p>
                </li>
                <li className="flex gap-2">
                  <div className={`mt-1 h-1.5 w-1.5 rounded-full ${device.status === 'Online' ? 'bg-emerald-500' : 'bg-slate-500'} shrink-0`} />
                  <p className="text-sm text-slate-700 leading-snug">
                    {device.status === 'Online' ? 'Device connected. Streaming live.' : 'Device disconnected.'}
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Recent Activity Log */}
          <Card className="rounded-2xl border-slate-200/60 shadow-sm bg-white flex-1 flex flex-col overflow-hidden max-h-[500px]">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-3 pt-4">
              <CardTitle className="text-sm font-semibold text-slate-800">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto custom-scrollbar flex-1">
              <div className="divide-y divide-slate-50">
                
                {history.length === 0 && (
                   <div className="p-6 text-center text-slate-400 text-sm">No activity recorded yet</div>
                )}
                
                {/* Generate Log Entries dynamically based on history array (reversed for newest first) */}
                {[...history].reverse().map((item, index) => {
                  const date = new Date(item.timestamp);
                  const timeStr = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                  
                  let color = "bg-slate-300";
                  let message = "Routine Check";
                  if (item.heartRate! > 100) { color = "bg-red-400"; message = "HR Spike Detected"; }
                  else if (item.heartRate! > 80) { color = "bg-blue-400"; message = "Elevated HR"; }
                  else if (item.heartRate! < 60) { color = "bg-teal-400"; message = "Low HR Detected"; }
                  
                  return (
                    <div key={item.timestamp} className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-4">
                      <div className="text-xs font-medium text-slate-400 w-12 pt-0.5">{timeStr}</div>
                      <div className={`h-2 w-2 mt-1.5 rounded-full ${color} shrink-0`}></div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">{message}</p>
                        <p className="text-sm text-slate-500">{timeStr} → HR {item.heartRate || '--'} bpm</p>
                      </div>
                    </div>
                  );
                })}

              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
