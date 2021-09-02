import React from 'react';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';

const options = {
  maintainAspectRatio: false,
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
      grid: {
        display: false,
        borderColor: '#03B3FF',
      },
      ticks: {
        color: '#FFFFFF',
        autoSkip: true,
        maxTicksLimit: 8,
      },
      beginAtZero: true,
    },
    yAxes: {
      suggestedMin: 0,
      max: 90,
      grid: {
        display: false,
        borderColor: '#03B3FF',
      },
      ticks: {
        color: '#FFFFFF',
        autoSkip: true,
        stepSize: 15,
      },
      beginAtZero: true,
      position: 'left',
    },
  },
};

const CurveChart = () => {
  const data = {
    labels: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22,
    ],
    datasets: [
      {
        label: 'Floor price',
        data: [
          { x: 0, y: 5 },
          { x: 18, y: 7 },
          { x: 19, y: 95 },
        ],
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
    <div style={{ maxHeight: '43vh' }} className="px-9 pb-6">
      <div className="flex">
        <div className="flex flex-col justify-between mr-4">
          <p className="font-bj font-bold text-xs text-right uppercase pb-3 text-neon-light w-28 z-10">
            % of <span className="text-neon">effective Supply</span> voting this
            proposal
          </p>
          <p className="font-bj font-bold text-xs text-center uppercase p-2 text-neon-light w-32 bg-gray-700 z-10">
            minimum % of tokens needed to pass
          </p>
        </div>
        <div
          style={{ height: 'calc(40vh - 88px)', width: '42vw' }}
          className="flex mt-12"
        >
          <Line
            className="relative z-10"
            data={data}
            options={options}
            height={90}
          />
        </div>
        <div className="text-right mt-auto w-36">
          <span className="font-bj font-bold text-xs uppercase text-neon-light w-42 relative -bottom-16">
            % of commons pool funds being requested
          </span>
        </div>
      </div>

      <div className="relative h-2/4 curve-chart">
        <Image src="/chart_bg.png" layout="fill" />
      </div>
    </div>
  );
};

export default React.memo(CurveChart);
