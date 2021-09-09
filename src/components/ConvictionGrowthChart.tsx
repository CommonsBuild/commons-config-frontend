import React from 'react';
import { Line } from 'react-chartjs-2';

interface ConvictionGrowthProps {
  convictionPercentage: number[];
  timeDays: number[];
  dataPoints: { [key: string]: number }[];
}

const options = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    xAxes: {
      type: 'linear',
      grid: {
        display: false,
        borderColor: '#03B3FF',
      },
      ticks: {
        color: '#FFFFFF',
        autoSkip: true,
        maxTicksLimit: 10,
      },
    },
    yAxes: {
      grid: {
        display: false,
        borderColor: '#03B3FF',
      },
      ticks: {
        color: '#FFFFFF',
        autoSkip: true,
        maxTicksLimit: 6,
      },
      beginAtZero: true,
    },
  },
};

function ConvictionGrowthChart({
  convictionPercentage,
  timeDays,
  dataPoints,
}: ConvictionGrowthProps) {
  const data = {
    labels: timeDays,
    datasets: [
      {
        label: 'Floor price',
        data: convictionPercentage,
        fill: false,
        borderColor: '#DEFB48',
        pointBackgroundColor: '#DEFB48',
        pointHoverRadius: 0,
        pointRadius: 0,
        pointStyle: 'rect',
      },
      {
        label: 'Data points',
        data: dataPoints,
        fill: false,
        borderColor: '#DEFB48',
        pointBackgroundColor: '#DEFB48',
        pointHoverRadius: 7,
        pointRadius: 7,
        pointStyle: 'rect',
        showLine: false,
      },
    ],
  };

  return (
    <div className="flex">
      <div className="w-32 pr-8 text-right">
        <span className="font-bj font-bold text-xs text-neon-light uppercase">
          % of maximum conviction
        </span>
      </div>
      <div className="w-4/5">
        <Line data={data} options={options} />
      </div>
      <div className="w-32 pl-8 mt-auto ">
        <span className="font-bj font-bold text-xs text-neon-light uppercase">
          days
        </span>
      </div>
    </div>
  );
}

export default React.memo(ConvictionGrowthChart);
