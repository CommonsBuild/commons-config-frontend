import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Input from '@/components/Input';
import {
  Card,
  ChartContainer,
  ConfigNavbar as Navbar,
  Tooltip,
} from '@/components/_global';
import { LabeledRadioButton, RedirectButton } from '@/components/btns';
import { ABCChart } from '@/components/charts';
import { useABC, useHover, useParams } from '@/hooks';
import { ABCAddStepDialog, ABCScenarioDialog } from '@/components/modals/';
import { ABCTable } from '@/components/tables';

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

type ParamsOptionsType =
  | 'OPENING_PRICE'
  | 'COMMONS_TRIBUTE'
  | 'ENTRY_TRIBUTE'
  | 'EXIT_TRIBUTE';

const marketScenarios = [
  {
    id: 'bearish',
    value: [
      [5, 'wxDAI'],
      [50, 'TEC'],
      [3, 'wxDAI'],
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

function ABC() {
  const { chart, stepLinSpaces, table } = useABC();

  const {
    openingPrice,
    commonsTribute,
    entryTribute,
    exitTribute,
    reserveBalance,
    stepList,
    submitProposal,
    setParams,
    handleChange,
    handleMarketScenario,
    handleAddStep,
  } = useParams();

  const [marketDialog, setMarketDialog] = useState(false);
  const [stepDialog, setStepDialog] = useState(false);
  const [, setParamSelected] = useState<ParamsOptionsType>('OPENING_PRICE');

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
        <ABCScenarioDialog
          isOpen={marketDialog}
          handleClose={() => setMarketDialog(false)}
        />
        <ABCAddStepDialog
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
            <ABCChart
              balanceInThousands={chart.balanceInThousands}
              price={chart.price}
              stepLinSpaces={stepLinSpaces}
            />
            <span
              className="font-bj text-sm text-neon-light px-16 py-2"
              onClick={() => console.log(table)}
            >
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
            <ABCTable stepList={stepList} table={{ ...table }} />
          </ChartContainer>
        </div>
      </div>
    </>
  );
}

export default ABC;
