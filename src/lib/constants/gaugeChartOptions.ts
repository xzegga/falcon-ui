export function gaugeChartOptions(value : number = 0) {
  return {
    grid: {
        height: "100%",
    },
    series: [
      {
        type: "gauge",
        data: [{ value: value, name: "Score" }],
        min: 0,
        max: 10,
        radius: "100%",
        title: { show: false },
        center: ["50%", "50%"],
        detail: {
          show: true,
          fontSize: 18,
          fontWeight: "bold",
          color: "#313131",
        },
        axisTick: {
          length: 0,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.1, "#ff0000"],
              [0.2, "#ff4000"],
              [0.3, "#ff8000"],
              [0.4, "#ffbf00"],
              [0.5, "#ffff00"],
              [0.6, "#bfff00"],
              [0.7, "#80ff00"],
              [0.8, "#82ff50"],
              [0.9, "#40ff00"],
              [1, "#34e600"],
            ],
          },
        },
        pointer: {
          show: true,
          length: "50%",
          width: 2,
          itemStyle: {
            color: "#313131",
          },
        },
      },
    ],
  };
}
