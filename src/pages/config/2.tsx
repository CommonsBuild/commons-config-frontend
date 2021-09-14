import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Card from '@/components/Card';
import Dialog from '@/components/Dialog';
import Input from '@/components/Input';
import LabeledRadioButton from '@/components/LabeledRadioButton';
import { ConfigNavbar as Navbar } from '@/components/Navbar';
import useHover from '@/utils/useHover';
import Tooltip from '@/components/Tooltip';
import AugmentedBondingCurve from '@/components/AugmentedBondingCurve';

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
  reserveBalance: string;
  ragequitPercentage: number;
  stepList: (number | string)[][];
  zoomGraph: number;
}

const marketScenarios = [
  {
    id: 'bullish',
    value: [
      [100, 'wxDAI'],
      [5, 'TEC'],
      [5, 'TEC'],
    ],
  },
  {
    id: 'bearish',
    value: [
      [100, 'TEC'],
      [5, 'wxDAI'],
      [5, 'wxDAI'],
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
    openingPrice: 0,
    commonsTribute: 0,
    entryTribute: 0,
    exitTribute: 0,
    reserveBalance: '-',
    ragequitPercentage: 0,
    stepList: [],
    zoomGraph: 0,
  });
  const [marketDialog, setMarketDialog] = useState(false);
  const [paramSelected, setParamSelected] =
    useState<ParamsOptionsType>('OPENING_PRICE');

  const [questionRef, questionIsHovered] = useHover<HTMLDivElement>();

  const inputs = [
    {
      name: 'openingPrice',
      paramName: 'OPENING_PRICE',
      value: paramsValue.openingPrice,
      param: 'Opening Price',
      placehoder: 'wxDAI',
      tooltipText:
        'The initial price of the TEC token after the Commons Upgrade is complete.',
    },
    {
      name: 'commonsTribute',
      paramName: 'COMMONS_TRIBUTE',
      value: paramsValue.commonsTribute,
      param: 'Commons Tribute',
      placehoder: '%',
      tooltipText:
        'A percentage of the total funds raised from the Hatch is sent to the Common Pool to kick-start the Commons project.',
    },
    {
      name: 'entryTribute',
      paramName: 'ENTRY_TRIBUTE',
      value: paramsValue.entryTribute,
      param: 'Entry Tribute',
      placehoder: '%',
      tooltipText:
        'The percentage taken off BUY order and sent to the Common Pool.',
    },
    {
      name: 'exitTribute',
      paramName: 'EXIT_TRIBUTE',
      value: paramsValue.exitTribute,
      param: 'Exit Tribute',
      placehoder: '%',
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
  return (
    <>
      <Head>
        <title>Config 2 | Commons Dashboard</title>
      </Head>
      <div className="lg:min-h-screen bg-dash bg-cover">
        <Dialog title="What is a Market Scenario?" isOpen={marketDialog}>
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
        <Navbar />
        <div className="lg:flex">
          <Card
            title="augmented bonding curve"
            previousPanel="Back"
            previousHref="/config/1"
            nextPanel="Modifying the Commons"
            nextHref="/config/3"
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
                placeholder={input.placehoder}
                tooltipText={input.tooltipText}
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
              <div className="flex py-2">
                {marketScenarios.map((scenario) => (
                  <LabeledRadioButton
                    key={scenario.id}
                    borderColor={paramsValue.stepList === scenario.value}
                    id={scenario.id}
                    label={scenario.id}
                    margin
                    name="stepList"
                    onChange={() => handleMarketScenario(scenario.value)}
                    pX
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
                    text="Setting the Reserve Balance zooms in on a section of the curve to perform transaction simulations."
                    isHovered={questionIsHovered}
                  >
                    <Image
                      src="/questionMark.svg"
                      alt="Question mark."
                      height="12"
                      width="12"
                    />
                  </Tooltip>
                </div>
                <div className="relative h-12 bg-black-200 mt-1">
                  <input
                    className="font-bold text-neon-light text-xl w-full h-full pl-3 border-2 border-gray-500 focus:border-neon hover:border-gray-400 bg-transparent outline-none placeholder-right"
                    value={paramsValue.reserveBalance}
                  />
                  <div className="absolute right-3 top-2/4 transform -translate-y-2/4">
                    <span className="font-inter text-xs text-gray-300">
                      wxDAI
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-neon-light py-2">
                  <LabeledRadioButton
                    borderColor={
                      Number(paramsValue.reserveBalance) ===
                      1500000 * (1 - paramsValue.commonsTribute / 100)
                    }
                    id="launch"
                    label="launch"
                    name="reserveBalance"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(event)
                    }
                    size="big"
                    tooltipText="Simulate the Reserve Balance using the amount raised by the Hatch, adjusted by the Commons Tribute."
                    value={1500000 * (1 - paramsValue.commonsTribute / 100)}
                  />
                  {reserveBalance.map((balance) => (
                    <LabeledRadioButton
                      key={balance.id}
                      borderColor={paramsValue.reserveBalance === balance.value}
                      id={balance.id}
                      label={balance.id}
                      name="reserveBalance"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(event)
                      }
                      size={balance.size}
                      value={balance.value}
                    />
                  ))}
                </div>
                <div className="font-inter text-xs text-gray-500 py-2">
                  Add more steps to experience your Bonding Curve
                </div>
                <a
                  className="flex justify-center border border-neon-light mt-1"
                  onClick={() => console.log(paramsValue)}
                >
                  <span className="font-bj font-bold text-xs text-neon-light uppercase p-2">
                    add a step
                  </span>
                </a>
              </div>
            </div>
          </Card>
          <div className="flex flex-col bg-transparent w-10/12 mx-auto mt-4 lg:w-7/12">
            <h1 className="font-bj text-gray-100 text-2xl text-center px-9 pt-6 pb-3 lg:text-left">
              {paramsContent[paramSelected].question}
            </h1>
            <h3 className="font-inter text-gray-300 text-center text-xs px-9 pb-6 lg:text-left">
              {paramsContent[paramSelected].description}
            </h3>
            <AugmentedBondingCurve />
          </div>
        </div>
      </div>
    </>
  );
}

export default AugmentedBonding;
// 1.5 * 1-commons tribute
