import React from 'react';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';
import { Tooltip } from '@/components/_global';
import { useHover } from '@/hooks';
import ChartAxisLabel from './ChartAxisLabel';

function CustomChartAxisLabel({ handleDatasets, reserveRatio }) {
  const [questionRef, questionIsHovered] = useHover<HTMLDivElement>();

  return (
    <Tooltip
      isHovered={questionIsHovered}
      text="Setting the Reserve Balance zooms in on a section of the curve to perform transaction simulations."
    >
      <div
        ref={questionRef}
        className="grid grid-flow-col gap-2 justify-between items-center px-4 py-3 bg-black-200"
        onClick={() => handleDatasets()}
      >
        <span className="font-bj font-bold text-xxs text-neon-light">
          RESERVE RATIO: {reserveRatio}%
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
  );
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
      type: 'linear',
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

interface ABCProps {
  balanceInThousands: number[];
  price: number[];
  reserveRatio: string;
  stepLinSpaces: { [key: string]: number[] };
  singleDataPoints: any[];
}

function ABCChart({
  balanceInThousands,
  price,
  reserveRatio,
  stepLinSpaces,
  singleDataPoints,
}: ABCProps) {
  const handleData = (xAxesData, yAxesData) => {
    const data = [];
    xAxesData?.forEach((elem, index) => {
      data.push({ x: elem, y: yAxesData[index] });
    });

    return data;
  };

  const getColor = (array) => {
    if (array) {
      if (array[0] > array.at(-1)) {
        return 'rgba(226, 65, 65, 0.7)';
      }

      return 'rgba(65, 226, 130, 0.7)';
    }
    return 'transparent';
  };

  const handleDatasets = () => {
    const datasets = [
      {
        label: 'Floor price',
        data: price,
        fill: false,
        borderColor: '#DEFB48',
        pointBackgroundColor: '#DEFB48',
        pointHoverRadius: 7,
        pointRadius: 0,
        pointStyle: 'rect',
        backgroundColor: 'transparent',
      },
    ];

    datasets.push({
      label: 'Selected lin space',
      fill: true,
      data: handleData(stepLinSpaces?.x, stepLinSpaces?.y),
      borderColor: '#DEFB48',
      pointBackgroundColor: '#DEFB48',
      pointHoverRadius: 7,
      pointRadius: 0,
      pointStyle: 'rect',
      backgroundColor: getColor(stepLinSpaces?.x),
    });

    datasets.push({
      label: 'Data points',
      fill: true,
      data: singleDataPoints,
      borderColor: '#DEFB48',
      pointBackgroundColor: '#DEFB48',
      pointHoverRadius: 7,
      pointRadius: 5,
      pointStyle: 'rect',
      backgroundColor: 'transparent',
    });
    return datasets;
  };

  const data = {
    labels: balanceInThousands,
    datasets: handleDatasets(),
  };

  return (
    <>
      <div className="w-20 h-0 text-right relative -top-2 -left-14">
        <ChartAxisLabel label="token price (wxdai)" />
      </div>
      <div className="w-44 h-0 ml-auto text-center relative -top-4 -right-6">
        <CustomChartAxisLabel
          handleDatasets={handleDatasets}
          reserveRatio={reserveRatio}
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
      <div className="w-20 h-0 ml-auto text-right relative bottom-12 -right-6">
        <ChartAxisLabel label="reserve balance (wxDAI)" />
      </div>
    </>
  );
}

export default React.memo(ABCChart);
