import React from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import { Line } from 'react-chartjs-2';
import { Tooltip } from '@/components/_global';
import { useHover } from '@/hooks';
import ChartAxisLabel from './ChartAxisLabel';
import formatOutput from '@/utils/formatOutput';

const textColors = {
  neon: 'text-neon',
  white: 'text-neon-light',
};

type TextColor = 'neon' | 'white';
interface CustomChartAxisLabelProps {
  color?: TextColor;
  label: string;
}

function CustomChartAxisLabel({
  color = 'white',
  label,
}: CustomChartAxisLabelProps) {
  const [questionRef, questionIsHovered] = useHover<HTMLDivElement>();

  return (
    <Tooltip
      isHovered={questionIsHovered}
      text={
        <span>
          Reserve Ratio is an output of the Opening Price and Commons Tribute,
          it defines the shape of the ABC.{' '}
          <b className="text-neon">
            Click to learn more about the Reserve Ratio.
          </b>
        </span>
      }
    >
      <div
        ref={questionRef}
        className="grid grid-flow-col gap-2 justify-between items-center p-3 bg-black-200"
      >
        <a
          href="https://forum.tecommons.org/t/augmented-bonding-curve-opening-price-reserve-ratio/516"
          target="_blank"
          rel="noreferrer"
        >
          <span
            className={classnames(
              'font-bj font-bold text-xs cursor-pointer',
              textColors[color]
            )}
          >
            {label}
          </span>
        </a>
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
  commonPoolAmount: string;
  stepLinSpaces: { [key: string]: number[] };
  singleDataPoints: any[];
}

function ABCChart({
  balanceInThousands,
  price,
  reserveRatio,
  commonPoolAmount,
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
      borderColor: 'transparent',
      pointBackgroundColor: 'transparent',
      pointHoverRadius: 7,
      pointRadius: 0,
      pointStyle: 'rect',
      backgroundColor: getColor(stepLinSpaces?.x),
    });

    datasets.push({
      label: 'Data points',
      fill: true,
      data: singleDataPoints,
      borderColor: 'transparent',
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
      <div className="max-w-max h-0 text-center relative -top-2 left-24">
        <CustomChartAxisLabel
          label={`COMMON POOL AT LAUNCH: ${formatOutput(
            commonPoolAmount
          )} wxDAI`}
        />
      </div>
      <div className="max-w-max h-0 text-center relative top-12 left-24">
        <CustomChartAxisLabel
          color="neon"
          label={`RESERVE RATIO: ${reserveRatio}%`}
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
