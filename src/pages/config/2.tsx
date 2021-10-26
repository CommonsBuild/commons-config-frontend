import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import classnames from 'classnames';
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

const marketScenarios = [
  {
    id: 'bearish',
    value: [
      [5000, 'wxDAI'],
      [50000, 'TEC'],
      [3000, 'wxDAI'],
    ],
  },
  {
    id: 'bullish',
    value: [
      [5000, 'wxDAI'],
      [100000, 'wxDAI'],
      [3000, 'TEC'],
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
  const { chart, stepLinSpaces, singlePoints, reserveRatio, table } = useABC();
  const {
    openingPrice,
    commonsTribute,
    entryTribute,
    exitTribute,
    reserveBalance,
    stepList,
    submitProposal,
    ragequitAmount,
    initialBuy,
    handleChange,
    handleMarketScenario,
    handleAddStep,
    handleRemoveStep,
  } = useParams();

  const [marketDialog, setMarketDialog] = useState(false);
  const [stepDialog, setStepDialog] = useState(false);
  const [selectedStep, setSelectedStep] = useState(0);
  const [questionRef, questionIsHovered] = useHover<HTMLDivElement>();
  const launchValue =
    (1571223.57 - Number(ragequitAmount) - Number(initialBuy)) *
    (1 - Number(commonsTribute) / 100);
  const inputs = [
    {
      name: 'openingPrice',
      paramName: 'OPENING_PRICE',
      value: openingPrice,
      param: 'Opening Price',
      link: 'https://forum.tecommons.org/t/augmented-bonding-curve-opening-price-reserve-ratio/516',
      placeholder: 'wxDAI',
      tooltipText:
        'The initial price of the TEC token after the Commons Upgrade is complete.',
    },
    {
      name: 'commonsTribute',
      paramName: 'COMMONS_TRIBUTE',
      value: commonsTribute,
      param: 'Commons Tribute',
      link: 'https://forum.tecommons.org/t/augmented-bonding-curve-commons-tribute/517',
      placeholder: '%',
      tooltipText:
        'A percentage of the total funds raised from the Hatch is sent to the Common Pool to kick-start the Commons projects.',
    },
    {
      name: 'entryTribute',
      paramName: 'ENTRY_TRIBUTE',
      value: entryTribute,
      param: 'Entry Tribute',
      link: 'https://forum.tecommons.org/t/augmented-bonding-curve-entry-exit-tribute/494',
      placeholder: '%',
      tooltipText:
        'The percentage taken off BUY orders and sent to the Common Pool.',
    },
    {
      name: 'exitTribute',
      paramName: 'EXIT_TRIBUTE',
      value: exitTribute,
      param: 'Exit Tribute',
      link: 'https://forum.tecommons.org/t/augmented-bonding-curve-entry-exit-tribute/494',
      placeholder: '%',
      tooltipText:
        'The percentage taken off SELL orders and sent to the Common Pool.',
    },
  ];

  return (
    <>
      <Head>
        <title>Config 2 | Commons Dashboard</title>
      </Head>
      <div className="min-h-screen h-full bg-dash bg-cover">
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
                name={input.name}
                param={input.param}
                placeholder={input.placeholder}
                tooltipText={input.tooltipText}
                link={input.link}
                value={input.value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(event)
                }
              />
            ))}
            <RedirectButton href="/learn/2" />

            <div className="py-2">
              <span className="font-bj font-bold text-neon-light text-xs uppercase">
                choose your market scenario
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
                    checked={equals(scenario.value, stepList?.slice(0, 3))}
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
                    id="launch"
                    label="launch"
                    name="reserveBalance"
                    size="big"
                    tooltipText="Simulate the Reserve Balance using the amount raised by the Hatch, adjusted by the Commons Tribute"
                    value={launchValue}
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
                <button
                  disabled={table?.step?.length >= 10}
                  className="flex justify-center items-center w-full h-8 border border-neon-light disabled:text-gray-400 disabled:border-gray-400"
                  onClick={() => setStepDialog(true)}
                >
                  <span className="font-bj font-bold text-xs text-neon-light uppercase cursor-pointer">
                    add a step
                  </span>
                </button>
              </div>
              <span
                className="font-bj font-medium text-neon text-sm uppercase cursor-pointer"
                onClick={() => setMarketDialog(true)}
              >
                <b>how to use the simulator</b>
              </span>
            </div>
          </Card>
          <ChartContainer title="Experience your Augmented Bonding Curve by adjusting your parameters and experimenting with the Step Simulator.">
            <ABCChart
              balanceInThousands={chart.balanceInThousands}
              price={chart.price}
              reserveRatio={(reserveRatio * 100).toFixed(2)}
              stepLinSpaces={stepLinSpaces ? stepLinSpaces[selectedStep] : {}}
              singleDataPoints={singlePoints}
            />
            <span className="font-bj text-sm text-neon-light px-16 py-2">
              Steps
            </span>
            <div className="flex px-16 py-2">
              {table?.step?.map((item, index) => (
                <div
                  className={classnames(
                    'group relative flex justify-center items-center w-12 h-12 mr-4 border',
                    {
                      'hover:border-gray-400': index !== selectedStep,
                      'border-gray-700 ': index !== selectedStep,
                      'border-neon': index === selectedStep,
                    }
                  )}
                  onClick={() => setSelectedStep(index)}
                >
                  <span className="font-bj font-medium text-2xl text-neon-light cursor-pointer">
                    {index}
                  </span>
                  {index > 3 ? (
                    <a
                      className="absolute -top-2 -right-2 rounded-full bg-red-500 h-4 w-4 flex justify-center items-center opacity-0 group-hover:opacity-100"
                      onClick={() => handleRemoveStep(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="#FFFFFF"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
            <ABCTable table={{ ...table }} />
          </ChartContainer>
        </div>
      </div>
    </>
  );
}

export default ABC;
