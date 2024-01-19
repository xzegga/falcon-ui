import React from "react";
import ReactECharts from "echarts-for-react";
import { gaugeChartOptions } from "@/lib/constants/gaugeChartOptions";

export default function GaugeChart({ value }: { value: number }) {
  return <ReactECharts option={gaugeChartOptions(value)} style={{width: "90px", height: "90px"}}/>;
}
