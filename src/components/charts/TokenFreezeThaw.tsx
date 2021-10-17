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
    <>
      <div className="w-20 h-0 text-right relative -top-2 -left-14">
        <ChartAxisLabel
          label="price floor (wxdai)"
          tooltipText="The price floor is the minimum possible price of the token. This is a result of tokens being frozen and is affected by the paramaters Token Freeze & Token Thaw."
        />
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
        <ChartAxisLabel label="time (weeks)" />
      </div>
    </>
  );
};

export default React.memo(TokenFreezeThawChart);
