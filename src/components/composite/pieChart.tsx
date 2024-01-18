"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import { pieChartOptions } from "@/lib/constants/pieChartOptions";

export default function pieChart({ data }: { data: any }) {
  const series = { ...pieChartOptions.series, data };
  const options = { ...pieChartOptions, series };
  return (
    <ReactECharts
      option={options}
      opts={{ renderer: "svg" }}
      notMerge
      style={{ height: "100%", width: "100%" }}
    />
  );
}
