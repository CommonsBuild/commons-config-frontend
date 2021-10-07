import Image from 'next/image';
import classnames from 'classnames';
import { Tooltip } from '@/components/_global';
import useHover from '@/hooks/useHover';

interface ConvictionVotingTableProps {
  table: { [key: string]: (number | string)[] };
}

function ConvictionVotingTable({ table }: ConvictionVotingTableProps) {
  const [variablesRef, variablesIsHovered] = useHover<HTMLDivElement>();
  const [scenarioOneRef, scenarioOneIsHovered] = useHover<HTMLDivElement>();
  const [scenarioTwoRef, scenarioTwoIsHovered] = useHover<HTMLDivElement>();
  const [scenarioThreeRef, scenarioThreeIsHovered] = useHover<HTMLDivElement>();
  const [scenarioFourRef, scenarioFourIsHovered] = useHover<HTMLDivElement>();
  const [scenarioFiveRef, scenarioFiveIsHovered] = useHover<HTMLDivElement>();
  const [scenarioSixRef, scenarioSixIsHovered] = useHover<HTMLDivElement>();

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
        <div className="w-4/12 max-w-192">
          <Tooltip
            isHovered={variablesIsHovered}
            text="Take note of these variables as we simulate some of the requirements for successfully passing a funding request"
          >
            <span ref={variablesRef}>
              variables{' '}
              <div className="inline-block mt-1 ml-1">
                <Image src="/questionMark.svg" height="12px" width="12px" />
              </div>
            </span>
          </Tooltip>
        </div>
        <div className="w-1/6 max-w-144">
          <Tooltip
            isHovered={scenarioOneIsHovered}
            text="These scenarios combine imagined Common Pool and Effective Supply values with your Conviction Voting settings."
          >
            <span ref={scenarioOneRef}>
              scenario 1{' '}
              <div className="inline-block mt-1 ml-1">
                <Image src="/questionMark.svg" height="12px" width="12px" />
              </div>
            </span>
          </Tooltip>
        </div>
        <div className="w-1/6 max-w-144">
          <Tooltip
            isHovered={scenarioTwoIsHovered}
            text="These scenarios combine imagined Common Pool and Effective Supply values with your Conviction Voting settings."
          >
            <span ref={scenarioTwoRef}>
              scenario 2{' '}
              <div className="inline-block mt-1 ml-1">
                <Image src="/questionMark.svg" height="12px" width="12px" />
              </div>
            </span>
          </Tooltip>
        </div>
        <div className="w-1/6 max-w-144">
          <Tooltip
            isHovered={scenarioThreeIsHovered}
            text="These scenarios combine imagined Common Pool and Effective Supply values with your Conviction Voting settings."
          >
            <span ref={scenarioThreeRef}>
              scenario 3{' '}
              <div className="inline-block mt-1 ml-1">
                <Image src="/questionMark.svg" height="12px" width="12px" />
              </div>
            </span>
          </Tooltip>
        </div>
        <div className="w-1/6 max-w-144">
          <Tooltip
            isHovered={scenarioFourIsHovered}
            text="These scenarios combine imagined Common Pool and Effective Supply values with your Conviction Voting settings."
          >
            <span ref={scenarioFourRef}>
              scenario 4{' '}
              <div className="inline-block mt-1 ml-1">
                <Image src="/questionMark.svg" height="12px" width="12px" />
              </div>
            </span>
          </Tooltip>
        </div>
        <div className="w-1/6 max-w-144">
          <Tooltip
            isHovered={scenarioFiveIsHovered}
            text="These scenarios combine imagined Common Pool and Effective Supply values with your Conviction Voting settings."
          >
            <span ref={scenarioFiveRef}>
              scenario 5{' '}
              <div className="inline-block mt-1 ml-1">
                <Image src="/questionMark.svg" height="12px" width="12px" />
              </div>
            </span>
          </Tooltip>
        </div>
        <div className="w-1/6 max-w-144">
          <Tooltip
            isHovered={scenarioSixIsHovered}
            text="These scenarios combine imagined Common Pool and Effective Supply values with your Conviction Voting settings."
          >
            <span ref={scenarioSixRef}>
              scenario 6{' '}
              <div className="inline-block mt-1 ml-1">
                <Image src="/questionMark.svg" height="12px" width="12px" />
              </div>
            </span>
          </Tooltip>
        </div>
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
