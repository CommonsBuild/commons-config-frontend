import classnames from 'classnames';

interface TableRowProps {
  children: React.ReactNode;
  hidden?: boolean;
}

function TableRow({ children, hidden }: TableRowProps) {
  return (
    <div
      className={classnames(
        'flex justify-between items-center py-1 hover:bg-cyan-700 cursor-default',
        { hidden }
      )}
    >
      {children}
    </div>
  );
}

export default TableRow;
