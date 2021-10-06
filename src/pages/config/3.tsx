import { useEffect, useState } from 'react';
import Image from 'next/image';
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
import { TaoVotingPieDialog } from '@/components/modals';

type ParamsOptionsType =
  | 'SUPPORT_REQUIRED'
  | 'MINIMUM_QUORUM'
  | 'VOTE_DURATION'
  | 'DELEGATED_VOTING_PERIOD'
  | 'QUIET_ENDING_PERIOD'
  | 'QUIET_ENDING_EXTENSION'
  | 'EXECUTION_DELAY';

function DisputableVoting() {
  const { barChart, pieChart } = useTaoVoting();
  const {
    supportRequired,
    minimumQuorum,
    voteDuration,
    delegatedVotingPeriod,
    quietEndingPeriod,
    quietEndingExtension,
    executionDelay,
    submitProposal,
    setParams,
    handleChange,
  } = useParams();

  const [, setParamSelected] = useState<ParamsOptionsType>('SUPPORT_REQUIRED');

  const [isOpen, setIsOpen] = useState(false);

  const handleDialog = () => {
    setIsOpen(!isOpen);
  };

  const inputs = [
    {
      name: 'supportRequired',
      paramName: 'SUPPORT_REQUIRED',
      value: supportRequired,
      param: 'Support Required',
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
      placeholder: '%',
      tooltipText:
        'The percent of all tokens that must vote on a proposal in order for it to be valid.',
    },
    {
      name: 'voteDuration',
      paramName: 'VOTE_DURATION',
      value: voteDuration,
      param: 'Vote Duration',
      placeholder: 'days',
      tooltipText: 'The amount of time a proposal is eligible to be voted on.',
    },
    {
      name: 'delegatedVotingPeriod',
      paramName: 'DELEGATED_VOTING_PERIOD',
      value: delegatedVotingPeriod,
      param: 'Delegated Voting Period',
      placeholder: 'days',
      tooltipText:
        'The amount of time delegates are permitted to vote on a proposal.',
    },
    {
      name: 'quietEndingPeriod',
      paramName: 'QUIET_ENDING_PERIOD',
      value: quietEndingPeriod,
      param: 'Quiet Ending Period',
      placeholder: 'days',
      tooltipText:
        'If the voting outcome changes during this time the Quiet Ending Extension will trigger, extending the Vote Duration.',
    },
    {
      name: 'quietEndingExtension',
      paramName: 'QUIET_ENDING_EXTENSION',
      value: quietEndingExtension,
      param: 'Quiet Ending Extension',
      placeholder: 'days',
      tooltipText:
        'The amount of time added to the Vote Duration resulting from the vote outcome changing during the Quiet Ending.',
    },
    {
      name: 'executionDelay',
      paramName: 'EXECUTION_DELAY',
      value: executionDelay,
      param: 'Execution Delay',
      placeholder: 'days',
      tooltipText:
        'The amount of time after a vote passes before the proposed action is executed',
    },
  ];

  useEffect(() => {
    if (
      [
        supportRequired,
        minimumQuorum,
        voteDuration,
        delegatedVotingPeriod,
        quietEndingPeriod,
        quietEndingExtension,
        executionDelay,
      ].every((elem) => elem === '')
    ) {
      setParams((previousParams) => ({
        ...previousParams,
        supportRequired: '50',
        minimumQuorum: '20',
        voteDuration: '20',
        delegatedVotingPeriod: '5',
        quietEndingPeriod: '5',
        quietEndingExtension: '10',
        executionDelay: '7',
      }));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Config 3 | Commons Dashboard</title>
      </Head>
      <div className="lg:min-h-screen bg-dash bg-cover">
        <Navbar />
        <TaoVotingPieDialog
          data={pieChart}
          isOpen={isOpen}
          handleClose={() => setIsOpen(false)}
        />
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
                inputMin={input.interval?.min}
                inputMax={input.interval?.max}
                name={input.name}
                value={input.value}
                param={input.param}
                changeParam={() =>
                  setParamSelected(input.paramName as ParamsOptionsType)
                }
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(event)
                }
                placeholder={input.placeholder}
                tooltipText={input.tooltipText}
              />
            ))}
            <RedirectButton href="/learn/3" />
          </Card>
          <ChartContainer title="See the relative distribution of each phase of Tao Voting, based on your parameters, in the graph below.">
            <div
              className="relative h-0 w-6 -right-3/4 cursor-pointer"
              onClick={() => handleDialog()}
            >
              <Image src="/pie_icon.svg" width="24" height="24" />
            </div>
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
          </ChartContainer>
        </div>
      </div>
    </>
  );
}

export default DisputableVoting;
