import classnames from 'classnames';

const cellSize = {
  s: 'w-1/12',
  m: 'w-2/12',
  l: 'w-3/12',
  xl: 'w-4/12',
};

const cellMaxSize = {
  s: 'max-w-36 2xl:max-w-72',
  m: 'max-w-72 2xl:max-w-144',
  l: 'max-w-108 2xl:max-w-216',
  xl: 'max-w-144 2xl:max-w-288',
};

type Size = 's' | 'm' | 'l' | 'xl';

interface TableCellProps {
  bold?: boolean;
  content?: string | number | React.ReactNode;
  size?: Size;
  tooltipColumn?: boolean;
}

function TableCell({
  bold,
  content,
  size = 'm',
  tooltipColumn,
}: TableCellProps) {
  return (
    <div
      className={classnames(
        'flex justify-center 2xl:block',
        tooltipColumn && 'pr-5',
        cellSize[size],
        cellMaxSize[size]
      )}
    >
      <span
        className={classnames(
          'font-bj text-neon-light text-xxs text-center 2xl:text-xs 2xl:text-start',
          {
            'font-bold': bold,
          }
        )}
      >
        {content}
      </span>
    </div>
  );
}
export default TableCell;
