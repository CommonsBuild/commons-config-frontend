import Image from 'next/image';
import { Line } from 'react-chartjs-2';
import React from 'react';

const options = {
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

interface AugmentedBondingProps {
  balanceInThousands: [];
  price: [];
}

function AugmentedBondingCurve({
  balanceInThousands,
  price,
}: AugmentedBondingProps) {
  const data = {
    labels: balanceInThousands,
    datasets: [
      {
        label: 'Floor price',
        // yAxisID: "leftScale",
        data: price,
        fill: false,
        borderColor: '#DEFB48',
        pointBackgroundColor: '#DEFB48',
        pointHoverRadius: 7,
        pointRadius: 0,
        pointStyle: 'rect',
      },
    ],
  };
  return (
    <div className="flex">
      <div className="w-32 pr-8 text-right">
        <span className="font-bj font-bold text-xs text-neon-light uppercase">
          token price (wxdai)
        </span>
      </div>
      <div className="w-4/5">
        <Line data={data} options={options} />
        <div className="relative h-2/4 abc-chart">
          <Image layout="fill" src="/chart_bg.png" />
        </div>
      </div>
      <div className="w-20 pl-2 mt-auto text-right">
        <span className="font-bj font-bold text-xs text-neon-light uppercase">
          reserve balance (wxdai)
        </span>
      </div>
    </div>
  );
}

export default React.memo(AugmentedBondingCurve);
