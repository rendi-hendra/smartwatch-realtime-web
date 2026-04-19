"use client";

import { useHistoryData } from "@/hooks/useHistoryData";
import { 
  HistoryTimelineChart,
  HistorySpO2Chart,
  HistoryHRVChart,
  HistoryCaloriesChart
} from "@/components/charts/history-charts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  CalendarIcon,
  Loader2,
  AlertCircle,
  Clock,
  Activity,
  Download
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import * as XLSX from 'xlsx';

export default function HistoryPage() {
  const { device, history, loading, selectedDate, setSelectedDate } = useHistoryData();

  const handleExport = () => {
    if (!history || history.length === 0) return;

    const exportData = history.map(item => ({
      Time: format(new Date(item.timestamp), "HH:mm:ss"),
      "Heart Rate (bpm)": item.heartRate || '-',
      "Steps": item.steps || '-',
      "SpO2 (%)": item.oxygenSaturation || '-',
      "HRV (ms)": item.heartRateVariabilityRmssd ? Math.round(item.heartRateVariabilityRmssd) : '-',
      "Calories (kcal)": item.activeCaloriesBurned ? Math.round(item.activeCaloriesBurned) : '-',
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "History");
    
    XLSX.writeFile(workbook, `Smartwatch_History_${format(selectedDate, "yyyy-MM-dd")}.xlsx`);
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">History Log</h2>
          <p className="text-sm text-muted-foreground mt-1 text-slate-500">Review your past health and activity data</p>
        </div>
        
        {/* Date Picker using Shadcn */}
        <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="border-slate-200 shadow-sm gap-2"
              onClick={handleExport}
              disabled={loading || history.length === 0}
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal border-slate-200 shadow-sm",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-blue-500" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                  disabled={(date) => date > new Date() || date < new Date("2020-01-01")}
                />
              </PopoverContent>
            </Popover>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
          <h2 className="text-xl font-medium text-slate-700">Loading historical data...</h2>
        </div>
      ) : !device ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <AlertCircle className="h-12 w-12 text-slate-400 mb-4" />
          <h2 className="text-xl font-medium text-slate-700">No Device Found</h2>
          <p className="text-slate-500">Make sure your smartwatch is synced.</p>
        </div>
      ) : history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <Clock className="h-12 w-12 text-slate-300 mb-4" />
          <h2 className="text-xl font-medium text-slate-700">No Data Available</h2>
          <p className="text-slate-500">No health data was recorded on {format(selectedDate, "MMMM d, yyyy")}.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          <Card className="rounded-2xl border-slate-200/60 shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                 <CardTitle className="text-lg">Daily Timeline</CardTitle>
                 <CardDescription>Heart rate and steps accumulation over the selected day</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                 {history.length} Data Points
              </Badge>
            </CardHeader>
            <CardContent className="pt-6">
              <HistoryTimelineChart history={history} />
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* SpO2 Chart */}
            <Card className="rounded-2xl border-slate-200/60 shadow-sm bg-white">
              <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                   <Activity className="h-4 w-4 text-emerald-500" /> Blood Oxygen (SpO2)
                 </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                 <HistorySpO2Chart history={history} />
              </CardContent>
            </Card>

            {/* HRV Chart */}
            <Card className="rounded-2xl border-slate-200/60 shadow-sm bg-white">
              <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                   <Activity className="h-4 w-4 text-purple-500" /> Heart Rate Variability
                 </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                 <HistoryHRVChart history={history} />
              </CardContent>
            </Card>

            {/* Calories Chart */}
            <Card className="rounded-2xl border-slate-200/60 shadow-sm bg-white">
              <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                   <Activity className="h-4 w-4 text-orange-500" /> Active Calories
                 </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                 <HistoryCaloriesChart history={history} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
