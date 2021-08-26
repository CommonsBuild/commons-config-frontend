import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';

import Card from '@/components/Card';
import ChartLegend from '@/components/ChartLegend';
import HorizontalBarChart from '@/components/HorizontalBarChart';
import Input from '@/components/Input';
import { ConfigNavbar as Navbar } from '@/components/Navbar';
import Dialog from '@/components/Dialog';
import PieChart from '@/components/PieChart';

interface DisputableVotingParams {
  supportRequired: string;
  minimumQuorum: string;
  voteDuration: string;
  delegatedVotingPeriod: string;
  quietEndingPeriod: string;
  quietEndingExtension: string;
  executionDelay: string;
}

function DisputableVoting() {
  const [paramsValue, setParamsValue] = useState<DisputableVotingParams>({
    supportRequired: '',
    minimumQuorum: '',
    voteDuration: '',
    delegatedVotingPeriod: '',
    quietEndingPeriod: '',
    quietEndingExtension: '',
    executionDelay: '',
  });
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
    { name: 'delegated and non-delegated voting', bgColor: 'dark-blue' },
    { name: 'delegated voting period', bgColor: 'purple' },
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
      value: paramsValue.supportRequired,
      param: 'Support Required',
      placehoder: '%',
      tooltipText:
        'The percent of votes that must be in favour of this proposal.',
    },
    {
      name: 'minimumQuorum',
      value: paramsValue.minimumQuorum,
      param: 'Minimum Quorum',
      placehoder: '%',
      tooltipText:
        'The percent of all tokens that must vote on a proposal in order for it to be valid.',
    },
    {
      name: 'voteDuration',
      value: paramsValue.voteDuration,
      param: 'Vote Duration',
      placehoder: 'days',
      tooltipText: 'The amount of time a proposal is eligible to be voted on.',
    },
    {
      name: 'delegatedVotingPeriod',
      value: paramsValue.delegatedVotingPeriod,
      param: 'Delegated Voting Period',
      placehoder: 'days',
      tooltipText:
        'The amount of time delegates are permitted to vote on a proposal.',
    },
    {
      name: 'quietEndingPeriod',
      value: paramsValue.quietEndingPeriod,
      param: 'Quiet Ending Period',
      placehoder: 'days',
      tooltipText:
        'If the voting outcome changes during this time the Quiet Ending Extension will trigger, extending the Vote Duration.',
    },
    {
      name: 'quietEndingExtension',
      value: paramsValue.quietEndingExtension,
      param: 'Quiet Ending Extension',
      placehoder: 'days',
      tooltipText:
        'The amount of time added to the Vote Duration resulting from the vote outcome changing during the Quiet Ending.',
    },
    {
      name: 'executionDelay',
      value: paramsValue.executionDelay,
      param: 'Execution Delay',
      placehoder: 'days',
      tooltipText:
        'The amount of time after a vote passes before the proposed action is executed',
    },
  ];

  return (
    <>
      <Head>
        <title>Intro 1 | Commons Dashboard</title>
      </Head>
      <div className="lg:min-h-screen bg-dash bg-cover">
        <Dialog title="Disputable Voting" isOpen={isOpen}>
          <div style={{ maxWidth: '350px' }} className="py-8 m-auto">
            <PieChart />
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
        <div className="lg:flex">
          <Card
            title="disputable voting"
            nextPanel="Requesting Funds"
            previousPanel="Back"
          >
            {inputs.map((input) => (
              <Input
                key={input.name}
                name={input.name}
                value={input.value}
                param={input.param}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(event)
                }
                placeholder={input.placehoder}
                tooltipText={input.tooltipText}
              />
            ))}
          </Card>
          <div className="flex flex-col w-10/12 mx-auto mt-4 lg:w-7/12">
            <h1 className="font-bj text-gray-100 text-2xl text-center px-9 pt-6 pb-3 lg:text-left">
              What percent of yes votes are needed to pass a proposal?
            </h1>
            <div
              className="ml-auto px-9 cursor-pointer"
              onClick={() => handleDialog()}
            >
              <Image src="/pie_icon.svg" width="24" height="24" />
            </div>
            <HorizontalBarChart />
            <div className="grid grid-rows-3 grid-flow-col text-gray">
              {barChartLegend.map((legend) => (
                <ChartLegend
                  name={legend.name}
                  bgColor={legend.bgColor}
                  colAlign
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DisputableVoting;
