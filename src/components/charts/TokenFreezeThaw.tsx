import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import ChartAxisLabel from './ChartAxisLabel';
import ChartGrid from '@/components/ChartGrid';

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
      ticks: {},
      beginAtZero: true,
      position: 'left',
    },
  },
};

interface TokenFreezeThawProps {
  price: number[];
  week: number[];
  format?: boolean;
}

const TokenFreezeThawChart = ({
  price,
  week,
  format,
}: TokenFreezeThawProps) => {
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

  useEffect(() => {
    if (format) {
      options.scales.yAxes.ticks = {
        color: '#FFFFFF',
        stepSize: 20,
        callback(value) {
          return `${value.toFixed(2)}%`;
        },
      };
    } else {
      options.scales.yAxes.ticks = {
        color: '#FFFFFF',
        stepSize: 0.2,
        callback(value) {
          return value.toFixed(2);
        },
      };
    }
  }, []);

  return (
    <ChartGrid
      id="freeze-thaw-chart"
      chart={<Line data={data} options={options} />}
      xAxisLabel={<ChartAxisLabel label="time (weeks)" />}
      yAxisLabel={
        <ChartAxisLabel
          label={
            format
              ? '% of Hatchers Tokens that are Liquid'
              : 'price floor (wxdai)'
          }
          rotate
          tooltipPosition="left"
          tooltipText="The price floor is the minimum possible price of the token. This is a result of tokens being frozen and is affected by the parameters Token Freeze &amp; Token Thaw."
        />
      }
    />
  );
};

export default React.memo(TokenFreezeThawChart);
