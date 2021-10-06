import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Input from '@/components/Input';
import { Card, Navbar } from '@/components/_global';
import { NeonButton } from '@/components/btns';
import { useParams } from '@/hooks/';
import TextArea from '@/components/TextArea';
import { Dialog } from '@/components/modals';

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
    <div className="flex justify-center">
      <Card title={title} hiddenButton>
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
      <div className="flex flex-col flex-grow my-4 mx-16 py-6 px-9">
        <h2 className="font-bj text-sm text-neon-light py-4">Your Strategy</h2>
        <TextArea
          name={textAreaName}
          placeholder="Why did you choose these settings ... ?"
          value={textAreaValue}
          onChange={onTextAreaChange}
        />
      </div>
    </div>
  );
}

function SubmitConfig() {
  const { handleChange, ...params } = useParams();
  const [title, setTitle] = useState('');
  const [dialog, setDialog] = useState(false);
  const [url, setUrl] = useState(undefined);
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
  ];

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

  const submitParams = () => {
    const choosenParams = {
      title,
      tokenLockup: {
        openingPrice: Number(params.openingPrice),
        tokenFreeze: Number(params.tokenFreeze),
        tokenThaw: Number(params.tokenThaw),
      },
      augmentedBondingCurve: {
        commonsTribute: Number(params.commonsTribute) / 100,
        ragequit: Number(params.ragequitPercentage),
        initialPrice: 1,
        entryTribute: Number(params.entryTribute) / 100,
        exitTribute: Number(params.exitTribute) / 100,
        hatchScenarioFunding: Number(params.reserveBalance) / 1000,
        stepList: params.stepList,
        zoomGraph: 0,
      },
      taoVoting: {
        supportRequired: Number(params.supportRequired) / 100,
        minimumQuorum: Number(params.minimumQuorum) / 100,
        voteDuration: Number(params.voteDuration),
        delegatedVotingPeriod: Number(params.delegatedVotingPeriod),
        quietEndingPeriod: Number(params.quietEndingPeriod),
        quietEndingExtension: Number(params.quietEndingExtension),
        executionDelay: Number(params.executionDelay),
      },
      convictionVoting: {
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
    axios
      .post(
        'https://dev-commons-config-backend.herokuapp.com/issue-generator/',
        choosenParams
      )
      .then((response) => {
        setUrl(response.data[1]);
        setDialog(true);
      })
      .catch((e) => console.log(e.response, choosenParams));
  };

  return (
    <>
      <Head>
        <title>Review and Submit | Commons Dashboard</title>
      </Head>
      <Dialog isOpen={dialog && url !== undefined}>
        <h2 className="font-bj font-bold text-xl text-neon text-center py-6">
          Congratulations!
        </h2>
        <div className="font-bj text-neon-light">
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
      <div className="lg:min-h-screen bg-dash bg-cover">
        <Navbar />
        <h2 className="font-bj font-bold text-3xl text-neon-light text-center py-4">
          Configuration Summary
        </h2>
        <div className="max-w-screen-xl mx-auto bg-black py-16">
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
            <NeonButton href="" onClick={submitParams} fullWidth>
              <span>SUBMIT PROPOSAL</span>
            </NeonButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubmitConfig;
