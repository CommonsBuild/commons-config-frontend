import React from 'react';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';

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

interface ChartData {
  price: number[];
  week: number[];
}

const LineChart = ({ price, week }: ChartData) => {
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
        <span className="font-bj font-bold text-xxs text-neon-light uppercase">
          price floor (wxdai)
        </span>
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
          time (weeks)
        </span>
      </div>
    </>
  );
};

export default React.memo(LineChart);
