import { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Card from '@/components/Card';
import ChartContainer from '@/components/ChartContainer';
import Dialog from '@/components/Dialog';
import Input from '@/components/Input';
import ConvictionGrowthChart from '@/components/ConvictionGrowthChart';
import ConvictionThresholdChart from '@/components/ConvictionThresholdChart';
import { ConfigNavbar as Navbar } from '@/components/Navbar';
import RadioButton from '@/components/RadioButton';
import RedirectButton from '@/components/RedirectButton';
import { useParams } from '@/hooks/useParams';

interface ConvictionGrowthDialogProps {
  convictionGrowth: string;
  convictionPercentage: number[];
  dataPoints: { [key: string]: number }[];
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  timeDays: number[];
}

function ConvictionGrowthDialog({
  convictionGrowth,
  convictionPercentage,
  dataPoints,
  handleClose,
  isOpen,
  onChange,
  timeDays,
}: ConvictionGrowthDialogProps) {
  return (
    <Dialog title="Conviction Growth" isOpen={isOpen}>
      <div className="py-8 m-auto w-11/12">
        <ConvictionGrowthChart
          convictionPercentage={convictionPercentage}
          timeDays={timeDays}
          dataPoints={dataPoints}
        />
      </div>
      <div className="h-12 border border-gray-500 w-2/3 mx-auto flex justify-center items-center">
        <span className="font-bj font-bold text-neon-light uppercase">
          conviction growth: {convictionGrowth}
        </span>
        <span className="font-inter font-medium text-gray-200 text-xs px-1 pt-1">
          days
        </span>
      </div>
      <div className="py-4 px-16">
        <input
          className="slider"
          name="convictionGrowth"
          type="range"
          min="1"
          max="60"
          value={convictionGrowth}
          onChange={onChange}
        />
      </div>
      <button
        className="flex m-auto uppercase font-bj font-bold text-neon text-xs py-6"
        onClick={handleClose}
      >
        close
      </button>
    </Dialog>
  );
}

interface ScenarioTableProps {
  table: { [key: string]: (number | string)[] };
}

function ScenarioTable({ table }: ScenarioTableProps) {
  const scenarioTableVariables = [
    'Amount in Common Pool (wxDai)',
    'Requested Amount (wxDAI)',
    'Min. tokens needed to pass',
    'Tokens needed to pass in 2 weeks',
    'Total effective supply',
  ];
  return (
    <div className="pl-16 pt-6 pb-2 font-bj text-neon-light text-xs">
      <div className="flex justify-between pb-2 mb-2 border-b border-gray-100 uppercase font-bold">
        <div className="w-2/6 max-w-144">variables</div>
        <div className="w-1/6 max-w-144">scenario 1</div>
        <div className="w-1/6 max-w-144">scenario 2</div>
        <div className="w-1/6 max-w-144">scenario 3</div>
        <div className="w-1/6 max-w-144">scenario 4</div>
        <div className="w-1/6 max-w-144">scenario 5</div>
        <div className="w-1/6 max-w-144">scenario 6</div>
      </div>
      {Object.keys(table).map((key, index) => (
        <div className="flex justify-between items-center mb-2 hover:bg-cyan-700 cursor-pointer">
          <div className="w-1/6 max-w-144 first:w-2/6">
            {scenarioTableVariables[index]}
          </div>
          {table[key].map((row) => (
            <span className="w-1/6 max-w-144">{row}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

type ParamsOptionsType =
  | 'SPENDING_LIMIT'
  | 'MINIMUM_CONVICTION'
  | 'CONVICTION_GROWTH';

interface ConvictionGrowthData {
  convictionPercentage: number[];
  timeDays: number[];
  dataPoints: { [key: string]: number }[];
  table: { [key: string]: (number | string)[] };
}

interface ConvictionThresholdData {
  requestedPercentage: number[];
  thresholdPercentage: number[];
}

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
  const [paramSelected, setParamSelected] =
    useState<ParamsOptionsType>('SPENDING_LIMIT');
  const {
    spendingLimit,
    minimumConviction,
    convictionGrowth,
    convictionVotingPeriodDays,
    submitProposal,
    setParams,
    handleChange,
  } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [growthChartData, setGrowthChartData] = useState<ConvictionGrowthData>({
    convictionPercentage: [],
    timeDays: [0],
    dataPoints: [],
    table: {},
  });
  const [thresholdChartData, setThresholdChartData] =
    useState<ConvictionThresholdData>({
      requestedPercentage: [0],
      thresholdPercentage: [],
    });

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
    axios
      .post(
        'https://dev-commons-config-backend.herokuapp.com/conviction-voting/',
        {
          spendingLimit: Number(spendingLimit) / 100,
          minimumConviction: Number(minimumConviction) / 100,
          convictionGrowth,
          convictionVotingPeriodDays,
        }
      )
      .then((response) => {
        const { output } = response.data;
        setGrowthChartData({
          ...output.convictionGrowthChart,
          dataPoints: [
            output.convictionGrowth80PercentageXY,
            output.maxConvictionGrowthXY,
          ],
          table: output.table,
        });
        setThresholdChartData({ ...output.convictionThresholdChart });
      })
      .catch((error) => console.log(error));
  }, [
    spendingLimit,
    minimumConviction,
    convictionGrowth,
    convictionVotingPeriodDays,
  ]);

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
          convictionPercentage={growthChartData.convictionPercentage}
          dataPoints={growthChartData.dataPoints}
          handleClose={() => setDialogOpen(false)}
          isOpen={dialogOpen}
          onChange={(event) => handleChange(event)}
          timeDays={growthChartData.timeDays}
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
              requestedPercentage={thresholdChartData.requestedPercentage}
              thresholdPercentage={thresholdChartData.thresholdPercentage}
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
            <ScenarioTable table={growthChartData.table} />
          </ChartContainer>
        </div>
      </div>
    </>
  );
}

export default ConvictionVoting;
