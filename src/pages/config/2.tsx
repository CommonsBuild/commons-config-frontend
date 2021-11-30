import { useState } from 'react';
import Head from 'next/head';
import classnames from 'classnames';
import { Toaster } from 'react-hot-toast';
import InfoBox from '@/components/InfoBox';
import Input from '@/components/Input';
import { Card, ChartContainer } from '@/components/_global';
import { RedirectButton } from '@/components/btns';
import { ABCChart } from '@/components/charts';
import { useABC, useParams } from '@/hooks';
import {
  ABCAddStepDialog,
  ABCScenarioDialog,
  Backdrop,
} from '@/components/modals/';
import { ABCTable } from '@/components/tables';
import formatOutput from '@/utils/formatOutput';

function ABC() {
  const {
    balanceInThousands,
    price,
    stepLinSpaces,
    singlePoints,
    reserveRatio,
    fundAllocations,
    stepTable,
    isLoading,
  } = useABC();
  const {
    openingPrice,
    commonsTribute,
    entryTribute,
    exitTribute,
    submitProposal,
    initialBuy,
    zoomGraph,
    handleChange,
    handleAddStep,
    handleRemoveStep,
  } = useParams();

  const [marketDialog, setMarketDialog] = useState(false);
  const [stepDialog, setStepDialog] = useState(false);
  const [selectedStep, setSelectedStep] = useState(1);
  const inputs = [
    {
      name: 'openingPrice',
      formatNumber: true,
      resetStep: true,
      value: openingPrice,
      param: 'Opening Price',
      link: 'https://forum.tecommons.org/t/augmented-bonding-curve-opening-price-reserve-ratio/516',
      placeholder: 'wxDAI',
      tooltipText:
        'The initial price of the TEC token after the Commons Upgrade is complete.',
    },
    {
      name: 'commonsTribute',
      resetStep: true,
      value: commonsTribute,
      param: 'Commons Tribute',
      link: 'https://forum.tecommons.org/t/augmented-bonding-curve-commons-tribute/517',
      placeholder: '%',
      tooltipText:
        'This is a percentage of the total funds raised from the Hatch, and is sent to the Common Pool to kick-start the Commons project. The remaining percentage determines the Reserve Balance.',
    },
    {
      name: 'entryTribute',
      value: entryTribute,
      param: 'Entry Tribute',
      link: 'https://forum.tecommons.org/t/augmented-bonding-curve-entry-exit-tribute/494',
      placeholder: '%',
      tooltipText:
        'The percentage taken off BUY orders and sent to the Common Pool.',
    },
    {
      name: 'exitTribute',
      value: exitTribute,
      param: 'Exit Tribute',
      link: 'https://forum.tecommons.org/t/augmented-bonding-curve-entry-exit-tribute/494',
      placeholder: '%',
      tooltipText:
        'The percentage taken off SELL orders and sent to the Common Pool.',
    },
    {
      name: 'zoomGraph',
      value: zoomGraph,
      param: 'Chart Zoom',
      placeholder: '',
      options: [
        { label: 'Yes', value: '1' },
        { label: 'No', value: '0' },
      ],
      select: true,
      tooltipText: '',
      isNumber: false,
    },
  ];

  return (
    <>
      <Head>
        <title>Config 2 | Commons Dashboard</title>
      </Head>
      <Backdrop isOpen={isLoading}>
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-neon" />
      </Backdrop>
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
                formatNumber={input.formatNumber}
                param={input.param}
                placeholder={input.placeholder}
                tooltipText={input.tooltipText}
                link={input.link}
                value={input.value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (input.resetStep) {
                    setSelectedStep(0);
                  }
                  handleChange(event);
                }}
                select={input.select}
                options={input.options}
                isNumber={input.isNumber}
              />
            ))}
            <RedirectButton href="/learn/2" />
            <div className="py-2">
              <div className="font-inter text-xs text-gray-200 py-2">
                Add more transactions to experience your ABC config
              </div>
              <button
                disabled={stepTable?.step?.length >= 10}
                className="flex justify-center items-center w-full h-8 mb-2 border border-neon-light disabled:text-gray-400 disabled:border-gray-400"
                onClick={() => setStepDialog(true)}
              >
                <span className="font-bj font-bold text-xs text-neon-light uppercase cursor-pointer">
                  simulate a transaction
                </span>
              </button>
              <span
                className="font-bj font-medium text-neon text-sm uppercase cursor-pointer"
                onClick={() => setMarketDialog(true)}
              >
                <b>how to use the simulator</b>
              </span>
            </div>
          </Card>
          <ChartContainer title="Experience your Augmented Bonding Curve by adjusting your params and adding steps.">
            <div className="max-w-max h-0 text-center relative -top-3 left-24">
              <div className="flex gap-2">
                <InfoBox
                  label={`COMMON POOL AT LAUNCH: ${formatOutput(
                    fundAllocations.commonPoolAfter
                  )} wxDAI`}
                  link="https://forum.tecommons.org/t/augmented-bonding-curve-commons-tribute/517"
                  tooltipText="The amount of wxDAI which will be in the Common Pool at the Commons Upgrade. This is calculated using the Hatch funds raised, Hatchers who have rage quit (Advanced), the Initial buy-in (Advanced) and the Commons Tribute."
                />
                <InfoBox
                  color="neon"
                  label={`RESERVE RATIO: ${(reserveRatio * 100).toFixed(2)}%`}
                  link="https://forum.tecommons.org/t/augmented-bonding-curve-opening-price-reserve-ratio/516"
                  tooltipText={
                    <span>
                      Reserve Ratio is an output of the Opening Price and
                      Commons Tribute, it defines the shape of the ABC.{' '}
                      <b className="text-neon">
                        Click to learn more about the Reserve Ratio.
                      </b>
                    </span>
                  }
                />
              </div>
            </div>
            <ABCChart
              balanceInThousands={balanceInThousands}
              price={price}
              stepLinSpaces={stepLinSpaces ? stepLinSpaces[selectedStep] : {}}
              singleDataPoints={singlePoints}
            />
            <span className="font-bj text-sm text-neon-light px-16 pt-6 pb-2">
              Transactions
            </span>
            <div className="flex px-16 pt-2 pb-6">
              {stepTable?.step?.map((item, index) => (
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
                    {index + (Number(initialBuy) > 0 ? 0 : 1)}
                  </span>
                  {index > 3 ? (
                    <a
                      className="absolute -top-2 -right-2 rounded-full bg-red-500 h-4 w-4 flex justify-center items-center opacity-0 group-hover:opacity-100"
                      onClick={() => handleRemoveStep(index - 3)}
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
            <ABCTable table={{ ...stepTable }} />
          </ChartContainer>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default ABC;
