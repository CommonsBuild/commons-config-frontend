import React from 'react';
import { Pie } from 'react-chartjs-2';

const data = {
  labels: [
    'Non-Quiet Voting Period',
    'Quiet Ending Period',
    'Quiet Ending Extension',
    'Execution Delay',
  ],
  datasets: [
    {
      data: [60, 10, 10, 10],
      backgroundColor: ['#FBC948', '#FB9E48', '#03FFD2', '#03D2FF'],
      borderWidth: 0,
    },
  ],
};

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

function PieChart() {
  return <Pie data={data} options={options} />;
}

export default React.memo(PieChart);
