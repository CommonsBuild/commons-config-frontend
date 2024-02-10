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
  initialBuy: string | number;
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
  tableScenarios: number[][];
  commonPoolAmount: string;
  HNYLiquidity: string;
  gardenLiquidity: string;
  virtualSupply: string;
  virtualBalance: string;
  totalHatchFunding: string;
  totalInitialTechSupply: string;
  hatchFinalTechPrice: string;
  transferable: boolean;
  tokenName: string;
  tokenSymbol: string;
  proposalDeposit: string;
  challengeDeposit: string;
  settlementPeriod: string;
  minimumEffectiveSupply: string;
  submitProposal: boolean;
  setParams: Dispatch<SetStateAction<ParamsContextType>>;
  handleChange: (event: React.ChangeEvent) => void;
  // handleMarketScenario: (scenario: (number | string)[][]) => void;
  handleAddStep: (step: (number | string)[], param: string) => void;
  handleRemoveStep: (stepIndex: number) => void;
};

export const initialParams: ParamsContextType = {
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
  stepList: [],
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
  tableScenarios: [],
  commonPoolAmount: '0',
  HNYLiquidity: '100',
  gardenLiquidity: '1',
  virtualSupply: '1',
  virtualBalance: '1',
  totalHatchFunding: '1571223.57',
  totalInitialTechSupply: '2041863.58',
  hatchFinalTechPrice: '0.754743',
  transferable: true,
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
  // handleMarketScenario: (): void => {
  //   throw new Error('handleMarketScenario must be overridden');
  // },
  handleAddStep: (): void => {
    throw new Error('handleAddStep must be overridden');
  },
  handleRemoveStep: (): void => {
    throw new Error('handleRemoveStep must be overridden');
  },
};

const ParamsContext = createContext<ParamsContextType>(initialParams);

interface AppParamsContextProps {
  children: React.ReactNode;
}

function ParamsProvider({ children }: AppParamsContextProps) {
  const [params, setParams] = useState<ParamsContextType>();
  const [submitProposalState, setSubmitProposal] = useState(false);
  const [tableScenariosCount, setTableScenariosCount] = useState<number>(0);

  useEffect(() => {
    setParams(JSON.parse(localStorage.getItem('params')) || initialParams);
  }, []);

  useEffect(() => {
    if (params) {
      const {
        handleChange,
        // handleMarketScenario,
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
        totalHatchFunding,
        totalInitialTechSupply,
        hatchFinalTechPrice,
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
        if (key !== 'transferable') {
          return rest[key];
        }
        return 'true';
      });
      if (values.every((elem) => elem !== '')) {
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

  // const handleMarketScenario = (scenario: (number | string)[][]) => {
  //   const { stepList } = params;
  //   let newScenario;
  //   if (stepList.length > 3) {
  //     newScenario = [...scenario, ...stepList.slice(3, stepList.length)];
  //   }
  //   setParams((previousParams) => ({
  //     ...previousParams,
  //     stepList: newScenario || scenario,
  //   }));
  // };

  const handleAddStep = (step: (number | string)[], param: string) => {
    let newList = [];
    if (param === 'stepList') {
      newList = params.stepList;
      newList.push(step);
    } else {
      newList = params.tableScenarios;
      if (newList.length === 6) {
        newList.splice(tableScenariosCount, 1, step);
        setTableScenariosCount((previousCount) =>
          previousCount === 5 ? 0 : previousCount + 1
        );
      } else {
        newList.push(step);
      }
    }
    setParams((previousParams) => ({
      ...previousParams,
      [param]: newList,
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
        // handleMarketScenario,
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
