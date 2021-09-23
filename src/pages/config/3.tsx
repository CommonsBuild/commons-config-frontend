import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import axios from 'axios';
import ChartContainer from '@/components/ChartContainer';
import Card from '@/components/Card';
import ChartLegend from '@/components/ChartLegend';
import HorizontalBarChart from '@/components/HorizontalBarChart';
import Input from '@/components/Input';
import { ConfigNavbar as Navbar } from '@/components/Navbar';
import Dialog from '@/components/Dialog';
import PieChart from '@/components/PieChart';

type ParamsOptionsType =
  | 'SUPPORT_REQUIRED'
  | 'MINIMUM_QUORUM'
  | 'VOTE_DURATION'
  | 'DELEGATED_VOTING_PERIOD'
  | 'QUIET_ENDING_PERIOD'
  | 'QUIET_ENDING_EXTENSION'
  | 'EXECUTION_DELAY';

interface DisputableVotingParams {
  supportRequired: number;
  minimumQuorum: number;
  voteDuration: string;
  delegatedVotingPeriod: string;
  quietEndingPeriod: string;
  quietEndingExtension: string;
  executionDelay: string;
}

interface BarChartParams {
  nonQuietVotingPeriod: number;
  voteDuration: number;
  delegatedVotingPeriod: number;
  quietEndingPeriod: number;
  quietEndingExtension: number;
  executionDelay: number;
}

interface PieChartParams {
  nonQuietVotingPeriod: number;
  quietEndingPeriod: number;
  quietEndingExtension: number;
  executionDelay: number;
}

const paramsContent = {
  SUPPORT_REQUIRED: {
    question: 'What percent of yes votes are needed to pass a proposal?',
    description:
      'The percent of votes that must be in favour of this proposal.',
  },
  MINIMUM_QUORUM: {
    question:
      'What percent of all tokens are needed to vote on a proposal in order for it to be valid?',
    description:
      'The percent of all tokens that must vote on a proposal in order for it to be valid.',
  },
  VOTE_DURATION: {
    question: 'How many days should voting on a proposal last?',
    description: 'The amount of time a proposal is eligible to be voted on.',
  },
  DELEGATED_VOTING_PERIOD: {
    question:
      'How many days should delegates be allowed to vote within the Vote Duration?',
    description:
      'The amount of time delegates are permitted to vote on a proposal.',
  },
  QUIET_ENDING_PERIOD: {
    question:
      'For how many days at the latter end of the Vote Duration should a flipped voting outcome cause an extension?',
    description:
      'If the voting outcome changes during this time the Quiet Ending Extension will trigger, extending the Vote Duration.',
  },
  QUIET_ENDING_EXTENSION: {
    question:
      'How many days should be added to a Vote Duration from a vote changing outcome during the Quiet Ending Period?',
    description:
      'The amount of time added to the Vote Duration resulting from the vote outcome changing during the Quiet Ending.',
  },
  EXECUTION_DELAY: {
    question:
      'How much time should pass from when the vote closes until the outcome is executed?',
    description:
      'The amount of time added to the Vote Duration resulting from the vote outcome changing during the Quiet Ending.',
  },
};

