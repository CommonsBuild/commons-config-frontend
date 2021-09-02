import React from 'react';
import { Line } from 'react-chartjs-2';

interface ConvictionGrowthData {
  convictionPercentage: number[];
  timeDays: number[];
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
      beginAtZero: true,
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
      position: 'left',
    },
  },
};

function ConvictionGrowthChart({
  convictionPercentage,
  timeDays,
}: ConvictionGrowthData) {
  const data = {
    labels: timeDays,
    datasets: [
      {
        label: 'Floor price',
        data: convictionPercentage,
        fill: false,
        borderColor: '#DEFB48',
        pointBackgroundColor: '#DEFB48',
        pointHoverRadius: 7,
        pointRadius: 0,
        pointStyle: 'rect',
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