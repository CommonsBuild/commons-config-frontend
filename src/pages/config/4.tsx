import { useState } from 'react';
import Card from '@/components/Card';
import Input from '@/components/Input';
import { ConfigNavbar as Navbar } from '@/components/Navbar';
import CurveChart from '@/components/CurveChart';

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
  { id: 'radio1', label: '7 Days', value: '' },
  { id: 'radio2', label: '2 Weeks', value: '' },
  { id: 'radio3', label: '1 Month', value: '' },
  { id: 'radio4', label: '3 Months', value: '' },
  { id: 'radio5', label: '6 Months', value: '' },
];

function ConvictionVoting() {
  const [paramSelected, setParamSelected] =
    useState<ParamsOptionsType>('SPENDING_LIMIT');
  const inputs = [
    {
      name: 'spendingLimit',
      paramName: 'SPENDING_LIMIT',
      // value: paramsValue['support-required'],
      param: 'Spending Limit',
      placehoder: '%',
      tooltipText:
        'The total amount of funds in the Common Pool that can be requested by a single proposal.',
    },
    {
      name: 'minimumConviction',
      paramName: 'MINIMUM_CONVICTION',
      // value: paramsValue['support-required'],
      param: 'Minimum Conviction',
      placehoder: '%',
      tooltipText:
        'The minimum amount of tokens needed to pass a request for an infinitely small amount of funds, relative to the Effective Supply.',
    },
    {
      name: 'convictionGrowth',
      paramName: 'CONVICTION_GROWTH',
      // value: paramsValue['support-required'],
      param: 'Conviction Growth',
      placehoder: 'days',
      tooltipText: 'The amount of time it takes to increase Conviction by 50%.',
      children: 'view graph',
    },
  ];

  return (
    <div className="lg:min-h-screen bg-dash bg-cover">
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
              param={input.param}
              changeParam={() =>
                setParamSelected(input.paramName as ParamsOptionsType)
              }
              placeholder={input.placehoder}
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
                  className="hidden"
                />
                <label
                  htmlFor={button.id}
                  className="flex items-center cursor-pointer font-bj text-sm text-neon-light"
                >
                  <span className="w-5 h-5 inline-block mr-2 rounded-full border border-grey flex-no-shrink" />
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
              <div className="w-1/6 max-w-144">weeks</div>
              <div className="w-1/6 max-w-144">%</div>
              <div className="w-1/6 max-w-144"> wxDAI</div>
              <div className="w-1/6 max-w-144">weeks</div>
              <div className="w-1/6 max-w-144">%</div>
              <div className="w-1/6 max-w-144"> wxDAI</div>
              <div className="w-1/6 max-w-144"> wxDAI</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConvictionVoting;
