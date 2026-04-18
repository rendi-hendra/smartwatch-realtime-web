"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Deep Sleep", "Light Sleep", "REM", "Awake"],
  datasets: [
    {
      label: "Hours",
      data: [2, 4.5, 1.5, 0.5],
      backgroundColor: [
        "rgba(59, 130, 246, 0.8)", // Deep - Blue
        "rgba(147, 197, 253, 0.8)", // Light - Light Blue
        "rgba(167, 139, 250, 0.8)", // REM - Purple
        "rgba(252, 165, 165, 0.8)", // Awake - Red
      ],
      hoverOffset: 4,
      borderWidth: 0,
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
  },
  cutout: "75%",
};

export function SleepDoughnut() {
  return (
    <div className="w-full h-[250px] flex justify-center pb-4">
      <div className="relative w-full h-full max-w-[250px]">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-30px]">
          <span className="text-3xl font-bold text-slate-800">8h</span>
          <span className="text-xs text-slate-500">30m</span>
        </div>
      </div>
    </div>
  );
}
