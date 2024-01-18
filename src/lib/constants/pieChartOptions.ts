import { tooltip } from "./commonChartOptions";

export const pieChartOptions = {
  tooltip,
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
