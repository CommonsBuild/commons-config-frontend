interface TableRowProps {
  children: React.ReactNode;
}

function TableRow({ children }: TableRowProps) {
  return (
    <div className="flex justify-between items-center py-1 hover:bg-cyan-700 cursor-default">
      {children}
    </div>
  );
}

export default TableRow;
