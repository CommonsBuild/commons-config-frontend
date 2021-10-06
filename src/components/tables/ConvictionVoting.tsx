interface ConvictionVotingTableProps {
  table: { [key: string]: (number | string)[] };
}

function ConvictionVotingTable({ table }: ConvictionVotingTableProps) {
  const scenarioTableVariables = [
    'Amount in Common Pool (wxDai)',
    'Requested Amount (wxDAI)',
    'Min. tokens needed to pass',
    'Tokens needed to pass in 2 weeks',
    'Total effective supply',
  ];
  return (
    <div className="pl-16 pt-6 pb-2 font-bj text-neon-light text-xs">
      <div className="flex justify-between pb-2 mb-2 border-b border-gray-100 uppercase font-bold">
        <div className="w-2/6 max-w-144">variables</div>
        <div className="w-1/6 max-w-144">scenario 1</div>
        <div className="w-1/6 max-w-144">scenario 2</div>
        <div className="w-1/6 max-w-144">scenario 3</div>
        <div className="w-1/6 max-w-144">scenario 4</div>
        <div className="w-1/6 max-w-144">scenario 5</div>
        <div className="w-1/6 max-w-144">scenario 6</div>
      </div>
      {Object.keys(table).map((key, index) => (
        <div className="flex justify-between items-center mb-2 hover:bg-cyan-700 cursor-pointer">
          <div className="w-1/6 max-w-144 first:w-2/6">
            {scenarioTableVariables[index]}
          </div>
          {table[key].map((row) => (
            <span className="w-1/6 max-w-144">{row}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ConvictionVotingTable;
