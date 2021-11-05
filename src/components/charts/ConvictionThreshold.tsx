import React from 'react';
import { Line } from 'react-chartjs-2';
import ChartAxisLabel from './ChartAxisLabel';
import ChartGrid from '@/components/ChartGrid';

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
    <ChartGrid
      id="conviction-chart"
      chart={<Line data={data} options={options} />}
      xAxisLabel={
        <ChartAxisLabel
          label={
            <span>
              % of <b className="text-neon">common pool</b> funds being
              requested
            </span>
          }
          tooltipText="The Common Pool holds funds that will be used for realizing the initiatives of the TEC."
        />
      }
      yAxisLabel={
        <ChartAxisLabel
          label={
            <span>
              % of <b className="text-neon">effective supply</b> on this
              proposal
            </span>
          }
          rotate
          tooltipPosition="left"
          tooltipText="Effective Supply is the amount of tokens currently voting on all proposals in Conviction Voting. This percentage is the relative amount of TEC tokens staked on this proposal."
        />
      }
    />
  );
}

export default React.memo(ConvictionThresholdChart);
