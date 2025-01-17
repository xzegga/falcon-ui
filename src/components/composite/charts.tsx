"use client";
import React from "react";
import TimeLineChart from "./timeLineChart";
import PieChart from "./pieChart";
import EmotionAnalysisLabel from "../ui/emotionAnalysisLabel";
import { Laugh, AudioLines } from "lucide-react";
import { dataSetTotals } from "@/lib/dataSetFormatter";

export default function Charts({data}: {data: any}) {

  return (
    <div className="mb-8">
      <h1 className="text-xl text-secondary-600">Emotion Analysis</h1>
      <div>
        <div className="bg-gray-50 my-2 p-4">
          <EmotionAnalysisLabel
            message="Facial Expression Analysis"
            color="amber"
            icon={<Laugh className="stroke-amber-600" />}
          />
          <div className="flex gap-2 h-[350px]">
            <div className="w-1/3">
              <PieChart data={dataSetTotals([...data.facialExpreData])} />
            </div>
            <div className="w-2/3">
              <TimeLineChart data={data.facialExpreData} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-gray-50 my-2 p-4 ">
          <EmotionAnalysisLabel
            message="Speech Analysis"
            color="fuchsia"
            icon={<AudioLines className="stroke-fuchsia-800" />}
          />
          <div className="flex gap-2 h-[350px]">
            <div className="w-1/3">
              <PieChart data={data.speechData} />
            </div>
            <div className="w-2/3">
              <TimeLineChart data={data.speechData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
