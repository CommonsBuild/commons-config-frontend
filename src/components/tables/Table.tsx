interface TableProps {
  content: React.ReactNode;
  header: React.ReactNode;
}

function Table({ content, header }: TableProps) {
  return (
    <div className="pl-16 pt-6 pb-2">
      <div className="flex justify-between items-center pb-2 mb-2 border-b border-gray-100">
        {header}
      </div>
      {content}
    </div>
  );
}
export default Table;
