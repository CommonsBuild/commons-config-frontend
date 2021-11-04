import React from 'react';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';
import ChartAxisLabel from './ChartAxisLabel';

interface ConvictionThresholdProps {
  requestedPercentage: number[];
  thresholdPercentage: number[];
}

const options = {
  responsive: true,
  aspectRatio: 2.75,
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
        callback(value) {
          return `${value}%`;
        },
      },
      beginAtZero: true,
    },
    yAxes: {
      suggestedMin: 0,
      max: 100,
      grid: {
        display: false,
        borderColor: '#03B3FF',
      },
      ticks: {
        color: '#FFFFFF',
        autoSkip: true,
        stepSize: 20,
        callback(value) {
          return `${value}%`;
        },
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
    <div className="bg-black" id="conviction-chart">
      <div className="w-48 text-center relative top-36 -left-20">
        <ChartAxisLabel
          label={
            <span className="font-bj font-bold text-xxs text-neon-light uppercase">
              % of <b className="text-neon">effective supply</b> voting on this
              proposal
            </span>
          }
          rotate
          tooltipPosition="left"
          tooltipText="Effective Supply is the amount of tokens currently voting on all proposals in Conviction Voting. This percentage is the relative amount of TEC tokens staked on this proposal."
        />
      </div>
      <div className="flex justify-center py-2 mb-8">
        <div className="w-11/12">
          <Line data={data} options={options} />
          <div className="relative h-3/5 abc-chart">
            <Image layout="fill" src="/chart_bg.png" />
          </div>
        </div>
      </div>
      <div className="w-72 h-0 ml-auto text-center relative bottom-8 right-1/3 z-10">
        <ChartAxisLabel
          label="% of common pool funds being requested"
          tooltipText="The Common Pool holds funds that will be used for realizing the initiatives of the TEC."
        />
      </div>
      <div className="w-28 h-0 text-center relative bottom-24 -left-28">
        <ChartAxisLabel
          label={
            <span className="inline-block font-bj font-bold text-xxs text-neon-light uppercase p-2 bg-black-200">
              minimum % of tokens needed to pass
            </span>
          }
        />
      </div>
    </div>
  );
}

export default React.memo(ConvictionThresholdChart);
