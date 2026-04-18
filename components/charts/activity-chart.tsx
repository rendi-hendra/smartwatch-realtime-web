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

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Steps",
      data: [6000, 8000, 7500, 10000, 9500, 12000, 11000],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4,
    },
    {
      fill: true,
      label: "Goal",
      data: [8000, 8000, 8000, 8000, 8000, 8000, 8000],
      borderColor: "rgba(156, 163, 175, 0.4)",
      backgroundColor: "transparent",
      borderDash: [5, 5],
      pointRadius: 0,
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: false,
    },
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
      border: { display: false }
    },
  },
};

export function ActivityChart() {
  return (
    <div className="w-full h-[300px]">
      <Line options={options} data={data} />
    </div>
  );
}
