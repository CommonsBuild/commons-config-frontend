interface ABCProps {
  stepList: (string | number)[][];
  table: { [key: string]: (number | string)[] };
}
function ABCTable({ stepList, table }: ABCProps) {
  const headerOrder = [
    'step',
    'currentPriceParsed',
    'amountIn',
    'tributeCollected',
    'amountOut',
    'newPriceParsed',
    'slippage',
  ];

  return (
    <div className="pl-16 py-6 font-bj text-neon-light text-xs">
      <div className="flex justify-between items-end pb-2 mb-2 border-b border-gray-100 uppercase font-bold">
        <div className="w-1/12 max-w-144">step</div>
        <div className="w-1/5 max-w-144">current price</div>
        <div className="w-1/5 max-w-144">amount in</div>
        <div className="w-1/5 max-w-144">tribute collected</div>
        <div className="w-1/5 max-w-144">amount out</div>
        <div className="w-1/5 max-w-144">new price</div>
        <div className="w-1/5 max-w-144">price slippage</div>
      </div>
      {Object.keys(stepList).map((elem, index) => (
        <div className="flex justify-between items-center hover:bg-cyan-700 cursor-pointer">
          {Object.keys(table).map((key, kIndex) => (
            <span className="w-1/5 max-w-144 py-1 first:w-1/12 first:pl-2">
              {table[headerOrder[kIndex]][index]}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ABCTable;
