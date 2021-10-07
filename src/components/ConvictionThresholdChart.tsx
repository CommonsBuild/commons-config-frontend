import React from 'react';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';
import Tooltip from './Tooltip';
import useHover from '../hooks/useHover';

interface ConvictionThresholdProps {
  requestedPercentage: number[];
  thresholdPercentage: number[];
}

const options = {
  responsive: true,
  aspectRatio: 2.75,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: false
    }
  },
  scales: {
    xAxes: {
      type: 'linear',
      grid: {
        display: false,
        borderColor: '#03B3FF'
      },
      ticks: {
        color: '#FFFFFF',
        autoSkip: true,
        maxTicksLimit: 8,
        callback(value) {
          return `${value}%`;
        }
      },
      beginAtZero: true
    },
    yAxes: {
      suggestedMin: 0,
      max: 100,
      grid: {
        display: false,
        borderColor: '#03B3FF'
      },
      ticks: {
        color: '#FFFFFF',
        autoSkip: true,
        stepSize: 20,
        callback(value) {
          return `${value}%`;
        }
      },
      beginAtZero: true,
      position: 'left'
    }
  }
};

function ConvictionThresholdChart({
  requestedPercentage,
  thresholdPercentage
}: ConvictionThresholdProps) {
  const [questionRef, questionIsHovered] = useHover<HTMLDivElement>();
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
        pointStyle: 'rect'
      }
    ]
  };
  return (
    <>
      <div className="w-20 h-0 text-right relative -top-2 -left-14">
        <Tooltip
          isHovered={questionIsHovered}
          text="Effective Supply is the amount of tokens currently voting on all proposals in Conviction Voting. This percentage is the relative amount of TEC tokens staked on this proposal."
        >
          <span
            ref={questionRef}
            className="font-bj font-bold text-xxs text-neon-light uppercase"
          >
            % of <b>effective supply</b> voting on this proposal
          </span>
        </Tooltip>
      </div>
      <div className="flex justify-center py-2">
        <div className="w-11/12">
          <Line data={data} options={options} />
          <div className="relative h-3/5 abc-chart">
            <Image layout="fill" src="/chart_bg.png" />
          </div>
        </div>
      </div>
      <div className="w-24 h-0 ml-auto text-right relative bottom-12 -right-12">
        <span className="font-bj font-bold text-xxs text-neon-light uppercase">
          % of commons pool funds being requested
        </span>
      </div>
      <div className="w-28 h-0 text-center relative bottom-24 -left-20 ">
        <span className="inline-block font-bj font-bold text-xxs text-neon-light uppercase p-2 bg-black-200">
          minimum % of tokens needed to pass
        </span>
      </div>
    </>
  );
}

export default React.memo(ConvictionThresholdChart);
