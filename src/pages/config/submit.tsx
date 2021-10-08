import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import Input from '@/components/Input';
import { Card, Navbar } from '@/components/_global';
import { NeonButton } from '@/components/btns';
import { Backdrop, Dialog } from '@/components/modals';
import TextArea from '@/components/TextArea';
import { useParams } from '@/hooks/';
import api from '@/services/api';

interface ModuleContainerProps {
  inputList: { [key: string]: string }[];
  title: string;
  textAreaName: string;
  textAreaValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTextAreaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function ModuleContainer({
  inputList,
  title,
  textAreaName,
  textAreaValue,
  onChange,
  onTextAreaChange,
}: ModuleContainerProps) {
  return (
    <motion.div layout className="flex justify-around">
      <Card title={title} hiddenButton minWidth>
        {inputList.map((input) => (
          <Input
            key={input.name}
            name={input.name}
            param={input.param}
            placeholder={input.placeholder}
            tooltipText={input.tooltipText}
            value={input.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onChange(event)
            }
          />
        ))}
      </Card>
      <div className="flex flex-col flex-grow my-4 mx-8 py-6 px-9 max-w-xl">
        <h2 className="font-bj text-sm text-neon-light py-4">Your Strategy</h2>
        <TextArea
          name={textAreaName}
          placeholder="Why did you choose these settings ... ?"
          value={textAreaValue}
          onChange={onTextAreaChange}
        />
      </div>
    </motion.div>
  );
}

function SubmitConfig() {
  const { submitProposal, handleChange, setParams, ...params } = useParams();
  const [title, setTitle] = useState('');
  const [dialog, setDialog] = useState(false);
  const [advancedDialog, setAdvancedDialog] = useState(false);
  const [url, setUrl] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [advancedParams, setAdvancedParams] = useState(false);
  const [textAreaContent, setTextAreaContent] = useState({
    freeze: '',
    abc: '',
    tao: '',
    conviction: '',
    overall: '',
  });
  const freezeThawInputs = [
    {
      name: 'openingPrice',
      paramName: 'OPENING_PRICE',
      value: params.openingPrice,
      param: 'Opening Price',
      placeholder: 'wxDAI',
      tooltipText:
        'The initial price of the TEC token after the Commons Upgrade is complete.',
    },
    {
      name: 'commonsTribute',
      paramName: 'COMMONS_TRIBUTE',
      value: params.commonsTribute,
      param: 'Commons Tribute',
      placeholder: '%',
      tooltipText:
        'A percentage of the total funds raised from the Hatch is sent to the Common Pool to kick-start the Commons project.',
    },
    {
      name: 'entryTribute',
      paramName: 'ENTRY_TRIBUTE',
      value: params.entryTribute,
      param: 'Entry Tribute',
      placeholder: '%',
      tooltipText:
        'The percentage taken off BUY order and sent to the Common Pool.',
    },
  ];

  const augmentedBondingInputs = [
    {
      name: 'commonsTribute',
      paramName: 'COMMONS_TRIBUTE',
      value: params.commonsTribute,
      param: 'Commons Tribute',
      placeholder: '%',
      tooltipText:
        'A percentage of the total funds raised from the Hatch is sent to the Common Pool to kick-start the Commons project.',
    },
    {
      name: 'entryTribute',
      paramName: 'ENTRY_TRIBUTE',
      value: params.entryTribute,
      param: 'Entry Tribute',
      placeholder: '%',
      tooltipText:
        'The percentage taken off BUY order and sent to the Common Pool.',
    },
    {
      name: 'exitTribute',
      paramName: 'EXIT_TRIBUTE',
      value: params.exitTribute,
      param: 'Exit Tribute',
      placeholder: '%',
      tooltipText:
        'The percentage taken off SELL orders and sent to the Common Pool.',
    },
  ];

  const taoVoting = [
    {
      name: 'supportRequired',
      paramName: 'SUPPORT_REQUIRED',
      value: params.supportRequired,
      param: 'Support Required',
      placeholder: '%',
      tooltipText:
        'The percent of votes that must be in favour of this proposal.',
    },
    {
      name: 'minimumQuorum',
      paramName: 'MINIMUM_QUORUM',
      value: params.minimumQuorum,
      param: 'Minimum Quorum',
      placeholder: '%',
      tooltipText:
        'The percent of all tokens that must vote on a proposal in order for it to be valid.',
    },
    {
      name: 'voteDuration',
      paramName: 'VOTE_DURATION',
      value: params.voteDuration,
      param: 'Vote Duration',
      placeholder: 'days',
      tooltipText: 'The amount of time a proposal is eligible to be voted on.',
    },
    {
      name: 'delegatedVotingPeriod',
      paramName: 'DELEGATED_VOTING_PERIOD',
      value: params.delegatedVotingPeriod,
      param: 'Delegated Voting Period',
      placeholder: 'days',
      tooltipText:
        'The amount of time delegates are permitted to vote on a proposal.',
    },
    {
      name: 'quietEndingPeriod',
      paramName: 'QUIET_ENDING_PERIOD',
      value: params.quietEndingPeriod,
      param: 'Quiet Ending Period',
      placeholder: 'days',
      tooltipText:
        'If the voting outcome changes during this time the Quiet Ending Extension will trigger, extending the Vote Duration.',
    },
    {
      name: 'quietEndingExtension',
      paramName: 'QUIET_ENDING_EXTENSION',
      value: params.quietEndingExtension,
      param: 'Quiet Ending Extension',
      placeholder: 'days',
      tooltipText:
        'The amount of time added to the Vote Duration resulting from the vote outcome changing during the Quiet Ending.',
    },
    {
      name: 'executionDelay',
      paramName: 'EXECUTION_DELAY',
      value: params.executionDelay,
      param: 'Execution Delay',
      placeholder: 'days',
      tooltipText:
        'The amount of time after a vote passes before the proposed action is executed',
    },
  ];

  const disputableConvictionVoting = [
    {
      name: 'spendingLimit',
      paramName: 'SPENDING_LIMIT',
      value: params.spendingLimit,
      param: 'Spending Limit',
      placeholder: '%',
      tooltipText:
        'The total amount of funds in the Common Pool that can be requested by a single proposal.',
    },
    {
      name: 'minimumConviction',
      paramName: 'MINIMUM_CONVICTION',
      value: params.minimumConviction,
      param: 'Minimum Conviction',
      placeholder: '%',
      tooltipText:
        'The minimum amount of tokens needed to pass a request for an infinitely small amount of funds, relative to the Effective Supply.',
    },
    {
      name: 'convictionGrowth',
      paramName: 'CONVICTION_GROWTH',
      value: params.convictionGrowth,
      param: 'Conviction Growth',
      placeholder: 'days',
      tooltipText: 'The amount of time it takes to increase Conviction by 50%.',
    },
    {
      name: 'convictionVotingPeriodDays',
      paramName: 'CONVICTION_GROWTH',
      value: params.convictionVotingPeriodDays,
      param: 'Conviction Voting Period Days',
      placeholder: 'days',
      tooltipText:
        'The minimum amount of tokens needed to pass a request for an infinitely small amount of funds, relative to the Effective Supply.',
    },
  ];

  const advancedParameters = [
    {
      name: 'commonPoolAmount',
      value: '0',
      param: 'Common Pool Amount',
      placeholder: 'wxDAI',
      tooltipText: '',
    },
    {
      name: 'HNYLiquidity',
      value: '100',
      param: 'HNY Liquidity',
      placeholder: 'wxDAI',
      tooltipText: '',
    },
    {
      name: 'gardenLiquidity',
      value: '1',
      param: 'Garden Liquidity',
      placeholder: 'TEC',
      tooltipText: '',
    },
    {
      name: 'virtualSupply',
      value: '1',
      param: 'Virtual Supply',
      placeholder: 'TEC',
      tooltipText: '',
    },
    {
      name: 'virtualBalance',
      value: '1',
      param: 'Virtual Balance',
      placeholder: 'wxDAI',
      tooltipText: '',
    },
    {
      name: 'transferability',
      value: '',
      param: 'Transferability',
      placeholder: '',
      tooltipText: '',
    },
    {
      name: 'tokenName',
      value: 'Token Engineering Commons',
      param: 'Token Name',
      placeholder: '',
      tooltipText: '',
    },
    {
      name: 'tokenSymbol',
      value: 'TEC',
      param: 'Token Symbol',
      placeholder: '',
      tooltipText: '',
    },
    {
      name: 'proposalDeposit',
      value: '200',
      param: 'Proposal Deposit',
      placeholder: 'wxDAI',
      tooltipText: '',
    },
    {
      name: 'challengeDeposit',
      value: '400',
      param: 'Challenge Deposit',
      placeholder: 'wxDAI',
      tooltipText: '',
    },
    {
      name: 'settlementPeriod',
      value: '5',
      param: 'Settlement Period',
      placeholder: 'days',
      tooltipText: '',
    },
    {
      name: 'minimumEffectiveSupply',
      value: '1%',
      param: 'Minimum Effective Supply',
      placeholder: '%',
      tooltipText: '',
    },
    {
      name: 'hatchersRageQuit',
      value: '60000',
      param: 'Hatchers Rage Quit',
      placeholder: 'wxDAI',
      tooltipText: '',
    },
    {
      name: 'initialBuy',
      value: '200000',
      param: 'Initial Buy',
      placeholder: 'wxDAI',
      tooltipText: '',
    },
  ];

  useEffect(() => {
    if (params.convictionVotingPeriodDays === '') {
      setParams((previousParams) => ({
        ...previousParams,
        convictionVotingPeriodDays: '7',
      }));
    }
  }, []);

  const handleTitle = (event) => {
    const { value } = event.target;

    setTitle(value);
  };

  const handleTextArea = (event) => {
    const { name, value } = event.target;

    setTextAreaContent({
      ...textAreaContent,
      [name]: value,
    });
  };

  function submitParams() {
    setLoading(true);
    const chosenParams = {
      title,
      overallStrategy: textAreaContent.overall,
      tokenLockup: {
        strategy: textAreaContent.freeze,
        openingPrice: Number(params.openingPrice),
        tokenFreeze: Number(params.tokenFreeze),
        tokenThaw: Number(params.tokenThaw),
      },
      augmentedBondingCurve: {
        strategy: textAreaContent.abc,
        openingPrice: Number(params.openingPrice),
        commonsTribute: Number(params.commonsTribute) / 100,
        ragequitAmount: Number(params.ragequitAmount),
        initialBuy: Number(params.initialBuy),
        entryTribute: Number(params.entryTribute) / 100,
        exitTribute: Number(params.exitTribute) / 100,
        reserveBalance: Number(params.reserveBalance) / 1000,
        stepList: params.stepList,
        zoomGraph: 0,
      },
      taoVoting: {
        strategy: textAreaContent.tao,
        supportRequired: params.supportRequired,
        minimumQuorum: params.minimumQuorum,
        delegatedVotingPeriod: Number(params.delegatedVotingPeriod),
        quietEndingPeriod: Number(params.quietEndingPeriod),
        quietEndingExtension: Number(params.quietEndingExtension),
        executionDelay: Number(params.executionDelay),
        voteDuration: Number(params.voteDuration),
      },
      convictionVoting: {
        strategy: textAreaContent.conviction,
        spendingLimit: Number(params.spendingLimit) / 100,
        minimumConviction: Number(params.minimumConviction) / 100,
        convictionGrowth: Number(params.convictionGrowth),
        votingPeriodDays: Number(params.convictionVotingPeriodDays),
      },
      advancedSettings: {
        minimumEffectiveSupply: 0,
        hatchersRageQuit: 0,
        virtualBalance: 0,
      },
    };
    api
      .post('/issue-generator/', chosenParams)
      .then((response) => {
        setUrl(response.data.url);
        setLoading(false);
        setDialog(true);
      })
      .catch(() => {
        console.dir(chosenParams);
        setLoading(false);
        alert('Something went wrong');
      });
  }

  return (
    <>
      <Head>
        <title>Review and Submit | Commons Dashboard</title>
      </Head>
      <Dialog isOpen={dialog && url !== undefined}>
        <h2 className="font-bj font-bold text-xl text-neon text-center py-6 px-4">
          Congratulations!
        </h2>
        <div className="font-bj text-neon-light px-16 text-center">
          Your proposal was created successfully! To see your submission,{' '}
          <a
            className="font-bj font-bold text-neon"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            click here!
          </a>
        </div>
        <button
          className="flex m-auto uppercase font-bj font-bold text-neon text-xs py-6"
          onClick={() => setDialog(false)}
        >
          close
        </button>
      </Dialog>
      <Dialog isOpen={advancedDialog} title="Advanced Settings">
        <div className="py-4 px-10">
          <p className="font-bj text-base text-neon-light pb-4">
            In the Advanced Settings there are many parameters that could have
            severe impacts on the Commons. Advanced Settings are for power-users
            who have in-depth knowledge on Commons Configurations.
          </p>
          <p className="font-bj font-bold text-base text-neon-light pb-4">
            Follow these links if you desire to learn more about Advanced
            Settings:
          </p>
          <a
            href="https://forum.tecommons.org/t/the-power-of-defaults-in-the-commons-configuration-dashboard/511"
            target="_blank"
            rel="noreferrer"
            className="block font-bj font-bold text-neon leading-loose"
          >
            The Power of Defaults
          </a>
          <a
            href="https://1hive.gitbook.io/gardens/"
            target="_blank"
            rel="noreferrer"
            className="block font-bj font-bold text-neon leading-loose"
          >
            Gardens Overview
          </a>
          <a
            href="https://1hive.gitbook.io/celeste/"
            target="_blank"
            rel="noreferrer"
            className="block font-bj font-bold text-neon leading-loose"
          >
            Disputability & Celeste
          </a>
          <a
            href="https://forum.tecommons.org/c/defi-legos-and-how-they-work-together/adv-ccd-params/27"
            target="_blank"
            rel="noreferrer"
            className="block font-bj font-bold text-neon leading-loose"
          >
            Advanced CCD Settings (TEC Forum)
          </a>
        </div>
        <div className="flex justify-center py-8 mx-36">
          <NeonButton fullWidth onClick={() => setAdvancedDialog(false)}>
            OK
          </NeonButton>
        </div>
      </Dialog>
      <Backdrop isOpen={loading}>
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-neon" />
      </Backdrop>
      <div className="min-h-screen h-full bg-dash bg-cover">
        <Navbar />
        <div className="flex justify-between items-center px-32 py-12">
          <Link href="/config/4">
            <div className="flex flex-1 font-bj text-sm text-neon-light cursor-pointer">
              Back
            </div>
          </Link>
          <h2 className="font-bj font-bold text-3xl text-neon-light text-center py-4">
            Configuration Summary
          </h2>
          <label
            htmlFor="toggleB"
            className="flex flex-1 justify-end items-center cursor-pointer"
          >
            <div className="text-neon-light text-sm mr-3">
              Advanced Settings
            </div>
            <div className="squared-input relative">
              <input
                type="checkbox"
                id="toggleB"
                className="sr-only"
                onChange={() => setAdvancedParams(!advancedParams)}
              />
              <div className="box block squared-input w-10 h-6" />
              <div className="dot absolute left-1 top-1 bg-gray-50 w-4 h-4 transition" />
            </div>
          </label>
        </div>
        <div className="max-w-screen-xl mx-auto bg-black pb-16">
          {advancedParams ? (
            <>
              <div className="flex container bg-gray-500 max-w-screen-lg p-8 mb-4 mx-auto border border-warn">
                <Image src="/icons/warning.svg" width={48} height={48} />
                <div className="ml-8 font-bj text-warn">
                  <h3 className="font-bold">WARNING!</h3>
                  <p>
                    Use <b>ONLY</b> if you absolutely know what you’re doing.{' '}
                    <b
                      className="text-white cursor-pointer"
                      onClick={() => setAdvancedDialog(true)}
                    >
                      Learn more about Advanced Settings.
                    </b>
                  </p>
                </div>
              </div>
              <ModuleContainer
                inputList={advancedParameters}
                title="advanced settings"
                onChange={handleChange}
                textAreaName="advanced"
                textAreaValue=""
                onTextAreaChange={(event) => handleTextArea(event)}
              />
            </>
          ) : (
            <></>
          )}
          <ModuleContainer
            inputList={freezeThawInputs}
            title="token freeze & token thaw"
            onChange={handleChange}
            textAreaName="freeze"
            textAreaValue={textAreaContent.freeze}
            onTextAreaChange={(event) => handleTextArea(event)}
          />
          <ModuleContainer
            inputList={augmentedBondingInputs}
            title="augmented bonding curve"
            onChange={handleChange}
            textAreaName="abc"
            textAreaValue={textAreaContent.abc}
            onTextAreaChange={(event) => handleTextArea(event)}
          />
          <ModuleContainer
            inputList={taoVoting}
            title="tao voting"
            onChange={handleChange}
            textAreaName="tao"
            textAreaValue={textAreaContent.tao}
            onTextAreaChange={(event) => handleTextArea(event)}
          />
          <ModuleContainer
            inputList={disputableConvictionVoting}
            title="disputable conviction voting"
            onChange={handleChange}
            textAreaName="conviction"
            textAreaValue={textAreaContent.conviction}
            onTextAreaChange={(event) => handleTextArea(event)}
          />
          <div className="flex flex-col justify-center mx-16 pr-9">
            <div className="font-bj font-bold text-neon-light my-2">
              Submission Title
            </div>
            <TextArea
              name="title"
              placeholder="Pick a good title :)"
              value={title}
              onChange={handleTitle}
            />
            <div className="font-bj font-bold text-neon-light my-2">
              Overall Commons Strategy
            </div>
            <TextArea
              name="overall"
              placeholder="Explain the big picture of your Commons Configuration.. don’t forget to mention if your proposal is a fork of another..."
              value={textAreaContent.overall}
              onChange={(event) => handleTextArea(event)}
            />
            <Link href="/config/1">
              <a className="h-14 flex justify-center items-center w-full py-2 border border-neon my-2">
                <span className="font-bj font-bold text-neon uppercase">
                  return to configuration
                </span>
              </a>
            </Link>
            <NeonButton
              href=""
              onClick={submitParams}
              fullWidth
              disabled={!submitProposal}
            >
              <span>SUBMIT PROPOSAL</span>
            </NeonButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubmitConfig;
