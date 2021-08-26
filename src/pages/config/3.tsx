import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Card from '@/components/Card';
import ChartLegend from '@/components/ChartLegend';
import HorizontalBarChart from '@/components/HorizontalBarChart';
import Input from '@/components/Input';
import { ConfigNavbar as Navbar } from '@/components/Navbar';
import Dialog from '@/components/Dialog';
import PieChart from '@/components/PieChart';

interface DisputableVotingParams {
  'support-required': string;
  'minimum-quorum': string;
  'vote-duration': string;
  'delegated-voting-period': string;
  'quiet-ending-period': string;
  'quiet-ending-extension': string;
  'execution-delay': string;
}

interface PieChartParams {
  'execution-delay': number;
  'non-quiet-voting-period': number;
  'quiet-ending-extension': number;
  'quiet-ending-period': number;
}

interface BarChartParams {
  'non-quiet-voting-period': number;
  'delegated-voting-period': number;
  'delegated-and-non-delegated-voting': number;
  'quiet-ending-period': number;
  'quiet-ending-extension': number;
  'execution-delay': number;
}

function DisputableVoting() {
  const [paramsValue, setParamsValue] = useState<DisputableVotingParams>({
    'support-required': '',
    'minimum-quorum': '',
    'vote-duration': '',
    'delegated-voting-period': '',
    'quiet-ending-period': '',
    'quiet-ending-extension': '',
    'execution-delay': '',
  });

  const [barChartData, setBarChartData] = useState<BarChartParams>({
    'non-quiet-voting-period': 0,
    'delegated-voting-period': 0,
    'delegated-and-non-delegated-voting': 0,
    'quiet-ending-period': 0,
    'quiet-ending-extension': 0,
    'execution-delay': 0,
  });

  const [pieChartData, setPieChartData] = useState<PieChartParams>({
    'execution-delay': 0,
    'non-quiet-voting-period': 0,
    'quiet-ending-extension': 0,
    'quiet-ending-period': 0,
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

  const handleNumeriChange = (event) => {
    const { name } = event.target;
    let { value } = event.target;

    if (Number(value) > 100) {
      value = 100;
    }

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
      name: 'support-required',
      value: paramsValue['support-required'],
      param: 'Support Required',
      placehoder: '%',
      tooltipText:
        'The percent of votes that must be in favour of this proposal.',
      numeric: true,
    },
    {
      name: 'minimum-quorum',
      value: paramsValue['minimum-quorum'],
      param: 'Minimum Quorum',
      placehoder: '%',
      tooltipText:
        'The percent of all tokens that must vote on a proposal in order for it to be valid.',
      numeric: true,
    },
    {
      name: 'vote-duration',
      value: paramsValue['vote-duration'],
      param: 'Vote Duration',
      placehoder: 'days',
      tooltipText: 'The amount of time a proposal is eligible to be voted on.',
      numeric: false,
    },
    {
      name: 'delegated-voting-period',
      value: paramsValue['delegated-voting-period'],
      param: 'Delegated Voting Period',
      placehoder: 'days',
      tooltipText:
        'The amount of time delegates are permitted to vote on a proposal.',
      numeric: false,
    },
    {
      name: 'quiet-ending-period',
      value: paramsValue['quiet-ending-period'],
      param: 'Quiet Ending Period',
      placehoder: 'days',
      tooltipText:
        'If the voting outcome changes during this time the Quiet Ending Extension will trigger, extending the Vote Duration.',
      numeric: false,
    },
    {
      name: 'quiet-ending-extension',
      value: paramsValue['quiet-ending-extension'],
      param: 'Quiet Ending Extension',
      placehoder: 'days',
      tooltipText:
        'The amount of time added to the Vote Duration resulting from the vote outcome changing during the Quiet Ending.',
      numeric: false,
    },
    {
      name: 'execution-delay',
      value: paramsValue['execution-delay'],
      param: 'Execution Delay',
      placehoder: 'days',
      tooltipText:
        'The amount of time after a vote passes before the proposed action is executed',
      numeric: false,
    },
  ];

  useEffect(() => {
    const values = Object.values(paramsValue);
    const validParams = values.every((elem) => elem !== '');
    if (validParams) {
      axios
        .post('https://test-token-lockup.herokuapp.com/disputable-voting/', {
          ...paramsValue,
          'support-required': Number(paramsValue['support-required']) / 100,
          'minimum-quorum': Number(paramsValue['minimum-quorum']) / 100,
        })
        .then((response) => {
          const { output } = response.data;
          const barChart = output['bar-chart'];
          const pieChart = output['pie-chart'];

          setBarChartData({
            'non-quiet-voting-period':
              barChart['total-proposal-process']['non-quiet-voting-period'],
            'delegated-voting-period':
              barChart['delegated-voting']['delegated-voting-period'],
            'delegated-and-non-delegated-voting': barChart['vote-duration'],
            'quiet-ending-period':
              barChart['total-proposal-process']['quiet-ending-period'],
            'quiet-ending-extension':
              barChart['proposal-process-with-extension'][
                'quiet-ending_extension'
              ],
            'execution-delay':
              barChart['proposal-process-with-extension']['execution-delay'],
          });
          setPieChartData(pieChart);
        });
    }
  }, [paramsValue]);

  return (
    <div className="lg:min-h-screen bg-dash bg-cover">
      <Dialog title="Disputable Voting" isOpen={isOpen}>
        <div style={{ maxWidth: '350px' }} className="py-8 m-auto">
          <PieChart
            nonQuietVotingPeriod={pieChartData['non-quiet-voting-period']}
            quietEndingPeriod={pieChartData['quiet-ending-period']}
            quietEndingExtension={pieChartData['quiet-ending-extension']}
            executionDelay={pieChartData['execution-delay']}
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
                input.numeric ? handleNumeriChange(event) : handleChange(event)
              }
              placeholder={input.placehoder}
              tooltipText={input.tooltipText}
            />
          ))}
        </Card>
        <div className="flex flex-col w-10/12 mx-auto mt-4 shadow-2xl lg:w-7/12">
          <h1 className="font-bj text-gray-100 text-2xl text-center px-9 pt-6 pb-3 lg:text-left">
            What percent of yes votes are needed to pass a proposal?
          </h1>
          <div
            className="ml-auto px-9 cursor-pointer"
            onClick={() => handleDialog()}
          >
            <Image src="/pie_icon.svg" width="24" height="24" />
          </div>
          <HorizontalBarChart
            nonQuietVotingPeriod={barChartData['non-quiet-voting-period']}
            delegatedVotingPeriod={barChartData['delegated-voting-period']}
            delegatedAndNonDelegatedVoting={
              barChartData['delegated-and-non-delegated-voting']
            }
            quietEndingPeriod={barChartData['quiet-ending-period']}
            quietEndingExtension={barChartData['quiet-ending-extension']}
            executionDelay={barChartData['execution-delay']}
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
        </div>
      </div>
    </div>
  );
}

export default DisputableVoting;
