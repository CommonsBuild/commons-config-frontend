import classnames from 'classnames';

interface ConvictionVotingTableProps {
  table: { [key: string]: (number | string)[] };
}

function ConvictionVotingTable({ table }: ConvictionVotingTableProps) {
  const scenarioTableVariables = [
    { id: 'totalEffectiveSupply', header: 'Effective supply (TEC)' },
    { id: 'amountInCommonPool', header: 'Common Pool (wxDAI)' },
    { id: 'requestedAmount', header: 'Requested Amount (wxDAI)' },
    { id: 'minTokensToPass', header: 'Minimum Tokens Needed (TEC)' },
    {
      id: 'tokensToPassIn2Weeks',
      header: 'Tokens Needed To Pass (TEC)',
    },
  ];
  return (
    <div className="pl-16 pt-6 pb-2 font-bj text-neon-light text-xs">
      <div className="flex justify-between pb-2 mb-2 border-b border-gray-100 uppercase font-bold">
        <div className="w-4/12 max-w-192">variables</div>
        <div className="w-1/6 max-w-144">scenario 1</div>
        <div className="w-1/6 max-w-144">scenario 2</div>
        <div className="w-1/6 max-w-144">scenario 3</div>
        <div className="w-1/6 max-w-144">scenario 4</div>
        <div className="w-1/6 max-w-144">scenario 5</div>
        <div className="w-1/6 max-w-144">scenario 6</div>
      </div>
      {scenarioTableVariables.map((elem) => (
        <div className="flex justify-between items-center mb-2 hover:bg-cyan-700 cursor-pointer">
          <div className="w-1/6 max-w-192 first:w-4/12">{elem.header}</div>
          {table[elem.id]?.map((row) => (
            <span
              className={classnames('w-1/6 max-w-144', {
                'font-bold': elem.id === 'requestedAmount',
              })}
            >
              {row}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ConvictionVotingTable;
