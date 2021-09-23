import React from 'react';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';
import Tooltip from '@/components/Tooltip';
import useHover from '@/utils/useHover';

interface AugmentedBondingProps {
  balanceInThousands: [];
  price: [];
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
      },
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

function AugmentedBondingCurve({
  balanceInThousands,
  price,
}: AugmentedBondingProps) {
  const [questionRef, questionIsHovered] = useHover<HTMLDivElement>();
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
    <>
      <div className="w-20 h-0 text-right relative -top-2 -left-14">
        <span className="font-bj font-bold text-xxs text-neon-light">
          TOKEN PRICE (wxDAI)
        </span>
      </div>
      <div className="w-44 h-0 ml-auto text-center relative -top-4 -right-6">
        <Tooltip
          isHovered={questionIsHovered}
          text="Setting the Reserve Balance zooms in on a section of the curve to perform transaction simulations."
        >
          <div
            ref={questionRef}
            className="grid grid-flow-col gap-2 justify-between items-center px-4 py-3 bg-black-200 "
          >
            <span className="font-bj font-bold text-xxs text-neon-light">
              RESERVE RATIO: 20%
            </span>
            <Image
              className="m-1"
              alt="Question mark."
              height="12"
              src="/questionMark.svg"
              width="12"
            />
          </div>
        </Tooltip>
      </div>
      <div className="flex justify-center py-2">
        <div className="w-11/12">
          <Line data={data} options={options} />
          <div className="relative h-3/5 abc-chart">
            <Image layout="fill" src="/chart_bg.png" />
          </div>
        </div>
      </div>
      <div className="w-20 h-0 ml-auto text-right relative bottom-12 -right-6">
        <span className="font-bj font-bold text-xxs text-neon-light">
          RESERVE BALANCE (wxDAI)
        </span>
      </div>
    </>
  );
}

export default React.memo(AugmentedBondingCurve);
