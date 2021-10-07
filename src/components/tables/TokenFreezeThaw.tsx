interface PriceTableProps {
  table: { [key: string]: number[] };
}

function TokenFreezeThawTable({ table }: PriceTableProps) {
  return (
    <div className="pl-16 pt-6 pb-2 font-bj text-neon-light text-xs">
      <div className="flex justify-between pb-2 mb-2 border-b border-gray-100 uppercase font-bold">
        <div className="w-1/3 max-w-144 table-text"># of weeks</div>
        <div className="w-1/3 max-w-144">% tokens released</div>
        <div className="w-1/3 max-w-144">price floor of token</div>
      </div>
      {table.price?.map((elem, index) => (
        <div
          key={index}
          className="flex justify-between py-1 hover:bg-cyan-700 cursor-default"
        >
          <div className="w-1/3 max-w-144 pl-2">{table.week[index]} weeks</div>
          <div className="w-1/3 max-w-144">
            {Number(table.tokensReleased[index].toFixed(2)) * 100}%
          </div>
          <div className="w-1/3 max-w-144">{elem.toFixed(2)} wxDAI</div>
        </div>
      ))}
    </div>
  );
}

export default TokenFreezeThawTable;