function DisputableVoting() {
  const [paramsValue, setParamsValue] = useState<DisputableVotingParams>({
    supportRequired: 10,
    minimumQuorum: 20,
    voteDuration: '20',
    delegatedVotingPeriod: '5',
    quietEndingPeriod: '5',
    quietEndingExtension: '10',
    executionDelay: '7',
  });

  const [barChartData, setBarChartData] = useState<BarChartParams>({
    nonQuietVotingPeriod: 0,
    voteDuration: 0,
    delegatedVotingPeriod: 0,
    quietEndingPeriod: 0,
    quietEndingExtension: 0,
    executionDelay: 0,
  });

  const [pieChartData, setPieChartData] = useState<PieChartParams>({
    nonQuietVotingPeriod: 0,
    quietEndingPeriod: 0,
    quietEndingExtension: 0,
    executionDelay: 0,
  });

  const [paramSelected, setParamSelected] =
    useState<ParamsOptionsType>('SUPPORT_REQUIRED');

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const { value } = event.target;

    setParamsValue({
      ...paramsValue,
      [name]: value,
    });
  };

  const handleDialog = () => {
    setIsOpen(!isOpen);
  };

  const barChartLegend = [
    { name: 'non-quiet voting period', bgColor: 'yellow' },
    { name: 'delegated voting period', bgColor: 'purple' },
    { name: 'delegated and non-delegated voting', bgColor: 'dark-blue' },
    { name: 'quiet ending period', bgColor: 'orange' },
    { name: 'quiet ending extension', bgColor: 'blue' },
    { name: 'execution delay', bgColor: 'turquoise' },
  ];

  const pieChartLegend = [
    { name: 'non-quiet voting period', bgColor: 'yellow' },
    { name: 'quiet ending period', bgColor: 'orange' },
    { name: 'quiet ending extension', bgColor: 'blue' },
    { name: 'execution delay', bgColor: 'turquoise' },
  ];

  const inputs = [
    {
      name: 'supportRequired',
      paramName: 'SUPPORT_REQUIRED',
      value: paramsValue.supportRequired,
      param: 'Support Required',
      placeholder: '%',
      tooltipText:
        'The percent of votes that must be in favour of this proposal.',
    },
    {
      name: 'minimumQuorum',
      paramName: 'MINIMUM_QUORUM',
      value: paramsValue.minimumQuorum,
      param: 'Minimum Quorum',
      placeholder: '%',
      tooltipText:
        'The percent of all tokens that must vote on a proposal in order for it to be valid.',
    },
    {
      name: 'voteDuration',
      paramName: 'VOTE_DURATION',
      value: paramsValue.voteDuration,
      param: 'Vote Duration',
      placeholder: 'days',
      tooltipText: 'The amount of time a proposal is eligible to be voted on.',
    },
    {
      name: 'delegatedVotingPeriod',
      paramName: 'DELEGATED_VOTING_PERIOD',
      value: paramsValue.delegatedVotingPeriod,
      param: 'Delegated Voting Period',
      placeholder: 'days',
      tooltipText:
        'The amount of time delegates are permitted to vote on a proposal.',
    },
    {
      name: 'quietEndingPeriod',
      paramName: 'QUIET_ENDING_PERIOD',
      value: paramsValue.quietEndingPeriod,
      param: 'Quiet Ending Period',
      placeholder: 'days',
      tooltipText:
        'If the voting outcome changes during this time the Quiet Ending Extension will trigger, extending the Vote Duration.',
    },
    {
      name: 'quietEndingExtension',
      paramName: 'QUIET_ENDING_EXTENSION',
      value: paramsValue.quietEndingExtension,
      param: 'Quiet Ending Extension',
      placeholder: 'days',
      tooltipText:
        'The amount of time added to the Vote Duration resulting from the vote outcome changing during the Quiet Ending.',
    },
    {
      name: 'executionDelay',
      paramName: 'EXECUTION_DELAY',
      value: paramsValue.executionDelay,
      param: 'Execution Delay',
      placeholder: 'days',
      tooltipText:
        'The amount of time after a vote passes before the proposed action is executed',
    },
  ];

  useEffect(() => {
    const values = Object.values(paramsValue);
    const validParams = values.every((elem) => elem !== '');
    if (validParams) {
      axios
        .post(
          'https://dev-commons-config-backend.herokuapp.com/disputable-voting/',
          {
            ...paramsValue,
            supportRequired: paramsValue.supportRequired / 100,
            minimumQuorum: paramsValue.minimumQuorum / 100,
          }
        )
        .then((response) => {
          const { output } = response.data;
          const { barChart } = output;
          const { pieChart } = output;

          setBarChartData({
            nonQuietVotingPeriod:
              barChart.totalProposalProcess.nonQuietVotingPeriod,
            voteDuration: barChart.voteDuration,
            delegatedVotingPeriod:
              barChart.delegatedVoting.delegatedVotingPeriod,
            quietEndingPeriod: barChart.totalProposalProcess.quietEndingPeriod,
            quietEndingExtension:
              barChart.proposalProcessWithExtension.quietEndingExtension,
            executionDelay:
              barChart.proposalProcessWithExtension.executionDelay,
          });
          setPieChartData(pieChart);
        });
    }
  }, [paramsValue]);

  return (
    <>
      <Head>
        <title>Config 3 | Commons Dashboard</title>
      </Head>
      <div className="lg:min-h-screen bg-dash bg-cover">
        <Dialog title="Disputable Voting" isOpen={isOpen}>
          <div style={{ maxWidth: '350px' }} className="py-8 m-auto">
            <PieChart
              nonQuietVotingPeriod={pieChartData.nonQuietVotingPeriod}
              quietEndingPeriod={pieChartData.quietEndingPeriod}
              quietEndingExtension={pieChartData.quietEndingExtension}
              executionDelay={pieChartData.executionDelay}
            />
          </div>
          <div className="grid grid-cols-2">
            {pieChartLegend.map((legend) => (
              <ChartLegend name={legend.name} bgColor={legend.bgColor} />
            ))}
          </div>
          <button
            className="flex m-auto uppercase font-bj font-bold text-neon text-xs pt-6"
            onClick={() => handleDialog()}
          >
            close
          </button>
        </Dialog>
        <Navbar />
        <div className="flex justify-center">
          <Card
            title="disputable voting"
            previousPanel="Back"
            previousHref="/config/2"
            nextPanel="Requesting Funds"
            nextHref="/config/4"
          >
            {inputs.map((input) => (
              <Input
                key={input.name}
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
          </Card>
          <ChartContainer
            title={paramsContent[paramSelected].question}
            subtitle={paramsContent[paramSelected].description}
          >
            <div
              className="relative h-0 left-3/4 cursor-pointer"
              onClick={() => handleDialog()}
            >
              <Image src="/pie_icon.svg" width="24" height="24" />
            </div>
            <HorizontalBarChart
              nonQuietVotingPeriod={barChartData.nonQuietVotingPeriod}
              delegatedVotingPeriod={barChartData.delegatedVotingPeriod}
              delegatedAndNonDelegatedVoting={barChartData.voteDuration}
              quietEndingPeriod={barChartData.quietEndingPeriod}
              quietEndingExtension={barChartData.quietEndingExtension}
              executionDelay={barChartData.executionDelay}
            />
            <div className="grid grid-rows-3 grid-flow-col text-gray">
              {barChartLegend.map((legend) => (
                <ChartLegend
                  name={legend.name}
                  bgColor={legend.bgColor}
                  colAlign
                />
              ))}
            </div>
          </ChartContainer>
        </div>
      </div>
    </>
  );
}

export default DisputableVoting;
