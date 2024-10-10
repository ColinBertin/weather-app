import React, { useEffect, useRef } from "react";
import { Chart, ChartTypeRegistry } from "chart.js/auto";
import { Prevision } from "@/types";

type ChartsProps = {previsions: Prevision[]};

export default function LineChart({ previsions }: ChartsProps) {
  const canvasEl = useRef<any>({});

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");

    const dateFormatted = previsions.map((el: { dt: number }) => {
      const formattedDate = new Date(el.dt * 1000);
      return `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}`;
    });
    const minTemp = previsions.map((el: { temp: { min: number } }) => {
      return Math.floor(el.temp.min);
    });

    const maxTemp = previsions.map((el: { temp: { max: number } }) => {
      return Math.floor(el.temp.max);
    });

    const data = {
      labels: dateFormatted,
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
  }, [previsions]);

  return (
    <div className="flex justify-center mt-5 py-8 px-4 border border-gray-300 rounded-lg bg-white">
      <canvas id="myChart" ref={canvasEl} height="100" />
    </div>
  );
}
