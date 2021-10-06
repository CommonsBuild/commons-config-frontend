import classnames from 'classnames';
import Tooltip from './Tooltip';
import useHover from '../hooks/useHover';

interface ChartLegendProps {
  name: string;
  bgColor?: string;
  colAlign?: boolean;
  tooltipText?: string;
}

function ChartLegend({
  name,
  bgColor,
  colAlign,
  tooltipText,
}: ChartLegendProps) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
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
      <Tooltip text={tooltipText} isHovered={isHovered}>
        <div className={classnames('h-4 w-4 mr-4', legendColors[bgColor])} />
        <span
          ref={hoverRef}
          className="font-bj font-bold text-neon-light text-xs uppercase"
        >
          {name}
        </span>
      </Tooltip>
    </div>
  );
}

export default ChartLegend;
