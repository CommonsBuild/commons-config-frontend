import classnames from 'classnames';

interface ChartLegendProps {
  name: string;
  bgColor?: string;
  colAlign?: boolean;
}

function ChartLegend({ name, bgColor, colAlign }: ChartLegendProps) {
  const legendColors = {
    yellow: 'bg-chart-yellow',
    orange: 'bg-chart-orange',
    turquoise: 'bg-chart-turquoise',
    'dark-blue': 'bg-chart-dark-blue',
    blue: 'bg-chart-blue',
    purple: 'bg-chart-purple',
  };

  return (
    <div
      className={classnames('flex p-2 my-2', {
        'last:col-start-3': colAlign,
      })}
    >
      <div className={classnames('h-4 w-4 mr-4', legendColors[bgColor])} />
      <span className="font-bj font-bold text-neon-light text-xs uppercase">
        {name}
      </span>
    </div>
  );
}

export default ChartLegend;
