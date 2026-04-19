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
import { Line } from "react-chartjs-2";
import { HealthMetric } from "@/hooks/useSmartwatchData";

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

export function HeartRateChart({ history }: { history: HealthMetric[] }) {
  
  const hasData = history && history.length > 0;
  
  // Format labels using timestamps
  const labels = hasData 
    ? history.map(item => {
        const date = new Date(item.timestamp);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
      })
    : [];

  const dataPoints = hasData 
    ? history.map(item => item.heartRate || 0)
    : [];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Heart Rate (bpm)",
        data: dataPoints,
        borderColor: "rgb(239, 68, 68)", // Red-500
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.4, // Smooth line
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pointRadius: (ctx: any) => {
          // Highlight the latest value (last point)
          if (ctx.dataIndex === dataPoints.length - 1) return 6;
          return 0; // Hide other points for clean look
        },
        pointBackgroundColor: "rgb(239, 68, 68)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
      {
        // Visual average line (estimate 80 if no data)
        fill: false,
        label: "Average",
        data: dataPoints.map(() => 80),
        borderColor: "rgba(156, 163, 175, 0.4)",
        borderDash: [5, 5],
        pointRadius: 0,
        tension: 0,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0, // Disable animation for pure realtime rendering skip
    },
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleFont: { size: 13 },
        bodyFont: { size: 13 },
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
      }
    },
    scales: {
      y: {
        min: 50,
        max: 140,
        grid: {
          color: "rgba(0, 0, 0, 0.04)",
        },
        border: { display: false },
        ticks: {
          font: { family: "system-ui", size: 11 },
          color: "#94a3b8"
        }
      },
      x: {
        grid: {
          display: false,
        },
        border: { display: false },
        ticks: {
          maxTicksLimit: 6,
          font: { family: "system-ui", size: 11 },
          color: "#94a3b8",
          maxRotation: 0,
        }
      },
    },
  };

  if (!hasData) {
    return (
      <div className="w-full h-[350px] flex items-center justify-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
        <p className="text-sm font-medium text-slate-400">Waiting for device data...</p>
      </div>
    )
  }

  return (
    <div className="w-full h-[350px]">
      <Line options={options} data={data} />
    </div>
  );
}
