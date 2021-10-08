import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

type ParamsContextType = {
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
  submitProposal: boolean;
  setParams: Dispatch<SetStateAction<ParamsContextType>>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMarketScenario: (scenario: (number | string)[][]) => void;
  handleAddStep: (step: (number | string)[]) => void;
  handleRemoveStep: (stepIndex: number) => void;
};

const initialContext: ParamsContextType = {
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
  initialBuy: '0',
  ragequitAmount: '0',
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
  convictionGrowth: '5',
  convictionVotingPeriodDays: '',
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
  const [params, setParams] = useState<ParamsContextType>(initialContext);
  const [submitProposalState, setSubmitProposal] = useState(false);

  useEffect(() => {
    const {
      handleChange,
      handleMarketScenario,
      handleAddStep,
      handleRemoveStep,
      setParams: setFunc,
      submitProposal,
      stepList,
      ...rest
    } = params;
    const values = Object.keys(rest).map((key) => rest[key]);
    if (values.every((elem) => elem !== '') && stepList.length !== 0) {
      setSubmitProposal(true);
    } else {
      setSubmitProposal(false);
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
    setParams((previousParams) => ({
      ...previousParams,
      stepList: scenario,
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
    newStepList.splice(stepIndex, 1);
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
