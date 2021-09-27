import Head from 'next/head';
import Input from '@/components/Input';
import { Card, Navbar } from '@/components/_global';
import { NeonButton } from '@/components/btns';
import { useParams } from '@/hooks/';

interface ModuleContainerProps {
  inputList: { [key: string]: string }[];
  title: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function ModuleContainer({ inputList, title, onChange }: ModuleContainerProps) {
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
        <div className="relative bg-black-200 flex-grow">
          <textarea
            className="font-bold text-neon-light text-xl w-full h-full pl-3 border-2 border-gray-500 focus:border-neon hover:border-gray-400 bg-transparent outline-none resize-none"
            name="reserveBalance"
          />
          <div className="absolute left-3 top-6 transform -translate-y-2/4">
            <span className="font-inter text-xs text-gray-300">
              Why did you choose these settings ...?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubmitConfig() {
  const { handleChange, ...params } = useParams();
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

  return (
    <>
      <Head>
        <title>Review and Submit | Commons Dashboard</title>
      </Head>
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
          />
          <ModuleContainer
            inputList={augmentedBondingInputs}
            title="augmented bonding curve"
            onChange={handleChange}
          />
          <ModuleContainer
            inputList={taoVoting}
            title="tao voting"
            onChange={handleChange}
          />
          <ModuleContainer
            inputList={disputableConvictionVoting}
            title="disputable conviction voting"
            onChange={handleChange}
          />
          <div className="flex flex-col justify-center mx-16 pr-9">
            <div className="font-bj font-bold text-neon-light my-2">
              Submission Title
            </div>
            <div className="relative h-12 bg-black-200 my-2">
              <input
                className="font-bold text-neon-light text-xl w-full h-full pl-3 border-2 border-gray-500 focus:border-neon hover:border-gray-400 bg-transparent outline-none placeholder-right"
                name="reserveBalance"
              />
              <div className="absolute right-3 top-2/4 transform -translate-y-2/4">
                <span className="font-inter text-xs text-gray-300">wxDAI</span>
              </div>
            </div>
            <div className="font-bj font-bold text-neon-light my-2">
              Overall Commons Strategy
            </div>
            <div className="flex flex-col flex-grow pt-2 pb-4">
              <div className="relative bg-black-200 flex-grow">
                <textarea
                  className="font-bold text-neon-light text-xl w-full h-full pl-3 border-2 border-gray-500 focus:border-neon hover:border-gray-400 bg-transparent outline-none resize-none"
                  name="reserveBalance"
                />
                <div className="absolute left-3 top-6 transform -translate-y-2/4">
                  <span className="font-inter text-xs text-gray-300">
                    Why did you choose these settings ...?
                  </span>
                </div>
              </div>
            </div>
            <NeonButton href="" fullWidth>
              <span>SUBMIT PROPOSAL</span>
            </NeonButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubmitConfig;
