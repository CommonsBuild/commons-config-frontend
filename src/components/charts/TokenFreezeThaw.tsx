import React from 'react';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';
import ChartAxisLabel from './ChartAxisLabel';

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
      },
      beginAtZero: true,
    },
    yAxes: {
      grid: {
        display: false,
        borderColor: '#03B3FF',
      },
      ticks: {
        color: '#FFFFFF',
        stepSize: 0.2,
      },
      beginAtZero: true,
      position: 'left',
    },
  },
};

interface TokenFreezeThawProps {
  price: number[];
  week: number[];
}

const TokenFreezeThawChart = ({ price, week }: TokenFreezeThawProps) => {
  const data = {
    labels: week || ['0'],
    datasets: [
      {
        label: 'Floor price',
        data: price,
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
    <div className="bg-black" id="freeze-thaw-chart">
      <div className="w-48 h-0 text-center relative top-36 -left-8">
        <ChartAxisLabel
          label="price floor (wxdai)"
          rotate
          tooltipPosition="left"
          tooltipText="The price floor is the minimum possible price of the token. This is a result of tokens being frozen and is affected by the paramaters Token Freeze & Token Thaw."
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
      <div className="w-72 h-0 ml-auto text-center relative bottom-8 right-1/3">
        <ChartAxisLabel label="time (weeks)" />
      </div>
    </div>
  );
};

export default React.memo(TokenFreezeThawChart);
