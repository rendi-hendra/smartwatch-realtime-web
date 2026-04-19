"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { AnalyticsStats } from "@/hooks/useAnalyticsData";
import { HealthMetric } from "@/hooks/useSmartwatchData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function AnalyticsTrendsChart({ history }: { history: HealthMetric[] }) {
  const labels = history.map(h => {
    const d = new Date(h.timestamp);
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
  });

  const data = {
    labels,
    datasets: [
      {
        type: "line" as const,
        label: "Heart Rate",
        data: history.map(h => h.heartRate || 0),
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        yAxisID: "y",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
      },
      {
        type: "bar" as const,
        label: "Steps Progress",
        data: history.map(h => h.steps || 0),
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
        yAxisID: "y1",
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: { display: true, text: "BPM", font: { size: 10 } },
        grid: { drawOnChartArea: false },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: { display: true, text: "Steps", font: { size: 10 } },
        grid: { color: "rgba(0, 0, 0, 0.05)" },
      },
      x: {
        ticks: {
          maxTicksLimit: 8,
          font: { size: 10 }
        },
        grid: { display: false }
      }
    },
  };

  return (
    <div className="w-full h-[350px]">
      <Bar data={data as any} options={options as any} />
    </div>
  );
}
