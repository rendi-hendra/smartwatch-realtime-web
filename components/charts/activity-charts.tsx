"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { ActivitySummary } from "@/hooks/useActivityData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export function StepProgressChart({ summary }: { summary: ActivitySummary }) {
  const data = {
    labels: summary.weeklySteps.map(s => s.day),
    datasets: [
      {
        label: "Steps taken",
        data: summary.weeklySteps.map(s => s.steps),
        backgroundColor: (context: any) => {
          const index = context.dataIndex;
          const isToday = index === summary.weeklySteps.length - 1;
          return isToday ? "rgba(59, 130, 246, 0.8)" : "rgba(203, 213, 225, 0.6)";
        },
        borderRadius: 8,
        barThickness: 32,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0, 0, 0, 0.05)" },
        border: { display: false },
        ticks: { font: { size: 10 } }
      },
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { font: { size: 11, weight: '500' as const } }
      }
    },
  };

  return (
    <div className="w-full h-[350px]">
      <Bar data={data} options={options} />
    </div>
  );
}

export function HourlyIntensityChart({ summary }: { summary: ActivitySummary }) {
  const data = {
    labels: summary.hourlySteps.map(s => s.hour),
    datasets: [
      {
        fill: true,
        label: "Steps Activity",
        data: summary.hourlySteps.map(s => s.steps),
        borderColor: "rgb(16, 185, 129)", // Emerald-500
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0, 0, 0, 0.05)" },
        border: { display: false },
      },
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { maxTicksLimit: 12 }
      }
    },
  };

  return (
    <div className="w-full h-[300px]">
      <Line data={data} options={options} />
    </div>
  );
}
