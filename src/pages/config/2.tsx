import { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Image from 'next/image';
import Card from '@/components/Card';
import ChartContainer from '@/components/ChartContainer';
import Dialog from '@/components/Dialog';
import Input from '@/components/Input';
import LabeledRadioButton from '@/components/LabeledRadioButton';
import { ConfigNavbar as Navbar } from '@/components/Navbar';
import useHover from '@/hooks/useHover';
import Tooltip from '@/components/Tooltip';
import AugmentedBondingCurve from '@/components/AugmentedBondingCurve';
import RedirectButton from '@/components/RedirectButton';
import { useParams } from '@/hooks/useParams';

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

interface MarketScenarioDialogProps {
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}

function MarketScenarioDialog({
  handleClose,
  isOpen,
}: MarketScenarioDialogProps) {
  return (
    <Dialog isOpen={isOpen} title="What is a Market Scenario?">
      <p className="font-inter text-lg text-neon-light text-center p-4">
        Market Scenarios have been designed as a pre-set series of 3 steps
        (transactions) in order to aid in the digestion of ABC mechanics.
        Simulating typical market events, there are two scenarios to choose from
        on the ABC tool: <b>Bullish</b> or <b>Bearish</b>.
      </p>
      <p className="font-inter text-lg text-neon-light text-center p-4">
        By choosing one or the other take note of any theoretical profits or
        losses between Step 1 and Step 3 resulting from Step 2 and the funds
        being contributed to the Common Pool.
      </p>
      <p className="font-inter text-lg text-neon-light text-center p-4">
        Market Scenarios have no impact on the Commons Configuration parameters.
      </p>
      <button
        className="flex m-auto uppercase font-bj font-bold text-neon text-xs py-6"
        onClick={handleClose}
      >
        close
      </button>
    </Dialog>
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
          checked={stepData.type === 'wxDAI'}
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
          checked={stepData.type === 'TEC'}
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
    <div className="pl-16 py-6 font-bj text-neon-light text-xs">
      <div className="flex justify-between items-end pb-2 mb-2 border-b border-gray-100 uppercase font-bold">
        <div className="w-1/12 max-w-144">step</div>
        <div className="w-1/5 max-w-144">current price</div>
        <div className="w-1/5 max-w-144">amount in</div>
        <div className="w-1/5 max-w-144">tribute collected</div>
        <div className="w-1/5 max-w-144">amount out</div>
        <div className="w-1/5 max-w-144">new price</div>
        <div className="w-1/5 max-w-144">price slippage</div>
      </div>
      {Object.keys(stepList).map((elem, index) => (
        <div className="flex justify-between items-center mb-2 hover:bg-cyan-700 cursor-pointer">
          {Object.keys(table).map((key, kIndex) => (
            <span className="w-1/5 max-w-144 first:w-1/12">
              {table[headerOrder[kIndex]][index]}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

type ParamsOptionsType =
  | 'OPENING_PRICE'
  | 'COMMONS_TRIBUTE'
  | 'ENTRY_TRIBUTE'
  | 'EXIT_TRIBUTE';

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
  price: number[];
  balanceInThousands: number[];
  stepLinSpaces: { [key: string]: number[] }[];
}

const marketScenarios = [
  {
    id: 'bearish',
    value: [
      [5, 'wxDAI'],
      [1000, 'TEC'],
      [10, 'wxDAI'],
    ],
  },
  {
    id: 'bullish',
    value: [
      [5, 'TEC'],
      [1000, 'wxDAI'],
      [10, 'TEC'],
    ],
  },
];

const reserveBalanceButtons = [
  { id: '100k', size: 'medium', value: '100000' },
  { id: '500k', size: 'medium', value: '500000' },
  { id: '1m', size: 'small', value: '1000000' },
  { id: '3m', size: 'small', value: '3000000' },
  { id: '5m', size: 'small', value: '5000000' },
];

function AugmentedBonding() {
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
    stepLinSpaces: [],
  });

  const [marketDialog, setMarketDialog] = useState(false);
  const [stepDialog, setStepDialog] = useState(false);
  const [, setParamSelected] = useState<ParamsOptionsType>('OPENING_PRICE');

  const {
    openingPrice,
    commonsTribute,
    entryTribute,
    exitTribute,
    reserveBalance,
    stepList,
    initialBuy,
    ragequitPercentage,
    zoomGraph,
    submitProposal,
    setParams,
    handleChange,
    handleMarketScenario,
    handleAddStep,
  } = useParams();
  const [questionRef, questionIsHovered] = useHover<HTMLDivElement>();

  const inputs = [
    {
      name: 'openingPrice',
      paramName: 'OPENING_PRICE',
      value: openingPrice,
      param: 'Opening Price',
      placeholder: 'wxDAI',
      tooltipText:
        'The initial price of the TEC token after the Commons Upgrade is complete.',
    },
    {
      name: 'commonsTribute',
      paramName: 'COMMONS_TRIBUTE',
      value: commonsTribute,
      param: 'Commons Tribute',
      placeholder: '%',
      tooltipText:
        'A percentage of the total funds raised from the Hatch is sent to the Common Pool to kick-start the Commons project.',
    },
    {
      name: 'entryTribute',
      paramName: 'ENTRY_TRIBUTE',
      value: entryTribute,
      param: 'Entry Tribute',
      placeholder: '%',
      tooltipText:
        'The percentage taken off BUY order and sent to the Common Pool.',
    },
    {
      name: 'exitTribute',
      paramName: 'EXIT_TRIBUTE',
      value: exitTribute,
      param: 'Exit Tribute',
      placeholder: '%',
      tooltipText:
        'The percentage taken off SELL orders and sent to the Common Pool.',
    },
  ];

  useEffect(() => {
    console.log('trigger');
    axios
      .post(
        'https://abcurve-backend-test.herokuapp.com/augmented-bonding-curve/',
        {
          openingPrice,
          commonsTribute,
          entryTribute,
          exitTribute,
          reserveBalance: Number(reserveBalance) / 1000,
          stepList,
          initialBuy,
          ragequitPercentage,
          zoomGraph,
        }
      )
      .then((response) => {
        setChartData({ ...response.data[0].chartData });
        setStepsTable({ ...response.data[1].stepTable });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [
    openingPrice,
    commonsTribute,
    entryTribute,
    exitTribute,
    reserveBalance,
    stepList,
    initialBuy,
    ragequitPercentage,
    zoomGraph,
    stepDialog,
  ]);

  useEffect(() => {
    if (
      [commonsTribute, entryTribute, exitTribute, reserveBalance].every(
        (elem) => elem === '' && stepList.length === 0
      )
    ) {
      setParams((previousParams) => ({
        ...previousParams,
        openingPrice: openingPrice || '2',
        commonsTribute: '5',
        entryTribute: '15',
        exitTribute: '15',
        reserveBalance: '1500000',
        stepList: [
          [5, 'TEC'],
          [1000, 'wxDAI'],
          [10, 'TEC'],
        ],
      }));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Config 2 | Commons Dashboard</title>
      </Head>
      <div className="lg:min-h-screen bg-dash bg-cover">
        <MarketScenarioDialog
          isOpen={marketDialog}
          handleClose={() => setMarketDialog(false)}
        />
        <AddStepDialog
          handleClose={() => setStepDialog(false)}
          isOpen={stepDialog}
          onClick={handleAddStep}
        />
        <Navbar />
        <div className="flex justify-center">
          <Card
            nextHref="/config/3"
            nextPanel="Modifying the Commons"
            previousHref="/config/1"
            previousPanel="Back"
            title="augmented bonding curve"
            submitProposal={!submitProposal}
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
            <div className="py-2">
              <span className="font-bj font-bold text-neon-light text-xs uppercase">
                choose your market scenario
              </span>
              <span
                className="font-inter font-medium text-neon text-xs px-4 cursor-pointer"
                onClick={() => setMarketDialog(true)}
              >
                What&apos;s this?
              </span>
              <div className="flex flex-row-reverse justify-end py-2">
                {marketScenarios.map((scenario) => (
                  <LabeledRadioButton
                    key={scenario.id}
                    margin
                    pX
                    id={scenario.id}
                    label={scenario.id}
                    name="stepList"
                    checked={equals(scenario.value, stepList.slice(0, 3))}
                    onChange={() => handleMarketScenario(scenario.value)}
                  />
                ))}
              </div>
              <div className="py-2">
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
                    value={reserveBalance}
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
                      Number(reserveBalance) ===
                      1500000 * (1 - Number(commonsTribute) / 100)
                    }
                    id="launch"
                    label="launch"
                    name="reserveBalance"
                    size="big"
                    value={1500000 * (1 - Number(commonsTribute) / 100)}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(event)
                    }
                  />
                  {reserveBalanceButtons.map((balance) => (
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
            <RedirectButton href="/learn/2" />
          </Card>
          <ChartContainer title="Experience your Augmented Bonding Curve by adjusting your parameters and experimenting with the Step Simulator.">
            <AugmentedBondingCurve
              balanceInThousands={chartData.balanceInThousands}
              price={chartData.price}
              stepLinSpaces={chartData.stepLinSpaces}
            />
            <span className="font-bj text-sm text-neon-light px-16 py-2">
              Steps
            </span>
            <div className="flex px-16 py-2">
              {stepList.map((item, index) => (
                <div className="flex justify-center items-center w-12 h-12 mr-4 border border-neon border-opacity-20 cursor-pointer">
                  <span className="font-bj font-medium text-2xl text-neon-light">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
            <StepsTable stepList={stepList} table={{ ...stepsTable }} />
          </ChartContainer>
        </div>
      </div>
    </>
  );
}

export default AugmentedBonding;
