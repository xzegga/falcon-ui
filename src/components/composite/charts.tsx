"use client";
import React from "react";
import TimeLineChart from "./timeLineChart";
import PieChart from "./pieChart";
import { mockDataLineChart, mockDataPieChart } from "@/lib/constants/mockData";
import EmotionAnalysisLabel from "../ui/emotionAnalysisLabel";
import { Laugh, AudioLines } from "lucide-react";

export default function Charts() {
  return (
    <div className="mb-8">
      <h1 className="text-xl text-secondary-600">Emotion Analysis</h1>
      <div className="bg-white h-[500px] my-2 p-4 flex gap-2">
        <div className="w-1/2 h-[90%]">
          <EmotionAnalysisLabel
            message="Facial Expression Analysis"
            color="amber"
            icon={<Laugh className="stroke-amber-600"/>}
          />
          <PieChart data={mockDataPieChart} />
        </div>
        <div className="w-1/2 h-[90%]">
          <EmotionAnalysisLabel
            message="Speech Analysis"
            color="fuchsia"
            icon={<AudioLines className="stroke-fuchsia-800" />}
          />
          <TimeLineChart data={mockDataLineChart} />
        </div>
      </div>
    </div>
  );
}
