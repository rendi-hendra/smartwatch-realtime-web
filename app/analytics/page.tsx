"use client";

import { useAnalyticsData } from "@/hooks/useAnalyticsData";
import { AnalyticsTrendsChart } from "@/components/charts/analytics-charts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Heart, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Target,
  Loader2,
  AlertCircle
} from "lucide-react";

export default function AnalyticsPage() {
  const { device, history, stats, loading } = useAnalyticsData();

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
        <h2 className="text-xl font-medium text-slate-700">Analyzing your data...</h2>
      </div>
    );
  }

  if (!device || !stats) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <AlertCircle className="h-12 w-12 text-slate-400 mb-4" />
        <h2 className="text-xl font-medium text-slate-700">No Analytics Data</h2>
        <p className="text-slate-500">Could not find enough history to generate insights.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">Analytics</h2>
          <p className="text-sm text-muted-foreground mt-1 text-slate-500">In-depth health patterns and performance metrics</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border-slate-200/60 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" /> Avg Heart Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">{stats.avgHeartRate} <span className="text-sm font-normal text-slate-400">bpm</span></div>
            <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
               {stats.avgHeartRate > 80 ? <TrendingUp className="h-3 w-3 text-red-500" /> : <TrendingDown className="h-3 w-3 text-emerald-500" />}
               <span>Compared to resting avg</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/60 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-500" /> Max / Min HR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">
              {stats.maxHeartRate} / {stats.minHeartRate}
            </div>
            <div className="mt-1 text-xs text-slate-400">Highest and lowest today</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/60 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-500" /> Avg HRV
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">{stats.avgHrv} <span className="text-sm font-normal text-slate-400">ms</span></div>
            <div className="mt-1 text-xs text-slate-400">Autonomic nervous system recovery</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/60 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-500" /> Oxygen Saturation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">{stats.avgSpO2}<span className="text-sm font-normal text-slate-400">%</span></div>
            <Badge className="mt-2 bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-50 pointer-events-none">Optimal Range</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-1">
        {/* Trend Chart (Full Width) */}
        <Card className="rounded-2xl border-slate-200/60 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Heart Rate vs Steps Trend</CardTitle>
            <CardDescription>Correlation between activity intensity and heart response</CardDescription>
          </CardHeader>
          <CardContent>
            <AnalyticsTrendsChart history={history} />
          </CardContent>
        </Card>
      </div>

      {/* Insights Section */}
      <Card className="rounded-2xl border-blue-100 shadow-sm bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
             <TrendingUp className="h-5 w-5 text-blue-600" /> Smart Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
           <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-700">Activity Level</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                   Your step count reached {stats.totalSteps} today. 
                   {stats.totalSteps > 10000 ? " Excellent consistency!" : " You're on your way to your 10k goal."}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-700">Heart Health</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                   Resting average at {stats.minHeartRate} bpm. 
                   {stats.avgHrv > 50 ? " High HRV indicates good recovery status." : " HRV is stable; keep monitoring for fatigue."}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-700">Oxygen Levels</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                   Consistency at {stats.avgSpO2}% SpO2 confirms healthy oxygen absorption throughout the monitored period.
                </p>
              </div>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
