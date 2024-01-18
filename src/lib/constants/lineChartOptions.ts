import { tooltip } from "./commonChartOptions";

export const lineChartOptions = {
  xAxis: { type: "time" },
  yAxis: { gridIndex: 0, type: "category" },
  tooltip,
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
