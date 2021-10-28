import { useState } from 'react';
import { Link as LinkScroll } from 'react-scroll';
import classnames from 'classnames';
import AnalysisContainer from './AnalysisContainer';
import { initialParams } from '@/hooks/useParams';
import {
  ABCChart,
  ConvictionThresholdChart,
  TaoVotingBar,
  TokenFreezeThawChart,
} from '@/components/charts';
import {
  useTokenFreezeThaw,
  useABC,
  useTaoVoting,
  useConvictionVoting,
} from '@/hooks';
import {
  TokenFreezeThawTable,
  ABCTable,
  TaoVotingTable,
  ConvictionVotingTable,
} from '@/components/tables';

function SubmitAnalysis({ params }) {
  const [inFocus, setInFocus] = useState<number>(1);
  const { chart, table } = useTokenFreezeThaw();
  const {
    balanceInThousands,
    price,
    stepLinSpaces,
    singlePoints,
    stepTable: ABCTableData,
  } = useABC();
  const launchValue =
    (Number(initialParams.reserveBalance) -
      Number(params.ragequitAmount) -
      Number(params.initialBuy)) *
    (1 - Number(params.commonsTribute) / 100);
  const { barChart: taoChartData, table: taoTableData } = useTaoVoting();
  const { convictionThresholdChart, table: ConvictionVotingTableData } =
    useConvictionVoting();

  const navbarItems = [
    { id: 1, section: 'token freeze & token thaw', target: 'tokenFreezeThaw' },
    { id: 2, section: 'augmented bonding curve', target: 'ABC' },
    { id: 3, section: 'modifying the commons', target: 'taoVoting' },
    { id: 4, section: 'requesting funds', target: 'convictionVoting' },
  ];

  return (
    <div className="flex flex-row">
      <div className="hidden md:block text-neon-light h-full w-1/5 pl-8 top-80 sticky">
        {navbarItems.map((elem) => (
          <LinkScroll duration={500} smooth to={elem.target} offset={-135}>
            <div
              className={classnames(
                'flex items-center cursor-pointer',
                inFocus === elem.id ? 'opacity-100' : 'opacity-50'
              )}
            >
              <h3 className="font-bj text-neon-light text-6xl text-center w-20 p-4">
                {elem.id}
              </h3>
              <div className="w-28">
                <span className="font-bj font-bold text-xs text-neon-light uppercase cursor-pointer">
                  {elem.section}
                </span>
              </div>
            </div>
          </LinkScroll>
        ))}
      </div>
      <div className="container mx-auto md:w-3/5" id="container">
        <AnalysisContainer onVisible={() => setInFocus(1)}>
          <h3
            className="font-bj text-2xl text-neon-light p-6"
            id="tokenFreezeThaw"
          >
            Token Freeze & Token Thaw
          </h3>
          <TokenFreezeThawChart price={chart.price} week={chart.week} />
          <div className="mt-12">
            <TokenFreezeThawTable table={table} />
          </div>
        </AnalysisContainer>
        <AnalysisContainer onVisible={() => setInFocus(2)}>
          <h3 className="font-bj text-2xl text-neon-light p-6" id="ABC">
            Augmented Bonding Curve
          </h3>
          <ABCChart
            balanceInThousands={balanceInThousands}
            price={price}
            stepLinSpaces={stepLinSpaces ? stepLinSpaces[0] : {}}
            singleDataPoints={singlePoints}
          />
          <div className="mt-12" onClick={() => setInFocus(3)}>
            <ABCTable
              table={{ ...ABCTableData }}
              showStepZero={Number(params.reserveBalance) !== launchValue}
            />
          </div>
          <div>table b</div>
        </AnalysisContainer>
        <AnalysisContainer onVisible={() => setInFocus(3)}>
          <h3 className="font-bj text-2xl text-neon-light p-6" id="taoVoting">
            Tao Voting
          </h3>
          <TaoVotingBar
            nonQuietVotingPeriod={
              taoChartData.totalProposalProcess?.nonQuietVotingPeriod
            }
            delegatedVotingPeriod={
              taoChartData.delegatedVoting?.delegatedVotingPeriod
            }
            delegatedAndNonDelegatedVoting={
              taoChartData.proposalProcessWithExtension?.voteDuration
            }
            quietEndingPeriod={
              taoChartData.totalProposalProcess?.quietEndingPeriod
            }
            quietEndingExtension={
              taoChartData.proposalProcessWithExtension?.quietEndingExtension
            }
            executionDelay={
              taoChartData.proposalProcessWithExtension?.executionDelay
            }
          />
          <div className="mt-12">
            <TaoVotingTable table={taoTableData} />
          </div>
        </AnalysisContainer>
        <AnalysisContainer onVisible={() => setInFocus(4)}>
          <h3
            className="font-bj text-2xl text-neon-light p-6"
            id="convictionVoting"
          >
            Conviction Voting
          </h3>
          <ConvictionThresholdChart
            requestedPercentage={convictionThresholdChart.requestedPercentage}
            thresholdPercentage={convictionThresholdChart.thresholdPercentage}
          />
          <div className="mt-12">
            <ConvictionVotingTable table={ConvictionVotingTableData} />
          </div>
        </AnalysisContainer>
      </div>
    </div>
  );
}

export default SubmitAnalysis;
