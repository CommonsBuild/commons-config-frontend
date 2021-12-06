import React from 'react';
import { Line } from 'react-chartjs-2';
import ChartAxisLabel from './ChartAxisLabel';
import ChartGrid from '../ChartGrid';

interface ConvictionGrowthProps {
  convictionPercentage: number[];
  timeDays: number[];
  dataPoints: { [key: string]: number }[];
}

const options = {
  responsive: true,
  aspectRatio: 2.1,
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
        autoSkip: true,
        maxTicksLimit: 10,
      },
    },
    yAxes: {
      grid: {
        display: false,
        borderColor: '#03B3FF',
      },
      ticks: {
        color: '#FFFFFF',
        autoSkip: true,
        maxTicksLimit: 6,
      },
      beginAtZero: true,
    },
  },
};

function ConvictionGrowthChart({
  convictionPercentage,
  timeDays,
  dataPoints,
}: ConvictionGrowthProps) {
  const data = {
    labels: timeDays,
    datasets: [
      {
        label: 'Floor price',
        data: convictionPercentage,
        fill: false,
        borderColor: '#DEFB48',
        pointBackgroundColor: '#DEFB48',
        pointHoverRadius: 0,
        pointRadius: 0,
        pointStyle: 'rect',
      },
      {
        label: 'Data points',
        data: dataPoints,
        fill: false,
        borderColor: '#DEFB48',
        pointBackgroundColor: '#DEFB48',
        pointHoverRadius: 7,
        pointRadius: 7,
        pointStyle: 'rect',
        showLine: false,
      },
    ],
  };

  return (
    <>
      <div className="w-20 h-0 text-right relative -top-12 -left-2">
        <ChartAxisLabel label="% of maximum conviction" />
      </div>
      <ChartGrid
        id="q"
        chart={<Line data={data} options={options} />}
        xAxisLabel={<ChartAxisLabel label="days" />}
        yAxisLabel={<></>}
      />
      {/* <div className="flex justify-center py-2">
        <div className="w-full">
          <div className="relative h-3/5 abc-chart">
            <Image layout="fill" src="/chart_bg.png" />
          </div>
          <Line data={data} options={options} />
        </div>
      </div> */}
      {/* <div className="w-24 h-0 ml-auto text-right relative bottom-2">
        <ChartAxisLabel label="days" />
      </div> */}
    </>
  );
}

export default React.memo(ConvictionGrowthChart);
