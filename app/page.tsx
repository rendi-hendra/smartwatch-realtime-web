import { ActivityChart } from "@/components/charts/activity-chart";
import { SleepDoughnut } from "@/components/charts/sleep-doughnut";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Flame, Footprints, Heart, Moon, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header Section */}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">Dashboard</h2>
          <p className="text-muted-foreground">Here is your daily health summary for today.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative rounded-full p-2 text-slate-400 hover:text-slate-500 hover:bg-slate-100 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-red-600"></span>
          </button>
          <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
          <Avatar className="h-10 w-10 border-2 border-white shadow-sm cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* KPIs Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Heart Rate */}
        <Card className="border-none shadow-sm bg-white overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-600">Heart Rate</CardTitle>
            <div className="p-2 bg-red-100 text-red-500 rounded-lg">
              <Heart className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">72</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 font-medium">+2 bpm</span> from last hour
            </p>
          </CardContent>
        </Card>

        {/* Steps */}
        <Card className="border-none shadow-sm bg-white overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-600">Daily Steps</CardTitle>
            <div className="p-2 bg-blue-100 text-blue-500 rounded-lg">
              <Footprints className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">6,234</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 font-medium">85%</span> of daily goal
            </p>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: '85%' }}></div>
            </div>
          </CardContent>
        </Card>

        {/* Calories */}
        <Card className="border-none shadow-sm bg-white overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-600">Calories Burned</CardTitle>
            <div className="p-2 bg-orange-100 text-orange-500 rounded-lg">
              <Flame className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">1,432</div>
            <p className="text-xs text-muted-foreground mt-1 text-slate-500">
              Kcal today
            </p>
          </CardContent>
        </Card>

        {/* Sleep */}
        <Card className="border-none shadow-sm bg-white overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-600">Sleep Duration</CardTitle>
            <div className="p-2 bg-indigo-100 text-indigo-500 rounded-lg">
              <Moon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">8h 30m</div>
            <p className="text-xs text-muted-foreground mt-1">
              <Badge variant="outline" className="text-emerald-500 bg-emerald-50 border-emerald-200 uppercase text-[10px] tracking-wider font-semibold">Optimal</Badge>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>
              Your steps compared to the daily goal over the last 7 days.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ActivityChart />
          </CardContent>
        </Card>
        
        <Card className="col-span-3 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Sleep Stages</CardTitle>
            <CardDescription>
              Breakdown of your sleep quality last night.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SleepDoughnut />
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity List */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            You have 3 recorded activities today.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-4">
                <Footprints className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Morning Walk</p>
                <p className="text-sm text-muted-foreground">
                  3.2 km in 45 minutes
                </p>
              </div>
              <div className="text-sm text-muted-foreground text-right">
                <p>07:30 AM</p>
                <p className="text-emerald-500 font-medium">-320 kcal</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mr-4">
                <Activity className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">High Intensity Training</p>
                <p className="text-sm text-muted-foreground">
                  Gym Workout
                </p>
              </div>
              <div className="text-sm text-muted-foreground text-right">
                <p>12:15 PM</p>
                <p className="text-emerald-500 font-medium">-450 kcal</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
