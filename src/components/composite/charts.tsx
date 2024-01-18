"use client";
import React from "react";
import TimeLineChart from "./timeLineChart";
import PieChart from "./pieChart";


const mockDataLineChart = [
  ["date", "emotion"],
  ["2024-01-18T15:18:35.313Z", "neutral"],
  ["2024-01-18T15:18:35.773Z", "surprised"],
  ["2024-01-18T15:18:36.371Z", "neutral"],
  ["2024-01-18T15:18:36.848Z", "angry"],
  ["2024-01-18T15:18:37.270Z", "neutral"],
  ["2024-01-18T15:18:37.802Z", "neutral"],
  ["2024-01-18T15:18:38.258Z", "neutral"],
  ["2024-01-18T15:18:38.744Z", "neutral"],
  ["2024-01-18T15:18:39.262Z", "happy"],
  ["2024-01-18T15:18:39.751Z", "neutral"],
];

const mockDataPieChart = [
  { value: 1048, name: "Happy" },
  { value: 735, name: "Neutral" },
  { value: 580, name: "Surprised" },
  { value: 484, name: "Angry" },
  { value: 300, name: "Sad" },
];

export default function Charts() {
  return (
    <div className="mb-8">
      <h1 className="text-xl text-secondary-600">Emotion Analysis</h1>
      <div className="bg-white h-96 my-2 p-4 flex gap-2">
        <div className="w-1/2">
          <PieChart data={mockDataPieChart} />
        </div>
        <div className="w-1/2">
          <TimeLineChart data={mockDataLineChart} />
        </div>
      </div>
    </div>
  );
}
