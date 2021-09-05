import React from 'react';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';

interface ConvictionThresholdProps {
  requestedPercentage: number[];
  thresholdPercentage: number[];
}

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
      type: 'linear',
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

function ConvictionThresholdChart({
  requestedPercentage,
  thresholdPercentage,
}: ConvictionThresholdProps) {
  const data = {
    labels: requestedPercentage,
    datasets: [
      {
        label: 'Floor price',
        data: thresholdPercentage,
        fill: false,
        borderColor: '#DEFB48',
        pointBackgroundColor: '#DEFB48',
        pointHoverRadius: 0,
        pointRadius: 0,
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
          style={{ height: 'calc(40vh - 88px)', width: '37vw' }}
          className="flex mt-12"
        >
          <Line
            className="relative z-10"
            data={data}
            options={options}
            height={90}
          />
        </div>
        <div className="text-right mt-auto w-56">
          <span className="font-bj font-bold text-xs uppercase text-neon-light relative">
            % of commons pool funds being requested
          </span>
        </div>
      </div>

      <div className="relative h-2/4 curve-chart">
        <Image src="/chart_bg.png" layout="fill" />
      </div>
    </div>
  );
}

export default React.memo(ConvictionThresholdChart);
