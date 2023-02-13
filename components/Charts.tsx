import React, { useEffect, useRef, useState } from "react";
import { Chart, ChartTypeRegistry } from "chart.js/auto";

type ChartsProps = any;

export default function LineChart({ hourly }: ChartsProps) {
  const canvasEl = useRef<any>({});
  const [hour, setHour] = useState(0);

  //   console.log(hourly);

  const hours = hourly.splice(1, 10).map((hour: { dt: number }) => {
    const h = new Date(hour.dt * 1000);
    return h.getHours();
  });

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");

    const minTemp = [
      60.0, 60.2, 59.1, 61.4, 59.9, 60.2, 59.8, 58.6, 59.6, 59.2,
    ];
    const maxTemp = [
      63.0, 57.2, 56.1, 65.4, 54.9, 61.2, 58.8, 59.6, 58.6, 58.2,
    ];

    const data = {
      labels: hours,
      datasets: [
        {
          backgroundColor: "rgba(36,50,250,1)",
          label: "Min.",
          data: minTemp,
          fill: false,
          borderWidth: 2,
          borderColor: "rgba(36,50,250,1)",
          lineTension: 0.2,
          pointBackgroundColor: "rgba(36,50,250,1)",
          pointRadius: 3,
        },
        {
          backgroundColor: "rgba(250,36,36,1)",
          label: "Max.",
          data: maxTemp,
          fill: false,
          borderWidth: 2,
          borderColor: "rgba(250,36,36,1)",
          lineTension: 0.2,
          pointBackgroundColor: "rgba(250,36,36,1)",
          pointRadius: 3,
        },
      ],
    };
    const config = {
      type: "line" as keyof ChartTypeRegistry,
      data: data,
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  }, []);

  return (
    <div className="flex justify-center mt-5 py-8 px-4 border border-gray-300 rounded-lg">
      <canvas id="myChart" ref={canvasEl} height="100" />
    </div>
  );
}
