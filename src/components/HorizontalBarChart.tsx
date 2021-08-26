import React from 'react';
import { Bar } from 'react-chartjs-2';
import Tooltip from './Tooltip';
import useHover from '../utils/useHover';

const options = {
  indexAxis: 'y',
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    y: {
      stacked: true,
      barThickness: 0.5,
      grid: {
        display: false,
        borderColor: '#03B3FF',
      },
      ticks: {
        color: '#FFFFFF',
        beginAtZero: true,
        textStrokeWidth: 100,
        padding: 15,
      },
    },

    xAxes: {
      stacked: true,
      barThickness: 100,
      grid: {
        display: false,
        borderColor: '#03B3FF',
      },
      ticks: {
        color: '#FFFFFF',
      },
    },
  },
};
interface BarChartProps {
  nonQuietVotingPeriod: number;
  delegatedVotingPeriod: number;
  delegatedAndNonDelegatedVoting: number;
  quietEndingPeriod: number;
  quietEndingExtension: number;
  executionDelay: number;
}

function HorizontalBarChart({
  nonQuietVotingPeriod,
  delegatedVotingPeriod,
  delegatedAndNonDelegatedVoting,
  quietEndingPeriod,
  quietEndingExtension,
  executionDelay,
}: BarChartProps) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  const data = {
    labels: [[], [], []],
    datasets: [
      {
        label: 'First bar',
        data: [
          nonQuietVotingPeriod,
          delegatedVotingPeriod,
          delegatedAndNonDelegatedVoting,
        ],
        backgroundColor: ['#FBC948', '#B01BF6', '#03B3FF'],
        borderWidth: 1,
        barThickness: 46,
      },
      {
        label: 'Second bar',
        data: [quietEndingPeriod, 0, quietEndingExtension],
        backgroundColor: ['#FB9E48', 'black', '#03D2FF'],
        borderWidth: 1,
        barThickness: 46,
      },
      {
        label: 'Third bar',
        data: [executionDelay, 0, executionDelay],
        backgroundColor: '#03FFD2',
        borderWidth: 1,
        barThickness: 46,
      },
    ],
  };

  return (
    <div className="px-9 pb-6 flex">
      <div className="flex flex-col justify-between py-12 w-20">
        <span className="font-bj text-xs text-neon-light text-center">
          Voting Process
        </span>
        <span className="font-bj text-xs text-neon-light text-center">
          Delegated voting
        </span>
        <span className="font-bj text-xs text-neon-light text-center">
          Voting Process with an Extension
        </span>
      </div>
      <div className="flex-grow" style={{ maxWidth: '700px' }}>
        <Bar data={data} options={options} height={140} />
      </div>
      <div className="mt-auto ml-4 w-20 text-center">
        <Tooltip
          text="The amount of time allocated to each phase of the voting process."
          isHovered={isHovered}
        >
          <span
            ref={hoverRef}
            className="font-bj text-xs text-neon-light uppercase"
          >
            time (days)
          </span>
        </Tooltip>
      </div>
    </div>
  );
}

export default React.memo(HorizontalBarChart);
