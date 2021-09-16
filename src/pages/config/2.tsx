import { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Image from 'next/image';
import Card from '@/components/Card';
import Dialog from '@/components/Dialog';
import Input from '@/components/Input';
import LabeledRadioButton from '@/components/LabeledRadioButton';
import { ConfigNavbar as Navbar } from '@/components/Navbar';
import useHover from '@/utils/useHover';
import Tooltip from '@/components/Tooltip';
import AugmentedBondingCurve from '@/components/AugmentedBondingCurve';

interface StepsTableProps {
  stepList: (string | number)[][];
  table: { [key: string]: (number | string)[] };
}

function StepsTable({ stepList, table }: StepsTableProps) {
  const headerOrder = [
    'step',
    'currentPriceParsed',
    'amountIn',
    'tributeCollected',
    'amountOut',
    'newPriceParsed',
    'slippage',
  ];

  return (
    <div className="px-16 pt-6 pb-2 font-bj text-neon-light text-xs">
      <div className="flex justify-between pb-2 mb-2 border-b border-gray-100 uppercase font-bold">
        <div className="w-1/6 max-w-144">step</div>
        <div className="w-1/6 max-w-144">current price (TEC)</div>
        <div className="w-1/6 max-w-144">amount in</div>
        <div className="w-1/6 max-w-144">tribute collected</div>
        <div className="w-1/6 max-w-144">amount out</div>
        <div className="w-1/6 max-w-144">new price (TEC)</div>
        <div className="w-1/6 max-w-144">price slippage</div>
      </div>
      {Object.keys(stepList).map((elem, index) => (
        <div className="flex justify-between items-center mb-2 hover:bg-cyan-700 cursor-pointer">
          {Object.keys(table).map((key, kIndex) => (
            <span className="w-1/6 max-w-144">
              {table[headerOrder[kIndex]][index]}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

interface AddStepDialogProps {
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
  onClick: (step: (number | string)[]) => void;
  isOpen: boolean;
}

interface StepValues {
  type: string;
  value: string;
}
function AddStepDialog({ handleClose, onClick, isOpen }: AddStepDialogProps) {
  const [stepData, setStepData] = useState<StepValues>({
    type: 'wxDAI',
    value: '-',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const { value } = event.target;

    setStepData({
      ...stepData,
      [name]: value,
    });
  };

  return (
    <Dialog isOpen={isOpen}>
      <div className="bg-black-200 px-8 py-6">
        <span className="block font-bj font-bold text-xs text-neon-light uppercase pb-2">
          add transaction to experience your bonding curve
        </span>
        <span className="font-inter text-xs text-gray-400">
          Make a Buy or Sell onto your Augmented Bonding Curve to experiment
          with your configuration settings.
        </span>
      </div>
      <div className="p-4">
        <LabeledRadioButton
          margin
          pX
          id="buy"
          label="buy"
          name="type"
          size="big"
          value="wxDAI"
          onChange={(event) => handleChange(event)}
        />
        <LabeledRadioButton
          margin
          pX
          id="sell"
          label="sell"
          name="type"
          size="big"
          value="TEC"
          onChange={(event) => handleChange(event)}
        />
        <div className="relative h-12 bg-black-200 my-3">
          <input
            className="font-bold text-neon-light text-xl w-full h-full pl-3 border-2 border-gray-500 focus:border-neon hover:border-gray-400 bg-transparent outline-none placeholder-right"
            name="value"
            value={stepData.value}
            onChange={(event) => handleChange(event)}
          />
          <div className="absolute right-3 top-2/4 transform -translate-y-2/4">
            <span className="font-inter text-xs text-gray-300">
              {stepData.type}
            </span>
          </div>
        </div>
        <a
          className="flex justify-center border border-neon my-3"
          onClick={() => onClick([Number(stepData.value), stepData.type])}
        >
          <span className="font-bj font-bold text-xs text-neon uppercase p-2 py-3">
            add a step
          </span>
        </a>
        <button
          className="flex m-auto uppercase font-bj font-bold text-neon text-xs pt-3"
          onClick={handleClose}
        >
          close
        </button>
      </div>
    </Dialog>
  );
}

type ParamsOptionsType =
  | 'OPENING_PRICE'
  | 'COMMONS_TRIBUTE'
  | 'ENTRY_TRIBUTE'
  | 'EXIT_TRIBUTE';

interface AugmentedBondingParams {
  openingPrice: number;
  commonsTribute: number;
  entryTribute: number;
  exitTribute: number;
  initialBuy: number;
  reserveBalance: string;
  ragequitPercentage: number;
  stepList: (number | string)[][];
  zoomGraph: number;
}

interface StepsTableParams {
  currentPriceParsed: number[];
  amountIn: string[];
  tributeCollected: string[];
  amountOut: string[];
  newPriceParsed: number[];
  slippage: string[];
  step: number[];
}

interface ChartParams {
  price: [];
  balanceInThousands: [];
}

const marketScenarios = [
  {
    id: 'bearish',
    value: [
      [1000, 'TEC'],
      [5, 'wxDAI'],
      [5, 'wxDAI'],
    ],
  },
  {
    id: 'bullish',
    value: [
      [1000, 'wxDAI'],
      [5, 'TEC'],
      [5, 'TEC'],
    ],
  },
];

const reserveBalance = [
  { id: '100k', size: 'medium', value: '100000' },
  { id: '500k', size: 'medium', value: '500000' },
  { id: '1m', size: 'small', value: '1000000' },
  { id: '3m', size: 'small', value: '3000000' },
  { id: '5m', size: 'small', value: '5000000' },
];

const paramsContent = {
  OPENING_PRICE: {
    question: 'What price should we set the TEC token at launch?',
    description:
      'The Opening Price is the price we sell TEC tokens after Commons Upgrade is complete.',
  },
  COMMONS_TRIBUTE: {
    question:
      'What percentage of Hatch funds should go immediately to funding TEC projects?',
    description:
      'A percentage of the total funds raised from the Hatch is sent to the Common Pool to kick-start the Commons’ projects.',
  },
  ENTRY_TRIBUTE: {
    question:
      'What percentage of every BUY order on the ABC should go to funding the TEC?',
    description:
      'The percentage taken off BUY orders and sent to the Common Pool.',
  },
  EXIT_TRIBUTE: {
    question:
      'What percentage of every SELL order on the ABC should go to funding the TEC?',
    description:
      'The percentage taken off SELL orders and sent to the Common Pool.',
  },
};

function AugmentedBonding() {
  const [paramsValue, setParamsValue] = useState<AugmentedBondingParams>({
    commonsTribute: 5,
    ragequitPercentage: 0,
    openingPrice: 2,
    entryTribute: 15,
    exitTribute: 15,
    initialBuy: 0,
    reserveBalance: '1500000',
    stepList: [
      [5, 'TEC'],
      [1000, 'wxDai'],
      [10, 'TEC'],
    ],
    zoomGraph: 0,
  });
  const [stepsTable, setStepsTable] = useState<StepsTableParams>({
    currentPriceParsed: [],
    amountIn: [],
    tributeCollected: [],
    amountOut: [],
    newPriceParsed: [],
    slippage: [],
    step: [],
  });
  const [chartData, setChartData] = useState<ChartParams>({
    balanceInThousands: [],
    price: [],
  });

  const [marketDialog, setMarketDialog] = useState(false);
  const [stepDialog, setStepDialog] = useState(false);
  const [paramSelected, setParamSelected] =
    useState<ParamsOptionsType>('OPENING_PRICE');

  const [questionRef, questionIsHovered] = useHover<HTMLDivElement>();

  const inputs = [
    {
      name: 'openingPrice',
      paramName: 'OPENING_PRICE',
      value: paramsValue.openingPrice,
      param: 'Opening Price',
      placeholder: 'wxDAI',
      tooltipText:
        'The initial price of the TEC token after the Commons Upgrade is complete.',
    },
    {
      name: 'commonsTribute',
      paramName: 'COMMONS_TRIBUTE',
      value: paramsValue.commonsTribute,
      param: 'Commons Tribute',
      placeholder: '%',
      tooltipText:
        'A percentage of the total funds raised from the Hatch is sent to the Common Pool to kick-start the Commons project.',
    },
    {
      name: 'entryTribute',
      paramName: 'ENTRY_TRIBUTE',
      value: paramsValue.entryTribute,
      param: 'Entry Tribute',
      placeholder: '%',
      tooltipText:
        'The percentage taken off BUY order and sent to the Common Pool.',
    },
    {
      name: 'exitTribute',
      paramName: 'EXIT_TRIBUTE',
      value: paramsValue.exitTribute,
      param: 'Exit Tribute',
      placeholder: '%',
      tooltipText:
        'The percentage taken off SELL orders and sent to the Common Pool.',
    },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const { value } = event.target;

    setParamsValue({
      ...paramsValue,
      [name]: value,
    });
  };

  const handleDialog = () => {
    setMarketDialog(!marketDialog);
  };

  const handleMarketScenario = (scenario: (number | string)[][]) => {
    setParamsValue({
      ...paramsValue,
      stepList: scenario,
    });
  };

  const handleAddStep = (step: (number | string)[]) => {
    const newStepList = paramsValue.stepList;
    newStepList.push(step);
    console.log(newStepList);
    setParamsValue({
      ...paramsValue,
      stepList: newStepList,
    });
    setStepDialog(false);
  };

  useEffect(() => {
    const values = Object.values(paramsValue);
    const validParams = values.every((elem) => elem !== '');
    if (validParams) {
      axios
        .post(
          'https://abcurve-backend-test.herokuapp.com/augmented-bonding-curve/',
          {
            ...paramsValue,
            reserveBalance: Number(paramsValue.reserveBalance) / 10000,
          }
        )
        .then((response) => {
          console.log(response);
          setChartData({ ...response.data[0] });
          setStepsTable({ ...response.data[2] });
        });
    }
  }, [paramsValue]);

  return (
    <>
      <Head>
        <title>Config 2 | Commons Dashboard</title>
      </Head>
      <div className="lg:min-h-screen bg-dash bg-cover">
        <Dialog isOpen={marketDialog} title="What is a Market Scenario?">
          <p className="font-inter text-lg text-neon-light text-center py-4">
            Market Scenarios have been designed as a pre-set series of 3 steps
            (transactions) in order to aid in the digestion of ABC mechanics.
            Simulating typical market events, there are two scenarios to choose
            from on the ABC tool: <b>Bullish</b> or <b>Bearish</b>.
          </p>
          <p className="font-inter text-lg text-neon-light text-center py-4">
            By choosing one or the other take note of any theoretical profits or
            losses between Step 1 and Step 3 resulting from Step 2 and the funds
            being contributed to the Common Pool.
          </p>
          <p className="font-inter text-lg text-neon-light text-center py-4">
            Market Scenarios have no impact on the Commons Configuration
            parameters.
          </p>
          <button
            className="flex m-auto uppercase font-bj font-bold text-neon text-xs pt-6"
            onClick={handleDialog}
          >
            close
          </button>
        </Dialog>
        <AddStepDialog
          handleClose={() => setStepDialog(false)}
          isOpen={stepDialog}
          onClick={handleAddStep}
        />
        <Navbar />
        <div className="lg:flex">
          <Card
            nextHref="/config/3"
            nextPanel="Modifying the Commons"
            previousHref="/config/1"
            previousPanel="Back"
            title="augmented bonding curve"
          >
            {inputs.map((input) => (
              <Input
                key={input.name}
                changeParam={() =>
                  setParamSelected(input.paramName as ParamsOptionsType)
                }
                name={input.name}
                param={input.param}
                placeholder={input.placeholder}
                tooltipText={input.tooltipText}
                value={input.value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(event)
                }
              />
            ))}
            <div className="py-4">
              <span className="font-bj font-bold text-neon-light text-xs uppercase">
                choose your market scenario
              </span>
              <span
                className="font-inter font-medium text-neon text-xs px-4 cursor-pointer"
                onClick={handleDialog}
              >
                What&apos;s this?
              </span>
              <div className="flex flex-row-reverse justify-end py-2">
                {marketScenarios.map((scenario) => (
                  <LabeledRadioButton
                    key={scenario.id}
                    checked
                    margin
                    pX
                    id={scenario.id}
                    label={scenario.id}
                    name="stepList"
                    onChange={() => handleMarketScenario(scenario.value)}
                  />
                ))}
              </div>
              <div className="pt-4">
                <span className="font-bj text-sm text-neon-light">
                  Reserve Balance (wxDAI)
                </span>
                <div
                  ref={questionRef}
                  className="inline-block align-middle m-1"
                >
                  <Tooltip
                    isHovered={questionIsHovered}
                    text="Setting the Reserve Balance zooms in on a section of the curve to perform transaction simulations."
                  >
                    <Image
                      alt="Question mark."
                      height="12"
                      src="/questionMark.svg"
                      width="12"
                    />
                  </Tooltip>
                </div>
                <div className="relative h-12 bg-black-200 mt-1">
                  <input
                    className="font-bold text-neon-light text-xl w-full h-full pl-3 border-2 border-gray-500 focus:border-neon hover:border-gray-400 bg-transparent outline-none placeholder-right"
                    name="reserveBalance"
                    value={paramsValue.reserveBalance}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(event)
                    }
                  />
                  <div className="absolute right-3 top-2/4 transform -translate-y-2/4">
                    <span className="font-inter text-xs text-gray-300">
                      wxDAI
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-neon-light py-2">
                  <LabeledRadioButton
                    checked={
                      Number(paramsValue.reserveBalance) ===
                      1500000 * (1 - Number(paramsValue.commonsTribute) / 100)
                    }
                    id="launch"
                    label="launch"
                    name="reserveBalance"
                    size="big"
                    value={1500000 * (1 - paramsValue.commonsTribute / 100)}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(event)
                    }
                  />
                  {reserveBalance.map((balance) => (
                    <LabeledRadioButton
                      key={balance.id}
                      id={balance.id}
                      label={balance.id}
                      name="reserveBalance"
                      size={balance.size}
                      value={balance.value}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(event)
                      }
                    />
                  ))}
                </div>
                <div className="font-inter text-xs text-gray-500 py-2">
                  Add more steps to experience your Bonding Curve
                </div>
                <a
                  className="flex justify-center border border-neon-light mt-1"
                  onClick={() => setStepDialog(true)}
                >
                  <span className="font-bj font-bold text-xs text-neon-light uppercase p-2">
                    add a step
                  </span>
                </a>
              </div>
            </div>
          </Card>
          <div className="flex flex-col bg-transparent w-10/12 px-9  mx-auto mt-4 lg:w-7/12">
            <h1 className="font-bj text-gray-100 text-2xl text-center pt-6 pb-3 lg:text-left">
              {paramsContent[paramSelected].question}
            </h1>
            <h3 className="font-inter text-gray-300 text-center text-xs pb-6 lg:text-left">
              {paramsContent[paramSelected].description}
            </h3>
            <AugmentedBondingCurve
              balanceInThousands={chartData.balanceInThousands}
              price={chartData.price}
            />
            <span className="font-bj text-sm text-neon-light pb-2">Steps</span>
            <div className="flex">
              {paramsValue.stepList.map((item, index) => (
                <div className="flex justify-center items-center w-12 h-12 mr-4 border border-neon border-opacity-20 cursor-pointer">
                  <span className="font-bj font-medium text-2xl text-neon-light">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
            <StepsTable
              stepList={paramsValue.stepList}
              table={{ ...stepsTable }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AugmentedBonding;
