import React from 'react';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';
import Tooltip from '@/components/Tooltip';
import useHover from '@/utils/useHover';

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
        callback(val, index, values) {
          return index === values.length - 1 ? '' : val;
        },
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

interface ChartData {
  price: number[];
  week: number[];
}

function FreezeThawChart({ price, week }: ChartData) {
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
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  return (
    <div style={{ maxHeight: '400px' }} className="px-9">
      <div
        style={{ maxWidth: '100px' }}
        className="flex justify-between pb-3  z-10"
      >
        <Tooltip
          text="The minimum possible price of the TEC token."
          isHovered={isHovered}
        >
          <span
            ref={hoverRef}
            className="font-bj font-bold text-xs text-neon-light uppercase"
          >
            PRICE FLOOR (wxDAI)
          </span>
        </Tooltip>
      </div>
      <Line
        className="relative z-10"
        data={data}
        options={options}
        height={90}
      />
      <div className="w-full text-right relative bottom-6">
        <span className="font-bj font-bold text-xs text-neon-light uppercase">
          TIME (WEEKS)
        </span>
      </div>
      <div className="relative h-2/4 chart">
        <Image src="/chart_bg.png" layout="fill" />
      </div>
    </div>
  );
}

export default React.memo(FreezeThawChart);
