import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

type ParamsContextType = {
  title: string;
  overallStrategy: string;
  tokenFreezeStrategy: string;
  ABCStrategy: string;
  taoStrategy: string;
  convictionStrategy: string;
  advancedStrategy: string;
  openingPrice: string;
  tokenFreeze: string;
  tokenThaw: string;
  commonsTribute: string;
  entryTribute: string;
  exitTribute: string;
  initialBuy: string;
  reserveBalance: string;
  ragequitAmount: string;
  stepList: (number | string)[][];
  zoomGraph: string;
  supportRequired: string;
  minimumQuorum: string;
  voteDuration: string;
  delegatedVotingPeriod: string;
  quietEndingPeriod: string;
  quietEndingExtension: string;
  executionDelay: string;
  spendingLimit: string;
  minimumConviction: string;
  convictionGrowth: string;
  convictionVotingPeriodDays: string;
  commonPoolAmount: string;
  HNYLiquidity: string;
  gardenLiquidity: string;
  virtualSupply: string;
  virtualBalance: string;
  transferable: string;
  tokenName: string;
  tokenSymbol: string;
  proposalDeposit: string;
  challengeDeposit: string;
  settlementPeriod: string;
  minimumEffectiveSupply: string;
  submitProposal: boolean;
  setParams: Dispatch<SetStateAction<ParamsContextType>>;
  handleChange: (event: React.ChangeEvent) => void;
  handleMarketScenario: (scenario: (number | string)[][]) => void;
  handleAddStep: (step: (number | string)[]) => void;
  handleRemoveStep: (stepIndex: number) => void;
};

const initialContext: ParamsContextType = {
  title: '',
  overallStrategy: '',
  tokenFreezeStrategy: '',
  ABCStrategy: '',
  taoStrategy: '',
  convictionStrategy: '',
  advancedStrategy: '',
  openingPrice: '1.65',
  tokenFreeze: '30',
  tokenThaw: '100',
  commonsTribute: '50',
  entryTribute: '3',
  exitTribute: '15',
  reserveBalance: '1571223.57',
  stepList: [
    [5000, 'wxDAI'],
    [100000, 'wxDAI'],
    [3000, 'TEC'],
  ],
  initialBuy: '250000',
  ragequitAmount: '60000',
  zoomGraph: '0',
  supportRequired: '88',
  minimumQuorum: '8',
  voteDuration: '7',
  delegatedVotingPeriod: '5',
  quietEndingPeriod: '3',
  quietEndingExtension: '2',
  executionDelay: '1',
  spendingLimit: '20',
  minimumConviction: '0.5',
  convictionGrowth: '',
  convictionVotingPeriodDays: '7',
  commonPoolAmount: '0',
  HNYLiquidity: '100',
  gardenLiquidity: '1',
  virtualSupply: '1',
  virtualBalance: '1',
  transferable: 'true',
  tokenName: 'Token Engineering Commons',
  tokenSymbol: 'TEC',
  proposalDeposit: '200',
  challengeDeposit: '400',
  settlementPeriod: '5',
  minimumEffectiveSupply: '1',
  submitProposal: false,
  setParams: (): void => {
    throw new Error('setParams must be overridden');
  },
  handleChange: (): void => {
    throw new Error('handleChange must be overridden');
  },
  handleMarketScenario: (): void => {
    throw new Error('handleMarketScenario must be overridden');
  },
  handleAddStep: (): void => {
    throw new Error('handleAddStep must be overridden');
  },
  handleRemoveStep: (): void => {
    throw new Error('handleRemoveStep must be overridden');
  },
};

const ParamsContext = createContext<ParamsContextType>(initialContext);

interface AppParamsContextProps {
  children: React.ReactNode;
}

function ParamsProvider({ children }: AppParamsContextProps) {
  const [params, setParams] = useState<ParamsContextType>();
  const [submitProposalState, setSubmitProposal] = useState(false);

  useEffect(() => {
    setParams(JSON.parse(localStorage.getItem('params')) || initialContext);
  }, []);

  useEffect(() => {
    if (params) {
      const {
        handleChange,
        handleMarketScenario,
        handleAddStep,
        handleRemoveStep,
        setParams: setFunc,
        title,
        overallStrategy,
        tokenFreezeStrategy,
        ABCStrategy,
        taoStrategy,
        convictionStrategy,
        advancedStrategy,
        stepList,
        commonPoolAmount,
        HNYLiquidity,
        gardenLiquidity,
        virtualSupply,
        virtualBalance,
        transferable,
        tokenName,
        tokenSymbol,
        proposalDeposit,
        challengeDeposit,
        settlementPeriod,
        minimumEffectiveSupply,
        submitProposal,
        ...rest
      } = params;
      const values = Object.keys(rest).map((key) => {
        if (key !== 'transferability') {
          return rest[key];
        }
        return 'true';
      });
      console.log(values);
      if (values.every((elem) => elem !== '') && stepList.length !== 0) {
        setSubmitProposal(true);
      } else {
        setSubmitProposal(false);
      }
      localStorage.setItem('params', JSON.stringify(params));
    }
  }, [params]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setParams((previousParams) => ({
      ...previousParams,
      [name]: value,
    }));
  };

  const handleMarketScenario = (scenario: (number | string)[][]) => {
    const { stepList } = params;
    let newScenario;
    if (stepList.length > 3) {
      newScenario = [...scenario, ...stepList.slice(3, stepList.length)];
    }
    setParams((previousParams) => ({
      ...previousParams,
      stepList: newScenario || scenario,
    }));
  };

  const handleAddStep = (step: (number | string)[]) => {
    const newStepList = params.stepList;
    newStepList.push(step);
    setParams((previousParams) => ({
      ...previousParams,
      stepList: newStepList,
    }));
  };

  const handleRemoveStep = (stepIndex: number) => {
    const newStepList = params.stepList;
    newStepList.splice(stepIndex - 1, 1);
    setParams((previousParams) => ({
      ...previousParams,
      stepList: newStepList,
    }));
  };

  return (
    <ParamsContext.Provider
      value={{
        ...params,
        submitProposal: submitProposalState,
        setParams,
        handleChange,
        handleMarketScenario,
        handleAddStep,
        handleRemoveStep,
      }}
    >
      {children}
    </ParamsContext.Provider>
  );
}

function useParams() {
  const context = useContext(ParamsContext);

  return context;
}

export { ParamsContext, ParamsProvider, useParams };
