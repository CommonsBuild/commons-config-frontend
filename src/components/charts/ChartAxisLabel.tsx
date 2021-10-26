import { Tooltip } from '../_global';
import { useHover } from '@/hooks';

type Position = 'top' | 'right' | 'bottom' | 'left';
interface ChartAxisLabelProps {
  label: string | React.ReactNode;
  tooltipPosition?: Position;
  tooltipText?: string;
}

function ChartAxisLabel({
  label,
  tooltipPosition,
  tooltipText,
}: ChartAxisLabelProps) {
  const [hoverRef, isHovered] = useHover<HTMLElement>();

  return (
    <Tooltip
      text={tooltipText}
      isHovered={isHovered}
      position={tooltipPosition}
    >
      <span
        ref={hoverRef}
        className="font-bj font-bold text-xxs text-neon-light uppercase"
      >
        {label}
      </span>
    </Tooltip>
  );
}

export default ChartAxisLabel;
