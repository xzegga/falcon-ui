"use client";
import React from "react";
import ReactECharts from "echarts-for-react";

const pieChartOptions = {
  tooltip: {
    trigger: "item",
    position: "top",
    backgroundColor: "#333E49",
    borderWidth: 0,
    confine: true,
    textStyle: {
      color: "#fff",
      fontweight: "lighter",
    },
    extraCssText: "box-shadow: none; border-radius: 2px;",
  },
  legend: {
    type: "scroll",
    bottom: 0,
    width: "90%",
    itemHeight: 12,
    itemWidth: 12,
    itemGap: 20,
    textStyle: {
      color: "#8a8a8a",
      fontSize: 11,
    },
  },
  series: {
    name: "Emotion",
    type: "pie",
    radius: ["50%", "70%"],
    avoidLabelOverlap: false,
    label: {
      show: false,
    },
    emphasis: {
      label: false,
    },
  },
  color: [
    "#F46814",
    "#007D68",
    "#330066",
    "#FFC000",
    "#FF8E4D",
    "#2E9987",
    "#632E99",
    "#FFDC4D",
    "#FFAE80",
    "#66CCBB",
    "#9B66CC",
    "#FFE780",
    "#FFDFCC",
    "#B8E6DE",
    "#CFB8E6",
    "#FFF6CD",
  ],
};

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
