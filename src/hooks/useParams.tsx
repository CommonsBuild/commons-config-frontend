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
  ragequitPercentage: string;
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
};

const initialContext: ParamsContextType = {
  openingPrice: '',
  tokenFreeze: '',
  tokenThaw: '',
  commonsTribute: '',
  entryTribute: '',
  exitTribute: '',
  reserveBalance: '',
  stepList: [],
  initialBuy: '0',
  ragequitPercentage: '0',
  zoomGraph: '0',
  supportRequired: '',
  minimumQuorum: '',
  voteDuration: '',
  delegatedVotingPeriod: '',
  quietEndingPeriod: '',
  quietEndingExtension: '',
  executionDelay: '',
  spendingLimit: '',
  minimumConviction: '',
  convictionGrowth: '',
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

  return (
    <ParamsContext.Provider
      value={{
        ...params,
        submitProposal: submitProposalState,
        setParams,
        handleChange,
        handleMarketScenario,
        handleAddStep,
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
