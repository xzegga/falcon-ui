"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { lineChartOptions } from "@/lib/constants/lineChartOptions";

export default function TimeLineChart({ data }: { data: any }) {
  const options = { ...lineChartOptions, dataset: { source: data } };
  return (
    <ReactECharts
      option={options}
      opts={{ renderer: "svg" }}
      notMerge
      style={{ height: "100%", width: "100%" }}
    />
  );
}
