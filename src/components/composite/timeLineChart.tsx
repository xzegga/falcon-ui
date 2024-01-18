"use client";
import React from "react";
import ReactECharts from "echarts-for-react";

const lineChartOptions = {
  xAxis: { type: "time" },
  yAxis: { gridIndex: 0, type: "category" },
  tooltip: {
    trigger: 'item',
    position: 'top',
    backgroundColor: '#333E49',
    borderWidth: 0,
    confine: true,
    textStyle: {
      color: '#fff',
      fontweight: 'lighter',
    },
    extraCssText: 'box-shadow: none; border-radius: 2px;',
  },
  dataZoom: [
    {
      start: 0,
      type: "inside",
      endValue: 10,
    },
    { start: 0 },
  ],
  series: [
    {
      type: "line",
      smooth: true,
      symbol: "emptyCircle",
      symbolSize: 12,
      color: "#00a0af",
      lineStyle: {
        width: 4,
      },
      itemStyle: {
        normal: {
          borderWidth: 4,
          borderType: "solid",
        },
      },
      encode: {
        x: "date",
        y: "emotion",
      },
    },
  ],
};

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
