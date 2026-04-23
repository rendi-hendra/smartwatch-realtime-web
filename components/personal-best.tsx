"use client";

import { usePersonalBest } from "@/hooks/usePersonalBest";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Activity, Heart, Flame } from "lucide-react";
import { Loader2 } from "lucide-react";

export function PersonalBest() {
  const { maxHeartRate, maxSteps, maxCalories, loading } = usePersonalBest();

  if (loading) {
    return (
      <Card className="rounded-2xl border-slate-200/60 shadow-sm bg-white overflow-hidden">
        <CardContent className="flex justify-center items-center p-6 h-32">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border-yellow-200/60 shadow-sm bg-gradient-to-br from-yellow-50 to-amber-50 overflow-hidden relative">
      <div className="absolute -right-6 -top-6 text-yellow-500/10 rotate-12 pointer-events-none">
        <Trophy className="w-32 h-32" />
      </div>
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-yellow-100 text-yellow-600 rounded-lg shadow-sm">
            <Trophy className="h-4 w-4" />
          </div>
          <CardTitle className="text-sm font-semibold text-yellow-900">Personal Best</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/70 rounded-xl p-3 shadow-sm border border-yellow-100/50 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <Activity className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-[11px] font-medium uppercase tracking-wider">Steps</span>
            </div>
            <p className="text-lg font-bold text-slate-800">{maxSteps.toLocaleString()}</p>
          </div>
          
          <div className="bg-white/70 rounded-xl p-3 shadow-sm border border-yellow-100/50 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <Flame className="h-3.5 w-3.5 text-orange-500" />
              <span className="text-[11px] font-medium uppercase tracking-wider">Calories</span>
            </div>
            <p className="text-lg font-bold text-slate-800">{Math.round(maxCalories)}</p>
          </div>
          
          <div className="bg-white/70 rounded-xl p-3 shadow-sm border border-yellow-100/50 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <Heart className="h-3.5 w-3.5 text-red-500" />
              <span className="text-[11px] font-medium uppercase tracking-wider">Peak HR</span>
            </div>
            <p className="text-lg font-bold text-slate-800">{maxHeartRate}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
