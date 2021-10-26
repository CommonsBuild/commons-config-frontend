import Image from 'next/image';
import Link from 'next/link';
import SummaryContainer from '@/components/SummaryContainer';
import TextArea from '@/components/TextArea';
import { NeonButton } from '@/components/btns';

const SubmitSummary = ({
  params,
  handleChange,
  advancedParams,
  setAdvancedDialog,
  submitParams,
  submitProposal,
}) => {
  const freezeThawInputs = [
    {
      name: 'openingPrice',
      paramName: 'OPENING_PRICE',
      value: params.openingPrice,
      param: 'Opening Price',
      placeholder: 'wxDAI',
      tooltipText:
        'The Opening Price is the price we sell TEC tokens after the Commons Upgrade is complete.',
    },
    {
      name: 'tokenFreeze',
      paramName: 'TOKEN_FREEZE',
      value: params.tokenFreeze,
      param: 'Token Freeze',
      placeholder: 'weeks',
      tooltipText:
        'Token Freeze is the duration from the initialization of the Commons which tokens remain fully locked.',
    },
    {
      name: 'tokenThaw',
      paramName: 'TOKEN_THAW',
      value: params.tokenThaw,
      param: 'Token Thaw',
      placeholder: 'weeks',
      tooltipText:
        'Token Thaw is the duration after the Token Freeze where TEC tokens gradually thaw, allowing them to become tradeable.',
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
        'The amount of time after a vote passes before the proposed action is executed.',
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

  const advancedParameters = [
    {
      name: 'commonPoolAmount',
      value: params.commonPoolAmount,
      param: 'Common Pool Amount',
      placeholder: 'wxDAI',
    },
    {
      name: 'HNYLiquidity',
      value: params.HNYLiquidity,
      param: 'HNY Liquidity',
      placeholder: 'wxDAI',
    },
    {
      name: 'gardenLiquidity',
      value: params.gardenLiquidity,
      param: 'Garden Liquidity',
      placeholder: 'TEC',
    },
    {
      name: 'virtualSupply',
      value: params.virtualSupply,
      param: 'Virtual Supply',
      placeholder: 'TEC',
    },
    {
      name: 'virtualBalance',
      value: params.virtualBalance,
      param: 'Virtual Balance',
      placeholder: 'wxDAI',
    },
    {
      name: 'tokenName',
      value: params.tokenName,
      param: 'Token Name',
      placeholder: '',
    },
    {
      name: 'tokenSymbol',
      value: params.tokenSymbol,
      param: 'Token Symbol',
      placeholder: '',
    },
    {
      name: 'proposalDeposit',
      value: params.proposalDeposit,
      param: 'Proposal Deposit',
      placeholder: 'wxDAI',
    },
    {
      name: 'challengeDeposit',
      value: params.challengeDeposit,
      param: 'Challenge Deposit',
      placeholder: 'wxDAI',
    },
    {
      name: 'settlementPeriod',
      value: params.settlementPeriod,
      param: 'Settlement Period',
      placeholder: 'days',
    },
    {
      name: 'minimumEffectiveSupply',
      value: params.minimumEffectiveSupply,
      param: 'Minimum Effective Supply',
      placeholder: '%',
    },
    {
      name: 'ragequitAmount',
      value: params.ragequitAmount,
      param: 'Hatchers Rage Quit',
      placeholder: 'wxDAI',
    },
    {
      name: 'initialBuy',
      value: params.initialBuy,
      param: 'Initial Buy',
      placeholder: 'wxDAI',
    },
  ];

  return (
    <>
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
          <SummaryContainer
            inputList={advancedParameters}
            title="advanced settings"
            onChange={handleChange}
            textAreaName="advancedStrategy"
            textAreaValue={params.advancedStrategy}
            onTextAreaChange={(event) => handleChange(event)}
          />
        </>
      ) : (
        <></>
      )}
      <SummaryContainer
        inputList={freezeThawInputs}
        title="token freeze & token thaw"
        onChange={handleChange}
        textAreaName="tokenFreezeStrategy"
        textAreaValue={params.tokenFreezeStrategy}
        onTextAreaChange={(event) => handleChange(event)}
      />
      <SummaryContainer
        inputList={augmentedBondingInputs}
        title="augmented bonding curve"
        onChange={handleChange}
        textAreaName="ABCStrategy"
        textAreaValue={params.ABCStrategy}
        onTextAreaChange={(event) => handleChange(event)}
      />
      <SummaryContainer
        inputList={taoVoting}
        title="tao voting"
        onChange={handleChange}
        textAreaName="taoStrategy"
        textAreaValue={params.taoStrategy}
        onTextAreaChange={(event) => handleChange(event)}
      />
      <SummaryContainer
        inputList={disputableConvictionVoting}
        title="conviction voting"
        onChange={handleChange}
        textAreaName="convictionStrategy"
        textAreaValue={params.convictionStrategy}
        onTextAreaChange={(event) => handleChange(event)}
      />
      <div className="flex flex-col justify-center mx-16 pr-9">
        <div className="font-bj font-bold text-neon-light my-2">
          Submission Title
        </div>
        <TextArea
          name="title"
          placeholder="Pick a good title :)"
          value={params.title}
          onChange={(event) => handleChange(event)}
        />
        <div className="font-bj font-bold text-neon-light my-2">
          Overall Commons Strategy
        </div>
        <TextArea
          name="overallStrategy"
          placeholder="Explain the big picture of your Commons Configuration.. don’t forget to mention if your proposal is a fork of another..."
          value={params.overallStrategy}
          onChange={(event) => handleChange(event)}
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
          disabled={!submitProposal || params.title === ''}
        >
          <span>SUBMIT PROPOSAL</span>
        </NeonButton>
      </div>
    </>
  );
};

export default SubmitSummary;
