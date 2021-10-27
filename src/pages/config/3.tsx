import Head from 'next/head';
import Input from '@/components/Input';
import {
  Card,
  ChartContainer,
  ConfigNavbar as Navbar,
} from '@/components/_global';

import { RedirectButton } from '@/components/btns';
import { TaoVotingBar } from '@/components/charts';
import { useParams, useTaoVoting } from '@/hooks';
// import { TaoVotingTable } from '@/components/tables';
import ChartLegend from '@/components/ChartLegend';

function DisputableVoting() {
  const { barChart } = useTaoVoting();
  const {
    supportRequired,
    minimumQuorum,
    voteDuration,
    delegatedVotingPeriod,
    quietEndingPeriod,
    quietEndingExtension,
    executionDelay,
    submitProposal,
    handleChange,
  } = useParams();

  const barChartLegend = [
    {
      name: 'non-quiet voting period',
      bgColor: 'yellow',
      tooltipText:
        'The initial portion of the Vote Duration that will NOT trigger the Quiet Ending Extension',
    },
    {
      name: 'delegated voting period',
      bgColor: 'purple',
      tooltipText:
        'The amount of time delegates are permitted to vote on a proposal.',
    },
    {
      name: 'normal vote duration',
      bgColor: 'dark-blue',
      tooltipText: 'The amount of time a proposal is eligible to be voted on.',
    },
    {
      name: 'quiet ending period',
      bgColor: 'orange',
      tooltipText:
        'If the voting outcome changes during this time the Quiet Ending Extension will trigger, extending the Vote Duration.',
    },
    {
      name: 'quiet ending extension',
      bgColor: 'blue',
      tooltipText:
        'The amount of time added to the Vote Duration resulting from the vote outcome changing during the Quiet Ending.',
    },
    {
      name: 'execution delay',
      bgColor: 'turquoise',
      tooltipText:
        'The amount of time after a vote passes before the proposed action is executed',
    },
  ];

  const inputs = [
    {
      name: 'supportRequired',
      paramName: 'SUPPORT_REQUIRED',
      value: supportRequired,
      param: 'Support Required',
      link: 'https://forum.tecommons.org/t/tao-voting-support-required/486',
      placeholder: '%',
      tooltipText:
        'The percent of votes that must be in favour of this proposal.',
      interval: { min: 50, max: 100 },
    },
    {
      name: 'minimumQuorum',
      paramName: 'MINIMUM_QUORUM',
      value: minimumQuorum,
      param: 'Minimum Quorum',
      link: 'https://forum.tecommons.org/t/tao-voting-minimum-quorum/485',
      placeholder: '%',
      tooltipText:
        'The percent of all tokens that must vote on a proposal in order for it to be valid.',
    },
    {
      name: 'voteDuration',
      paramName: 'VOTE_DURATION',
      value: voteDuration,
      param: 'Vote Duration',
      link: 'https://forum.tecommons.org/t/tao-voting-vote-duration/484',
      placeholder: 'days',
      tooltipText: 'The amount of time a proposal is eligible to be voted on.',
    },
    {
      name: 'delegatedVotingPeriod',
      paramName: 'DELEGATED_VOTING_PERIOD',
      value: delegatedVotingPeriod,
      param: 'Delegated Voting Period',
      link: 'https://forum.tecommons.org/t/tao-voting-delegated-voting-period/487',
      placeholder: 'days',
      tooltipText:
        'The amount of time delegates are permitted to vote on a proposal.',
    },
    {
      name: 'quietEndingPeriod',
      paramName: 'QUIET_ENDING_PERIOD',
      value: quietEndingPeriod,
      param: 'Quiet Ending Period',
      link: 'https://forum.tecommons.org/t/tao-voting-quiet-ending-period-and-quiet-ending-extension/488',
      placeholder: 'days',
      tooltipText:
        'If the voting outcome changes during this time the Quiet Ending Extension will trigger, extending the Vote Duration.',
    },
    {
      name: 'quietEndingExtension',
      paramName: 'QUIET_ENDING_EXTENSION',
      value: quietEndingExtension,
      param: 'Quiet Ending Extension',
      link: 'https://forum.tecommons.org/t/tao-voting-quiet-ending-period-and-quiet-ending-extension/488',
      placeholder: 'days',
      tooltipText:
        'The amount of time added to the Vote Duration resulting from the vote outcome changing during the Quiet Ending.',
    },
    {
      name: 'executionDelay',
      paramName: 'EXECUTION_DELAY',
      value: executionDelay,
      param: 'Execution Delay',
      link: 'https://forum.tecommons.org/t/tao-voting-execution-delay/489',
      placeholder: 'days',
      tooltipText:
        'The amount of time after a vote passes before the proposed action is executed',
    },
  ];

  return (
    <>
      <Head>
        <title>Config 3 | Commons Dashboard</title>
      </Head>
      <div className="min-h-screen h-full bg-dash bg-cover">
        <Navbar />
        <div className="flex justify-center">
          <Card
            title="tao voting"
            previousPanel="Back"
            previousHref="/config/2"
            nextPanel="Requesting Funds"
            nextHref="/config/4"
            submitProposal={!submitProposal}
          >
            {inputs.map((input) => (
              <Input
                key={input.name}
                min={input.interval?.min}
                max={input.interval?.max}
                name={input.name}
                value={input.value}
                param={input.param}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(event)
                }
                placeholder={input.placeholder}
                tooltipText={input.tooltipText}
                link={input.link}
              />
            ))}
            <RedirectButton href="/learn/3" />
          </Card>
          <ChartContainer title="See the relative distribution of each phase of Tao Voting, based on your parameters, in the graph below.">
            <TaoVotingBar
              nonQuietVotingPeriod={
                barChart.totalProposalProcess?.nonQuietVotingPeriod
              }
              delegatedVotingPeriod={
                barChart.delegatedVoting?.delegatedVotingPeriod
              }
              delegatedAndNonDelegatedVoting={
                barChart.proposalProcessWithExtension?.voteDuration
              }
              quietEndingPeriod={
                barChart.totalProposalProcess?.quietEndingPeriod
              }
              quietEndingExtension={
                barChart.proposalProcessWithExtension?.quietEndingExtension
              }
              executionDelay={
                barChart.proposalProcessWithExtension?.executionDelay
              }
            />
            <div className="grid grid-rows-3 grid-flow-col text-gray pl-14">
              {barChartLegend.map((legend, index) => (
                <ChartLegend
                  key={index}
                  name={legend.name}
                  bgColor={legend.bgColor}
                  colAlign
                  tooltipText={legend.tooltipText}
                />
              ))}
            </div>
            {/* <TaoVotingTable /> */}
          </ChartContainer>
        </div>
      </div>
    </>
  );
}

export default DisputableVoting;
