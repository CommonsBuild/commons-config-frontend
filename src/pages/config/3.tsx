import Head from 'next/head';
import Input from '@/components/Input';
import { Card, ChartContainer } from '@/components/_global';

import { RedirectButton } from '@/components/btns';
import { TaoVotingBar } from '@/components/charts';
import { useParams, useTaoVoting } from '@/hooks';
import { TaoVotingTable } from '@/components/tables';

function DisputableVoting() {
  const { barChart, table } = useTaoVoting();
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

  const inputs = [
    {
      name: 'supportRequired',
      value: supportRequired,
      param: 'Support Required',
      link: 'https://forum.tecommons.org/t/tao-voting-support-required/486',
      placeholder: '%',
      tooltipText:
        'The percent of YES votes relative to NO votes needed to pass this proposal.',
      interval: { min: 50, max: 100 },
    },
    {
      name: 'minimumQuorum',
      value: minimumQuorum,
      param: 'Minimum Quorum',
      link: 'https://forum.tecommons.org/t/tao-voting-minimum-quorum/485',
      placeholder: '%',
      tooltipText:
        'The percent of all tokens that must vote YES on a proposal in order for it to be valid.',
    },
    {
      name: 'voteDuration',
      value: voteDuration,
      param: 'Vote Duration',
      link: 'https://forum.tecommons.org/t/tao-voting-vote-duration/484',
      placeholder: 'days',
      tooltipText: 'The amount of time a proposal is eligible to be voted on.',
    },
    {
      name: 'delegatedVotingPeriod',
      value: delegatedVotingPeriod,
      param: 'Delegated Voting Period',
      link: 'https://forum.tecommons.org/t/tao-voting-delegated-voting-period/487',
      placeholder: 'days',
      tooltipText:
        'The amount of time within the Vote Duration that delegates are permitted to vote on a proposal.',
    },
    {
      name: 'quietEndingPeriod',
      value: quietEndingPeriod,
      param: 'Quiet Ending Period',
      link: 'https://forum.tecommons.org/t/tao-voting-quiet-ending-period-and-quiet-ending-extension/488',
      placeholder: 'days',
      tooltipText:
        'If the voting outcome changes during this time the Quiet Ending Extension will trigger, extending the Vote Duration.',
    },
    {
      name: 'quietEndingExtension',
      value: quietEndingExtension,
      param: 'Quiet Ending Extension',
      link: 'https://forum.tecommons.org/t/tao-voting-quiet-ending-period-and-quiet-ending-extension/488',
      placeholder: 'days',
      tooltipText:
        'The amount of time added to the Vote Duration resulting from the vote outcome changing during the Quiet Ending.',
    },
    {
      name: 'executionDelay',
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
            <TaoVotingTable table={table} />
          </ChartContainer>
        </div>
      </div>
    </>
  );
}

export default DisputableVoting;
