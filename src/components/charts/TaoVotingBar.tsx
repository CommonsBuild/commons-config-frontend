import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartAxisLabel from './ChartAxisLabel';

const options = {
  responsive: true,
  aspectRatio: 2,
  indexAxis: 'y',
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

interface TaoVotingBarProps {
  nonQuietVotingPeriod: number;
  delegatedVotingPeriod: number;
  delegatedAndNonDelegatedVoting: number;
  quietEndingPeriod: number;
  quietEndingExtension: number;
  executionDelay: number;
}

function TaoVotingBar({
  nonQuietVotingPeriod,
  delegatedVotingPeriod,
  delegatedAndNonDelegatedVoting,
  quietEndingPeriod,
  quietEndingExtension,
  executionDelay,
}: TaoVotingBarProps) {
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
    <div className="px-9 pb-6 flex  bg-black" id="tao-chart">
      <div className="flex flex-col justify-between text-center pt-14 pb-24 w-20">
        <ChartAxisLabel label="Voting Process" />
        <ChartAxisLabel label="Delegated voting" />
        <ChartAxisLabel label="Voting Process with an Extension" />
      </div>
      <div className="w-9/12 mb-8">
        <Bar data={data} options={options} height={140} />
      </div>
      <div className="mt-auto ml-4 w-20 text-center relative bottom-2 right-1/3">
        <ChartAxisLabel
          label="time (days)"
          tooltipText="The amount of time allocated to each phase of the voting process."
        />
      </div>
    </div>
  );
}

export default React.memo(TaoVotingBar);
