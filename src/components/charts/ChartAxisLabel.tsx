import { Tooltip } from '../_global';
import { useHover } from '@/hooks';

interface ChartAxisLabelProps {
  label: string | React.ReactNode;
  tooltipText?: string;
}

function ChartAxisLabel({ label, tooltipText }: ChartAxisLabelProps) {
  const [hoverRef, isHovered] = useHover<HTMLElement>();

  return (
    <Tooltip text={tooltipText} isHovered={isHovered}>
      <span
        ref={hoverRef}
        className="font-bj text-xs text-neon-light uppercase"
      >
        {label}
      </span>
    </Tooltip>
  );
}

export default ChartAxisLabel;
