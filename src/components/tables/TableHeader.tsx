import Image from 'next/image';
import classnames from 'classnames';
import { Tooltip } from '../_global';
import { useHover } from '@/hooks';

const headerSize = {
  s: 'w-1/12',
  m: 'w-2/12',
  l: 'w-3/12',
  xl: 'w-4/12',
};

const headerMaxSize = {
  s: 'max-w-36 2xl:max-w-72',
  m: 'max-w-72 2xl:max-w-144',
  l: 'max-w-108 2xl:max-w-216',
  xl: 'max-w-144 2xl:max-w-288',
};

type Size = 's' | 'm' | 'l' | 'xl';

interface TableHeaderProps {
  bold?: boolean;
  headerText: string;
  size?: Size;
  tooltipText?: string | React.ReactNode;
}

function TableHeader({
  bold = true,
  headerText,
  size = 'm',
  tooltipText,
}: TableHeaderProps) {
  const [hoverRef, isHovered] = useHover<HTMLElement>();

  return (
    <div
      className={classnames(
        'flex justify-center 2xl:justify-start',
        headerSize[size],
        headerMaxSize[size]
      )}
    >
      <Tooltip isHovered={isHovered} text={tooltipText}>
        <span className="flex flex-row" ref={hoverRef}>
          <span
            className={classnames(
              'font-bj text-neon-light text-xs text-center 2xl:text-start uppercase',
              bold && 'font-bold'
            )}
          >
            {headerText}
          </span>
          {tooltipText && (
            <div className="flex mx-2 self-center min-w-max">
              <Image src="/icons/questionMark.svg" height="12px" width="12px" />
            </div>
          )}
        </span>
      </Tooltip>
    </div>
  );
}

export default TableHeader;
