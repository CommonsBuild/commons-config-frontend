import Image from 'next/image';
import { Tooltip } from '@/components/_global';
import useHover from '@/hooks/useHover';

interface PriceTableProps {
  table: { [key: string]: number[] };
}

function TokenFreezeThawTable({ table }: PriceTableProps) {
  const [firstHeader, firstHeaderIsHovered] = useHover<HTMLDivElement>();
  const [secondHeader, secondHeaderIsHovered] = useHover<HTMLDivElement>();
  const [thirdHeader, thirdHeaderIsHovered] = useHover<HTMLDivElement>();
  return (
    <div className="pl-16 pt-6 pb-2 font-bj text-neon-light text-xs">
      <div className="flex justify-between pb-2 mb-2 border-b border-gray-100 uppercase font-bold">
        <div className="w-1/3 max-w-192 table-text">
          <Tooltip
            isHovered={firstHeaderIsHovered}
            text="The initial price of the TEC token after the Commons Upgrade is complete."
          >
            <span ref={firstHeader}>
              # of weeks{' '}
              <div className="inline-block mt-1 ml-1">
                <Image src="/questionMark.svg" height="12px" width="12px" />
              </div>
            </span>
          </Tooltip>
        </div>
        <div className="w-1/3 max-w-192">
          <Tooltip
            isHovered={secondHeaderIsHovered}
            text="The initial price of the TEC token after the Commons Upgrade is complete."
          >
            <span ref={secondHeader}>
              % tokens released{' '}
              <div className="inline-block mt-1 ml-1">
                <Image src="/questionMark.svg" height="12px" width="12px" />
              </div>
            </span>
          </Tooltip>
        </div>
        <div className="w-1/3 max-w-192">
          <Tooltip
            isHovered={thirdHeaderIsHovered}
            text="The initial price of the TEC token after the Commons Upgrade is complete."
          >
            <span ref={thirdHeader}>
              price floor of token{' '}
              <div className="inline-block mt-1 ml-1">
                <Image src="/questionMark.svg" height="12px" width="12px" />
              </div>
            </span>
          </Tooltip>
        </div>
      </div>
      {table.price?.map((elem, index) => (
        <div
          key={index}
          className="flex justify-between py-1 hover:bg-cyan-700 cursor-pointer"
        >
          <div className="w-1/3 max-w-192">{table.week[index]} weeks</div>
          <div className="w-1/3 max-w-192">
            {Number(table.tokensReleased[index].toFixed(2)) * 100}%
          </div>
          <div className="w-1/3 max-w-192">{elem.toFixed(2)} wxDAI</div>
        </div>
      ))}
    </div>
  );
}

export default TokenFreezeThawTable;
