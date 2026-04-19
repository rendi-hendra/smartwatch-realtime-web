"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { HealthMetric } from "@/hooks/useSmartwatchData";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export function ActivityChart({ history }: { history: HealthMetric[] }) {
  const hasData = history && history.length > 0;

  const labels = hasData 
    ? history.map(item => {
        const date = new Date(item.timestamp);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
      })
    : [];

  const stepPoints = hasData 
    ? history.map(item => item.steps || 0)
    : [];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Steps",
        data: stepPoints,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        border: { display: false }
      },
      x: {
        grid: {
          display: false,
        },
        border: { display: false },
        ticks: {
          maxTicksLimit: 5,
        }
      },
    },
  };

  if (!hasData) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
        <p className="text-sm font-medium text-slate-400">Waiting for activity data...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <Line options={options} data={data} />
    </div>
  );
}
