import Image from 'next/image';
import { Tooltip } from '@/components/_global';
import useHover from '@/hooks/useHover';

interface ABCProps {
  stepList: (string | number)[][];
  table: { [key: string]: (number | string)[] };
}
function ABCTable({ stepList, table }: ABCProps) {
  const [stepHeader, stepHeaderIsHovered] = useHover<HTMLDivElement>();
  const [currentPriceHeader, currentPriceHeaderIsHovered] =
    useHover<HTMLDivElement>();
  const [currentSupplyHeader, currentSupplyHeaderIsHovered] =
    useHover<HTMLDivElement>();
  const [amountInHeader, amountInHeaderIsHovered] = useHover<HTMLDivElement>();
  const [tributeHeader, tributeHeaderIsHovered] = useHover<HTMLDivElement>();
  const [amountOutHeader, amountOutHeaderIsHovered] =
    useHover<HTMLDivElement>();
  const [newPriceHeader, newPriceHeaderIsHovered] = useHover<HTMLDivElement>();
  const [slippageHeader, slippageHeaderIsHovered] = useHover<HTMLDivElement>();

  const headerOrder = [
    'step',
    'currentPriceParsed',
    'currentSupplyParsed',
    'amountIn',
    'tributeCollected',
    'amountOut',
    'newPriceParsed',
    'slippage',
  ];

  return (
    <div className="pl-16 py-6 font-bj text-neon-light text-xs">
      <div className="flex justify-between items-end pb-2 mb-2 border-b border-gray-100 uppercase font-bold">
        <div className="w-1/12 max-w-144">
          <Tooltip
            isHovered={stepHeaderIsHovered}
            text="Each step on the curve represents a transaction. The first 3 steps are generated by the market scenario. You can add up to 3 more."
          >
            <span ref={stepHeader}>
              step{' '}
              <div className="inline-block mt-1">
                <Image src="/questionMark.svg" height="12px" width="12px" />
              </div>
            </span>
          </Tooltip>
        </div>
        <div className="w-1/5 max-w-144">
          <Tooltip
            isHovered={currentPriceHeaderIsHovered}
            text="The price of the TEC token at the beginning of the transaction."
          >
            <span ref={currentPriceHeader}>
              current price{' '}
              <div className="inline-block mt-1">
                <Image src="/questionMark.svg" height="12px" width="12px" />
              </div>
            </span>
          </Tooltip>
        </div>
        <div className="w-1/5 max-w-144">
          <Tooltip
            isHovered={currentSupplyHeaderIsHovered}
            text="The total amount of TEC currently in circulation."
          >
            <span ref={currentSupplyHeader}>
              total supply{' '}
              <div className="inline-block mt-1">
                <Image src="/questionMark.svg" height="12px" width="12px" />
              </div>
            </span>
          </Tooltip>
        </div>
        <div className="w-1/5 max-w-144">
          <Tooltip
            isHovered={amountInHeaderIsHovered}
            text=" If the amount in is wxDAI this step is a BUY order.  If the amount in is TEC then the step is a SELL order."
          >
            <span ref={amountInHeader}>
              amount in{' '}
              <div className="inline-block mt-1">
                <Image src="/questionMark.svg" height="12px" width="12px" />
              </div>
            </span>
          </Tooltip>
        </div>
        <div className="w-1/5 max-w-144">
          <Tooltip
            isHovered={tributeHeaderIsHovered}
            text="The amount of funds taken from the order and sent to the Common Pool."
          >
            <span ref={tributeHeader}>
              tribute collected{' '}
              <div className="inline-block mt-1">
                <Image src="/questionMark.svg" height="12px" width="12px" />
              </div>
            </span>
          </Tooltip>
        </div>
        <div className="w-1/5 max-w-144">
          <Tooltip
            isHovered={amountOutHeaderIsHovered}
            text=" If the amount out is wxDAI this step is a SELL order.  If the amount out is TEC then this step is a BUY order."
          >
            <span ref={amountOutHeader}>
              amount out{' '}
              <div className="inline-block mt-1">
                <Image src="/questionMark.svg" height="12px" width="12px" />
              </div>
            </span>
          </Tooltip>
        </div>
        <div className="w-1/5 max-w-144">
          <Tooltip
            isHovered={newPriceHeaderIsHovered}
            text="The updated price of the TEC token resulting from the transaction."
          >
            <span ref={newPriceHeader}>
              new price{' '}
              <div className="inline-block mt-1">
                <Image src="/questionMark.svg" height="12px" width="12px" />
              </div>
            </span>
          </Tooltip>
        </div>
        <div className="w-1/5 max-w-144">
          <Tooltip
            isHovered={slippageHeaderIsHovered}
            text="The TEC token price fluctuates based on the size of BUYS and SELLS along the curve. The price slippage is the relative movement between the initial and closing price of TEC in a single transaction."
          >
            <span ref={slippageHeader}>
              price slippage{' '}
              <div className="inline-block mt-1">
                <Image src="/questionMark.svg" height="12px" width="12px" />
              </div>
            </span>
          </Tooltip>
        </div>
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
