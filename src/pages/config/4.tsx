import { useEffect, useState } from 'react';
import Head from 'next/head';
import Input from '@/components/Input';
import {
  Card,
  ChartContainer,
  ConfigNavbar as Navbar,
} from '@/components/_global';
import { RadioButton, RedirectButton } from '@/components/btns';
import { ConvictionThresholdChart } from '@/components/charts';
import { useConvictionVoting, useParams } from '@/hooks';
import { ConvictionGrowthDialog } from '@/components/modals';
import { ConvictionVotingTable } from '@/components/tables';

type ParamsOptionsType =
  | 'SPENDING_LIMIT'
  | 'MINIMUM_CONVICTION'
  | 'CONVICTION_GROWTH';

const paramsContent = {
  SPENDING_LIMIT: {
    question:
      'How much of the Common Pool’s funds can be requested in a single proposal?',
    description:
      'The total amount of funds in the Common Pool that can be requested by a single proposal.',
  },
  MINIMUM_CONVICTION: {
    question: 'How quickly should staked TEC tokens accrue Conviction?',
    description: 'The amount of time it takes to increase Conviction by 50%.',
  },
  CONVICTION_GROWTH: {
    question:
      "What's the minimum percent of the Effective Supply needed to pass a proposal request?",
    description:
      'The minimum amount of tokens needed to pass a request for an infinitely small amount of funds, relative to the Effective Supply.',
  },
};

const radioButtons = [
  { id: 'radio5', label: '6 Months', value: '180' },
  { id: 'radio4', label: '3 Months', value: '60' },
  { id: 'radio3', label: '1 Month', value: '30' },
  { id: 'radio2', label: '2 Weeks', value: '14' },
  { id: 'radio1', label: '7 Days', value: '7' },
];

function ConvictionVoting() {
  const { convictionGrowthChart, convictionThresholdChart, dataPoints, table } =
    useConvictionVoting();
  const {
    spendingLimit,
    minimumConviction,
    convictionGrowth,
    convictionVotingPeriodDays,
    submitProposal,
    setParams,
    handleChange,
  } = useParams();
  const [paramSelected, setParamSelected] =
    useState<ParamsOptionsType>('SPENDING_LIMIT');
  const [dialogOpen, setDialogOpen] = useState(false);

  const inputs = [
    {
      name: 'spendingLimit',
      paramName: 'SPENDING_LIMIT',
      value: spendingLimit,
      param: 'Spending Limit',
      placeholder: '%',
      tooltipText:
        'The total amount of funds in the Common Pool that can be requested by a single proposal.',
    },
    {
      name: 'minimumConviction',
      paramName: 'MINIMUM_CONVICTION',
      value: minimumConviction,
      param: 'Minimum Conviction',
      placeholder: '%',
      tooltipText:
        'The minimum amount of tokens needed to pass a request for an infinitely small amount of funds, relative to the Effective Supply.',
    },
    {
      name: 'convictionGrowth',
      paramName: 'CONVICTION_GROWTH',
      value: convictionGrowth,
      param: 'Conviction Growth',
      placeholder: 'days',
      tooltipText: 'The amount of time it takes to increase Conviction by 50%.',
      children: (
        <span
          className="font-bj font-bold text-xs text-neon uppercase cursor-pointer"
          onClick={() => setDialogOpen(true)}
        >
          view graph
        </span>
      ),
    },
  ];

  useEffect(() => {
    if (
      [
        spendingLimit,
        minimumConviction,
        convictionGrowth,
        convictionVotingPeriodDays,
      ].every((elem) => elem === '')
    ) {
      setParams((previousParams) => ({
        ...previousParams,
        spendingLimit: '20',
        minimumConviction: '5',
        convictionGrowth: '2',
        convictionVotingPeriodDays: '7',
      }));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Config 4 | Commons Dashboard</title>
      </Head>
      <div className="lg:min-h-screen bg-dash bg-cover">
        <ConvictionGrowthDialog
          convictionGrowth={convictionGrowth}
          convictionPercentage={convictionGrowthChart.convictionPercentage}
          dataPoints={dataPoints}
          handleClose={() => setDialogOpen(false)}
          isOpen={dialogOpen}
          onChange={(event) => handleChange(event)}
          timeDays={convictionGrowthChart.timeDays}
        />
        <Navbar />
        <div className="flex justify-center">
          <Card
            title="conviction voting"
            previousPanel="Back"
            previousHref="/config/3"
            submitProposal={!submitProposal}
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
              >
                {input.children}
              </Input>
            ))}
            <RedirectButton href="/learn/4" />
          </Card>
          <ChartContainer
            title={paramsContent[paramSelected].question}
            subtitle={paramsContent[paramSelected].description}
          >
            <ConvictionThresholdChart
              requestedPercentage={convictionThresholdChart.requestedPercentage}
              thresholdPercentage={convictionThresholdChart.thresholdPercentage}
            />
            <div className="flex flex-row-reverse justify-between max-w-2xl mx-auto px-2 py-6 bg-cyan-700 opacity-60">
              {radioButtons.map((button) => (
                <RadioButton
                  checked={button.value === convictionVotingPeriodDays}
                  onChange={(event) => handleChange(event)}
                  id={button.id}
                  label={button.label}
                  name="convictionVotingPeriodDays"
                  value={button.value}
                />
              ))}
            </div>
            <ConvictionVotingTable table={table} />
          </ChartContainer>
        </div>
      </div>
    </>
  );
}

export default ConvictionVoting;
