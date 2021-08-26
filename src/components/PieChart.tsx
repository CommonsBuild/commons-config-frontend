import React from 'react';
import { Pie } from 'react-chartjs-2';

interface PieChartProps {
  nonQuietVotingPeriod: number;
  quietEndingPeriod: number;
  quietEndingExtension: number;
  executionDelay: number;
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
};

function PieChart({
  nonQuietVotingPeriod,
  quietEndingPeriod,
  quietEndingExtension,
  executionDelay,
}: PieChartProps) {
  const data = {
    labels: [
      'Non-Quiet Voting Period',
      'Quiet Ending Period',
      'Quiet Ending Extension',
      'Execution Delay',
    ],
    datasets: [
      {
        data: [
          nonQuietVotingPeriod,
          quietEndingPeriod,
          quietEndingExtension,
          executionDelay,
        ],
        backgroundColor: ['#FBC948', '#FB9E48', '#03FFD2', '#03D2FF'],
        borderWidth: 0,
      },
    ],
  };
  return <Pie data={data} options={options} />;
}

export default React.memo(PieChart);
