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
  Legend,
  Filler,
  BarElement
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { HealthMetric } from "@/hooks/useSmartwatchData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement
);

export function HistoryTimelineChart({ history }: { history: HealthMetric[] }) {
  const labels = history.map(h => {
    const d = new Date(h.timestamp);
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Heart Rate",
        data: history.map(h => h.heartRate || null),
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        yAxisID: "y",
        tension: 0.4,
        fill: true,
        pointRadius: 2,
        pointBackgroundColor: "#fff",
      },
      {
        type: "bar" as const,
        label: "Steps (Accumulated)",
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
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: { display: true, text: "Heart Rate (BPM)", font: { size: 10 } },
        grid: { color: "rgba(0, 0, 0, 0.05)" },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: { display: true, text: "Steps", font: { size: 10 } },
        grid: { drawOnChartArea: false },
      },
      x: {
        ticks: {
          maxTicksLimit: 12,
          font: { size: 10 }
        },
        grid: { display: false }
      }
    },
  };

  return (
    <div className="w-full h-[400px]">
      <Line data={data as any} options={options as any} />
    </div>
  );
}

export function HistorySpO2Chart({ history }: { history: HealthMetric[] }) {
  const labels = history.map(h => {
    const d = new Date(h.timestamp);
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "SpO2 (%)",
        data: history.map(h => h.oxygenSaturation || null),
        borderColor: "rgb(16, 185, 129)", // Emerald
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 2,
        pointBackgroundColor: "#fff",
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
        min: 80,
        max: 100,
        grid: { color: "rgba(0, 0, 0, 0.05)" },
        title: { display: true, text: "SpO2 %", font: { size: 10 } }
      },
      x: {
        ticks: { maxTicksLimit: 8, font: { size: 10 } },
        grid: { display: false }
      }
    },
  };

  return (
    <div className="w-full h-[250px]">
      <Line data={data as any} options={options as any} />
    </div>
  );
}

export function HistoryHRVChart({ history }: { history: HealthMetric[] }) {
  const labels = history.map(h => {
    const d = new Date(h.timestamp);
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "HRV (ms)",
        data: history.map(h => h.heartRateVariabilityRmssd || null),
        borderColor: "rgb(168, 85, 247)", // Purple
        backgroundColor: "rgba(168, 85, 247, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 2,
        pointBackgroundColor: "#fff",
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
        grid: { color: "rgba(0, 0, 0, 0.05)" },
        title: { display: true, text: "ms", font: { size: 10 } }
      },
      x: {
        ticks: { maxTicksLimit: 8, font: { size: 10 } },
        grid: { display: false }
      }
    },
  };

  return (
    <div className="w-full h-[250px]">
      <Line data={data as any} options={options as any} />
    </div>
  );
}

export function HistoryCaloriesChart({ history }: { history: HealthMetric[] }) {
  const labels = history.map(h => {
    const d = new Date(h.timestamp);
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
  });

  const data = {
    labels,
    datasets: [
      {
        type: "line" as const,
        label: "Active Calories",
        data: history.map(h => h.activeCaloriesBurned || 0),
        borderColor: "rgb(249, 115, 22)", // Orange
        backgroundColor: "rgba(249, 115, 22, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 2,
        pointBackgroundColor: "#fff",
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
        title: { display: true, text: "kcal", font: { size: 10 } }
      },
      x: {
        ticks: { maxTicksLimit: 8, font: { size: 10 } },
        grid: { display: false }
      }
    },
  };

  return (
    <div className="w-full h-[250px]">
      <Line data={data as any} options={options as any} />
    </div>
  );
}
