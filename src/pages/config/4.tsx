import { useEffect, useState } from 'react';
import Head from 'next/head';
import Input from '@/components/Input';
import { Card, ChartContainer, Tooltip } from '@/components/_global';
import { RadioButton, RedirectButton } from '@/components/btns';
import { ConvictionThresholdChart } from '@/components/charts';
import { useConvictionVoting, useParams } from '@/hooks';
import { AddProposal, ConvictionGrowthDialog } from '@/components/modals';
import { ConvictionVotingTable } from '@/components/tables';
import useHover from '@/hooks/useHover';

const radioButtons = [
  { id: 'radio8', label: '6 Months', value: '180' },
  { id: 'radio7', label: '3 Months', value: '60' },
  { id: 'radio6', label: '1 Month', value: '30' },
  { id: 'radio5', label: '2 Weeks', value: '14' },
  { id: 'radio4', label: '7 Days', value: '7' },
  { id: 'radio3', label: '3 Days', value: '3' },
  { id: 'radio2', label: '1 Day', value: '1' },
  { id: 'radio1', label: '8 Hours', value: '0.33' },
];

function ConvictionVoting() {
  const [tableHover, tableIsHovered] = useHover<HTMLDivElement>();
  const { convictionGrowthChart, convictionThresholdChart, dataPoints, table } =
    useConvictionVoting();
  const {
    spendingLimit,
    minimumConviction,
    convictionGrowth,
    convictionVotingPeriodDays,
    submitProposal,
    setParams,
    handleAddStep,
    handleChange,
  } = useParams();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [addProposal, setAddProposal] = useState<boolean>(false);

  const inputs = [
    {
      name: 'spendingLimit',
      value: spendingLimit,
      param: 'Spending Limit',
      link: 'https://forum.tecommons.org/t/conviction-voting-spending-limit-aka-max-ratio-beta/469',
      placeholder: '%',
      tooltipText:
        'The total amount of funds in the Common Pool that can be requested by a single proposal.',
    },
    {
      name: 'minimumConviction',
      value: minimumConviction,
      param: 'Minimum Conviction',
      link: 'https://forum.tecommons.org/t/conviction-voting-minimum-conviction-aka-minimum-threshold/493',
      placeholder: '%',
      tooltipText:
        'The minimum amount of tokens needed to pass a request for an infinitely small amount of funds, relative to the Effective Supply.',
    },
    {
      name: 'convictionGrowth',
      value: convictionGrowth,
      param: 'Conviction Growth',
      link: 'https://forum.tecommons.org/t/conviction-voting-conviction-growth-aka-half-life/490',
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
    if (convictionGrowth === '') {
      setParams((previousParams) => ({
        ...previousParams,
        convictionGrowth: '5',
      }));
    }
  }, [convictionGrowth]);

  return (
    <>
      <Head>
        <title>Config 4 | Commons Dashboard</title>
      </Head>
      <div className="min-h-screen h-full bg-dash bg-cover">
        <ConvictionGrowthDialog
          convictionGrowth={convictionGrowth}
          convictionPercentage={convictionGrowthChart.convictionPercentage}
          dataPoints={dataPoints}
          handleClose={() => setDialogOpen(false)}
          isOpen={dialogOpen}
          onChange={(event) => handleChange(event)}
          timeDays={convictionGrowthChart.timeDays}
        />
        <AddProposal
          isOpen={addProposal}
          handleClose={() => setAddProposal(false)}
          onClick={handleAddStep}
        />
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
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(event)
                }
                placeholder={input.placeholder}
                tooltipText={input.tooltipText}
                link={input.link}
              >
                {input.children}
              </Input>
            ))}
            <div className="font-inter text-xs text-gray-200 pt-4 pb-2">
              Make a Funding Request to experience your configuration.
            </div>
            <button
              className="flex justify-center items-center w-full h-8 border border-neon-light disabled:text-gray-400 disabled:border-gray-400"
              onClick={() => setAddProposal(true)}
            >
              <span className="font-bj font-bold text-xs text-neon-light uppercase cursor-pointer">
                simulate funding request
              </span>
            </button>
            <RedirectButton href="/learn/4" />
          </Card>
          <ChartContainer title="Visualize the percent of tokens needed to pass funding requests in Conviction Voting.">
            <ConvictionThresholdChart
              requestedPercentage={convictionThresholdChart.requestedPercentage}
              thresholdPercentage={convictionThresholdChart.thresholdPercentage}
            />
            <Tooltip
              isHovered={tableIsHovered}
              position="bottom"
              text="Select a time frame in which you want to pass a proposal."
            >
              <div
                className="flex flex-row-reverse justify-between max-w-4xl mx-auto px-2 py-6 mb-6 bg-cyan-700 opacity-60"
                ref={tableHover}
              >
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
            </Tooltip>
            <ConvictionVotingTable
              table={table}
              timePeriod={
                radioButtons.find(
                  (elem) => elem.value === convictionVotingPeriodDays
                )?.label
              }
            />
          </ChartContainer>
        </div>
      </div>
    </>
  );
}

export default ConvictionVoting;
