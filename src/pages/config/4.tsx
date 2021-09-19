import { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Card from '@/components/Card';
import Dialog from '@/components/Dialog';
import Input from '@/components/Input';
import { ConfigNavbar as Navbar } from '@/components/Navbar';
import CurveChart from '@/components/CurveChart';
import ConvictionGrowthChart from '@/components/ConvictionGrowthChart';

type ParamsOptionsType =
  | 'SPENDING_LIMIT'
  | 'MINIMUM_CONVICTION'
  | 'CONVICTION_GROWTH';

interface ConvictionVotingParams {
  spendingLimit: string;
  minimumConviction: string;
  convictionGrowth: string;
}
interface ConvictionGrowthData {
  convictionPercentage: number[];
  timeDays: number[];
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
  { id: 'radio1', label: '7 Days', value: '' },
  { id: 'radio2', label: '2 Weeks', value: '' },
  { id: 'radio3', label: '1 Month', value: '' },
  { id: 'radio4', label: '3 Months', value: '' },
  { id: 'radio5', label: '6 Months', value: '' },
];

function ConvictionVoting() {
  const [paramSelected, setParamSelected] =
    useState<ParamsOptionsType>('SPENDING_LIMIT');
  const [paramsValue, setParamsValue] = useState<ConvictionVotingParams>({
    spendingLimit: '20',
    minimumConviction: '5',
    convictionGrowth: '2',
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [growthChartData, setGrowthChartData] = useState<ConvictionGrowthData>({
    convictionPercentage: [],
    timeDays: [0],
  });

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

  const inputs = [
    {
      name: 'spendingLimit',
      paramName: 'SPENDING_LIMIT',
      value: paramsValue.spendingLimit,
      param: 'Spending Limit',
      placeholder: '%',
      tooltipText:
        'The total amount of funds in the Common Pool that can be requested by a single proposal.',
      numeric: true,
    },
    {
      name: 'minimumConviction',
      paramName: 'MINIMUM_CONVICTION',
      value: paramsValue.minimumConviction,
      param: 'Minimum Conviction',
      placeholder: '%',
      tooltipText:
        'The minimum amount of tokens needed to pass a request for an infinitely small amount of funds, relative to the Effective Supply.',
      numeric: true,
    },
    {
      name: 'convictionGrowth',
      paramName: 'CONVICTION_GROWTH',
      value: paramsValue.convictionGrowth,
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
    const values = Object.values(paramsValue);
    const validParams = values.every((elem) => elem !== '');
    if (validParams) {
      axios
        .post(
          'https://dev-commons-config-backend.herokuapp.com/conviction-voting/',
          {
            ...paramsValue,
            'support-required': Number(paramsValue['support-required']) / 100,
            'minimum-quorum': Number(paramsValue['minimum-quorum']) / 100,
          }
        )
        .then((response) => {
          const { output } = response.data;
          setGrowthChartData({ ...output.convictionGrowthChart });
        });
    }
  }, [paramsValue]);

  return (
    <>
      <Head>
        <title>Config 4 | Commons Dashboard</title>
      </Head>
      <div className="lg:min-h-screen bg-dash bg-cover">
        <Dialog title="Conviction Growth" isOpen={dialogOpen}>
          <div className="py-8 m-auto">
            <ConvictionGrowthChart
              convictionPercentage={growthChartData.convictionPercentage}
              timeDays={growthChartData.timeDays}
            />
          </div>
          <div className="h-12 border border-gray-500 w-1/3 mx-auto flex justify-center items-center">
            <span className="font-bj font-bold text-neon-light uppercase">
              conviction growth: {paramsValue.convictionGrowth}
            </span>
            <span className="font-inter font-medium text-gray-200 text-xs px-1 pt-1">
              days
            </span>
          </div>
          <div className="py-4">
            <input
              className="slider"
              name="convictionGrowth"
              type="range"
              min="1"
              max="100"
              value={paramsValue.convictionGrowth}
              onChange={(event) => handleNumeriChange(event)}
            />
          </div>
          <button
            className="flex m-auto uppercase font-bj font-bold text-neon text-xs pt-6"
            onClick={() => setDialogOpen(false)}
          >
            close
          </button>
        </Dialog>
        <Navbar />
        <div className="lg:flex">
          <Card
            title="conviction voting"
            previousPanel="Back"
            previousHref="/config/3"
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
                  input.numeric
                    ? handleNumeriChange(event)
                    : handleChange(event)
                }
                placeholder={input.placeholder}
                tooltipText={input.tooltipText}
              >
                {input.children}
              </Input>
            ))}
          </Card>
          <div className="flex flex-col w-10/12 mx-auto mt-4 shadow-2xl lg:w-7/12">
            <h1 className="font-bj text-gray-100 text-2xl text-center px-9 pt-6 pb-3 lg:text-left">
              {paramsContent[paramSelected].question}
            </h1>
            <h3 className="font-inter text-gray-300 text-center text-xs px-9 pb-6 lg:text-left">
              {paramsContent[paramSelected].description}
            </h3>
            <CurveChart />
            <div className="flex justify-between max-w-2xl mx-auto px-8 py-6 bg-cyan-700 opacity-60">
              {radioButtons.map((button) => (
                <p className="mx-4" key={button.id}>
                  <input
                    id={button.id}
                    type="radio"
                    name="radio"
                    className="hidden radio"
                  />
                  <label
                    htmlFor={button.id}
                    className="flex items-center cursor-pointer font-bj text-sm text-neon-light radio"
                  >
                    <span className="w-5 h-5 inline-block mr-2 rounded-full border border-grey flex-no-shrink radio" />
                    {button.label}
                  </label>
                </p>
              ))}
            </div>
            <div className="px-16 pt-6 pb-2 font-bj text-neon-light text-xs">
              <div className="flex justify-between pb-2 mb-2 border-b border-gray-100 uppercase font-bold">
                <div className="w-1/6 max-w-144 table-text">variables</div>
                <div className="w-1/6 max-w-144">scneario 1</div>
                <div className="w-1/6 max-w-144">scneario 2</div>
                <div className="w-1/6 max-w-144">scneario 3</div>
                <div className="w-1/6 max-w-144">scneario 4</div>
                <div className="w-1/6 max-w-144">scneario 5</div>
                <div className="w-1/6 max-w-144">scneario 6</div>
              </div>
              <div className="flex justify-between py-1 hover:bg-cyan-700 cursor-pointer">
                <div className="w-1/6 max-w-144">IN PROGRESS</div>
                <div className="w-1/6 max-w-144">IN PROGRESS</div>
                <div className="w-1/6 max-w-144">IN PROGRESS</div>
                <div className="w-1/6 max-w-144">IN PROGRESS</div>
                <div className="w-1/6 max-w-144">IN PROGRESS</div>
                <div className="w-1/6 max-w-144">IN PROGRESS</div>
                <div className="w-1/6 max-w-144">IN PROGRESS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConvictionVoting;
