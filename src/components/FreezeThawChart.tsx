import React from 'react';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';

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
        stepSize: 0.2,
      },
      beginAtZero: true,
      position: 'left',
    },
  },
};

interface ChartData {
  price: number[];
  week: number[];
}

const FreezeThawChart = ({ price, week }: ChartData) => {
  const data = {
    labels: week || ['0'],
    datasets: [
      {
        label: 'Floor price',
        data: price,
        fill: false,
        borderColor: '#DEFB48',
        pointBackgroundColor: '#DEFB48',
        pointHoverRadius: 7,
        pointRadius: 7,
        pointStyle: 'rect',
      },
    ],
  };

  return (
    <div style={{ maxHeight: '400px' }} className="px-9 pb-6">
      <span
        style={{ maxWidth: '100px' }}
        className="font-bj font-bold text-xs uppercase flex justify-between pb-3 text-neon-light z-10"
      >
        FLOOR FLOOR (wxDAI)
      </span>
      <Line
        className="relative z-10"
        data={data}
        options={options}
        height={90}
      />
      <div className="w-full font-bj font-bold text-xs text-center uppercase text-neon-light">
        TIME (WEEKS)
      </div>
      <div className="relative h-2/4 chart">
        <Image src="/chart_bg.png" layout="fill" />
      </div>
    </div>
  );
};

export default React.memo(FreezeThawChart);
