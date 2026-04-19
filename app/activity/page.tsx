"use client";

import { useActivityData } from "@/hooks/useActivityData";
import { StepProgressChart, HourlyIntensityChart } from "@/components/charts/activity-charts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Footprints, 
  Flame, 
  Target, 
  TrendingUp, 
  Clock,
  Calendar,
  Loader2,
  AlertCircle,
  Award
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ActivityPage() {
  const { device, summary, loading, updateStepGoal } = useActivityData();
  const [newGoal, setNewGoal] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSaveGoal = () => {
    const goal = parseInt(newGoal, 10);
    if (!isNaN(goal) && goal > 0 && updateStepGoal) {
      updateStepGoal(goal);
      setIsOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="h-10 w-10 text-emerald-500 animate-spin mb-4" />
        <h2 className="text-xl font-medium text-slate-700">Calculating your movement...</h2>
      </div>
    );
  }

  if (!device || !summary) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <AlertCircle className="h-12 w-12 text-slate-400 mb-4" />
        <h2 className="text-xl font-medium text-slate-700">No Activity Data</h2>
        <p className="text-slate-500">Wait for your smartwatch to sync activity data.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">Activity</h2>
          <p className="text-sm text-muted-foreground mt-1 text-slate-500">Track your steps, calories, and goals</p>
        </div>
        <div className="flex items-center gap-2">
           <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-3 py-1 font-semibold flex gap-1.5 items-center">
              <Award className="h-3.5 w-3.5" />
              {summary.goalProgress}% of Daily Goal
           </Badge>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Steps */}
        <Card className="rounded-2xl border-emerald-100 shadow-sm bg-gradient-to-br from-emerald-50/50 to-white overflow-hidden border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-slate-600">Total Steps Today</CardTitle>
            <div className="p-2 bg-emerald-500 text-white rounded-xl">
              <Footprints className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-slate-800 tracking-tight">{summary.dailySteps.toLocaleString()}</span>
              <span className="text-sm font-medium text-slate-400 underline decoration-emerald-500/30">steps</span>
            </div>
            <div className="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-emerald-500 transition-all duration-1000" 
                 style={{ width: `${summary.goalProgress}%` }}
               />
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
               <span>0</span>
               <span>Goal: {summary.stepGoal.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Calories Burned */}
        <Card className="rounded-2xl border-orange-100 shadow-sm bg-white overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-slate-600">Active Calories</CardTitle>
            <div className="p-2 bg-orange-50 text-orange-500 rounded-xl">
              <Flame className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-slate-800 tracking-tight">{summary.activeCalories}</span>
              <span className="text-sm font-medium text-slate-400">kcal</span>
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-500">
               <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
               <span className="font-medium text-emerald-600">+12%</span>
               <span>from yesterday</span>
            </div>
          </CardContent>
        </Card>

        {/* Average Intensity (Derived or Status) */}
        <Card className="rounded-2xl border-slate-200 shadow-sm bg-white overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-slate-600">Personal Best</CardTitle>
            <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
              <Award className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-800 tracking-tight">12,408</span>
              <span className="text-sm font-medium text-slate-400">steps</span>
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-500">
               <Calendar className="h-3.5 w-3.5 text-slate-400" />
               <span>Achieved on April 12, 2026</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-7">
        {/* Weekly Progress (Spans 4 columns) */}
        <Card className="rounded-2xl border-slate-200/60 shadow-sm bg-white md:col-span-4">
          <CardHeader className="border-b border-slate-50 pb-4">
            <div className="flex items-center justify-between">
               <div>
                  <CardTitle className="text-lg text-slate-800">Weekly Performance</CardTitle>
                  <CardDescription>Average daily steps completion</CardDescription>
               </div>
               <div className="flex gap-2">
                  <div className="flex items-center gap-1.5">
                     <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                     <span className="text-[10px] font-bold text-slate-400 uppercase">Today</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                     <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                     <span className="text-[10px] font-bold text-slate-400 uppercase">History</span>
                  </div>
               </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <StepProgressChart summary={summary} />
          </CardContent>
        </Card>

        {/* Intensity Timeline (Spans 3 columns) */}
        <Card className="rounded-2xl border-slate-200/60 shadow-sm bg-white md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-slate-800 flex items-center gap-2">
               <Clock className="h-4 w-4 text-emerald-500" /> Hourly Intensity
            </CardTitle>
            <CardDescription>Step accumulation throughout the day</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <HourlyIntensityChart summary={summary} />
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 italic text-xs text-slate-500 leading-relaxed text-center">
               "Early morning peaks detected. Great start to your day!"
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goal Insights Bar with Dialog */}
      <Card className="rounded-2xl border-emerald-100 shadow-sm bg-emerald-900 overflow-hidden">
        <CardContent className="p-6">
           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-emerald-800 text-emerald-400 rounded-2xl ring-4 ring-emerald-800/50">
                    <Target className="h-8 w-8" />
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-white">Keep it up!</h3>
                    <p className="text-emerald-300 text-sm">
                       {summary.dailySteps >= summary.stepGoal 
                          ? "You've reached your daily goal! Excellent work." 
                          : `Only ${(summary.stepGoal - summary.dailySteps).toLocaleString()} more steps to reach your ${summary.stepGoal.toLocaleString()} goal.`}
                    </p>
                 </div>
              </div>
              
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <button className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/40 shrink-0">
                     Set New Goal
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Update Daily Step Goal</DialogTitle>
                    <DialogDescription>
                      Set a new target to challenge yourself. Recommended: 8,000 - 12,000 steps.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <span className="text-right text-sm font-medium">Steps count</span>
                      <Input
                        type="number"
                        placeholder="e.g. 10000"
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" onClick={handleSaveGoal}>Save Goal</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

           </div>
        </CardContent>
      </Card>
    </div>
  );
}
