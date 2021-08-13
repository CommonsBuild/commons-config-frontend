import React from "react";
import Image from "next/image";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["0", "10", "20", "30", "40", "60"],
  datasets: [
    {
      label: "Floor price",
      yAxisID: "leftScale",
      data: [2, 2, 0.5, 0.5, 0.5, 0.5],
      fill: false,
      borderColor: "#DEFB48",
      pointBackgroundColor: "#DEFB48",
      pointHoverRadius: 7,
      pointRadius: 7,
      pointStyle: "rect",
    },
    {
      label: "Token price",
      yAxisID: "rightScale",
      data: [5, 5, 0.5, 0.5, 0.5, 0.5],
      fill: false,
      borderColor: "#DEFB48",
      pointBackgroundColor: "#DEFB48",
      pointHoverRadius: 7,
      pointRadius: 7,
      pointStyle: "rect",
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scaleUse2Y: true,
  scales: {
    xAxes: {
      grid: {
        borderColor: "#03B3FF",
        borderWidth: 2,
      },
      ticks: {
        color: "#FFFFFF",
      },
      beginAtZero: true,
    },
    leftScale: {
      grid: {
        borderColor: "#03B3FF",
        borderWidth: 2,
      },
      ticks: {
        color: "#FFFFFF",
        stepSize: 0.2,
      },
      beginAtZero: true,
      position: "left",
    },
    rightScale: {
      grid: {
        borderColor: "#transparent",
        borderWidth: 2,
      },
      ticks: {
        color: "#FFFFFF",
        stepSize: 0.5,
      },
      beginAtZero: true,
      position: "right",
    },
  },
};

const LineChart = () => (
  <div style={{ maxHeight: "400px" }} className="min-w-full px-9 pb-6 mt-auto">
    <div className="font-bj font-bold text-xs uppercase flex justify-between pb-3 text-neon-light z-10">
      <a style={{ maxWidth: "100px" }}>FLOOR FLOOR (wxDAI)</a>
      <a className="text-right" style={{ maxWidth: "100px" }}>
        TOKEN PRICE (wxDAI)
      </a>
    </div>
    <Line
      className="relative z-10"
      data={data}
      options={options}
      height={100}
    />
    <div className="w-full font-bj font-bold text-xs text-center uppercase text-neon-light">
      TIME (WEEKS)
    </div>
    <div className="relative h-2/4 chart">
      <Image src="/chart_bg.png" layout="fill" />
    </div>
  </div>
);

export default LineChart;
