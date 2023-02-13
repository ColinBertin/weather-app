import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Chart } from "chart.js/auto";

type ChartsProps = any;

export default function Charts({ hourly }: ChartsProps) {
  const canvasEl = useRef<any>({});
  const [hour, setHour] = useState(0);

  const colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)",
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)",
    },
  };

  const hours = hourly.splice(1, 10).map((hour) => {
    const h = new Date(hour.dt * 1000);
    return h.getHours();
  });

  useMemo(() => {
    // const formattedDate = new Date(hourly.dt * 1000);
    // setDate(formattedDate.getDate());
    // setMonth(formattedDate.getMonth() + 1);
  }, []);

  useEffect(() => {
    console.log(hours);
    const ctx = canvasEl.current.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.65, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);

    const weight = [60.0, 60.2, 59.1, 61.4, 59.9, 60.2, 59.8, 58.6, 59.6, 59.2];
    const weight2 = [
      63.0, 57.2, 56.1, 65.4, 54.9, 61.2, 58.8, 59.6, 58.6, 58.2,
    ];

    // const labels = [
    //   "Week 1",
    //   "Week 2",
    //   "Week 3",
    //   "Week 4",
    //   "Week 5",
    //   "Week 6",
    //   "Week 7",
    //   "Week 8",
    //   "Week 9",
    //   "Week 10",
    // ];
    const data = {
      labels: hours,
      datasets: [
        {
          backgroundColor: gradient,
          label: "My First Dataset",
          data: weight,
          fill: false,
          borderWidth: 2,
          borderColor: colors.purple.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.purple.default,
          pointRadius: 3,
        },
        {
          backgroundColor: gradient,
          label: "My Second Dataset",
          data: weight2,
          fill: false,
          borderWidth: 2,
          borderColor: colors.indigo.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.indigo.default,
          pointRadius: 3,
        },
      ],
    };
    const config = {
      type: "line",
      data: data,
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  }, [hours]);

  return (
    <div>
      <canvas id="myChart" ref={canvasEl} height="100" />
    </div>
  );
}
