import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: [
    // ['Voting', 'Process'],
    // ['Delegated', 'Voting'],
    // ['Voting', 'Process with an', 'Extension'],
    [],
    [],
    [],
  ],
  datasets: [
    {
      label: 'First bar',
      data: [4.5, 3, 6],
      backgroundColor: ['#FBC948', '#B01BF6', '#03B3FF'],
      borderWidth: 1,
      barThickness: 46,
    },
    {
      label: 'Second bar',
      data: [1.5, 0, 3],
      backgroundColor: ['#FB9E48', 'black', '#03D2FF'],
      borderWidth: 1,
      barThickness: 46,
    },
    {
      label: 'Third bar',
      data: [3, 0, 3],
      backgroundColor: '#03FFD2',
      borderWidth: 1,
      barThickness: 46,
    },
  ],
};

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

const HorizontalBarChart = () => (
  <div className="px-9 pb-6 flex">
    <div className="flex flex-col justify-between w-20">
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
  </div>
);

export default React.memo(HorizontalBarChart);
