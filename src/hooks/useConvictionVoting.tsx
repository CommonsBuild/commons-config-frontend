import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import { useParams } from '@/hooks/useParams';
// import api from '@/services/api';

type ConvictionVotingContextType = {
  convictionGrowthChart: { [key: string]: number[] };
  convictionThresholdChart: { [key: string]: number[] };
  dataPoints: { [key: string]: number }[];
  table: { [key: string]: (number | string)[] };
  setContext: Dispatch<SetStateAction<ConvictionVotingContextType>>;
};

const initialContext: ConvictionVotingContextType = {
  convictionGrowthChart: {},
  convictionThresholdChart: {},
  dataPoints: [],
  table: {},
  setContext: (): void => {
    throw new Error('setContext must be overridden');
  },
};

const ConvictionVotingContext =
  createContext<ConvictionVotingContextType>(initialContext);

interface AppConvictionVotingContextProps {
  children: React.ReactNode;
}

function ConvictionVotingProvider({
  children,
}: AppConvictionVotingContextProps) {
  const [params, setContext] =
    useState<ConvictionVotingContextType>(initialContext);
  const {
    spendingLimit,
    minimumConviction,
    convictionGrowth,
    convictionVotingPeriodDays,
    tableScenarios,
  } = useParams();

  useEffect(() => {
    const typeTimeOut = setTimeout(() => {
      console.log({
        spendingLimit: Number(spendingLimit) / 100,
        minimumConviction: Number(minimumConviction) / 100,
        convictionGrowth,
        convictionVotingPeriodDays,
        tableScenarios,
      });
      axios
        .post(
          'https://cv-scenario-generator.herokuapp.com/conviction-voting/',
          {
            spendingLimit: Number(spendingLimit) / 100,
            minimumConviction: Number(minimumConviction) / 100,
            convictionGrowth,
            convictionVotingPeriodDays,
            tableScenarios,
          }
        )
        .then((response) => {
          const { output } = response.data;
          console.log(output);
          setContext({
            ...output,
            dataPoints: [
              output.convictionGrowth80PercentageXY,
              output.maxConvictionGrowthXY,
            ],
          });
        })
        .catch((e) => console.log(e.response));
    }, 500);
    return () => clearTimeout(typeTimeOut);
  }, [
    spendingLimit,
    minimumConviction,
    convictionGrowth,
    convictionVotingPeriodDays,
    JSON.stringify(tableScenarios),
  ]);

  return (
    <ConvictionVotingContext.Provider value={{ ...params }}>
      {children}
    </ConvictionVotingContext.Provider>
  );
}

function useConvictionVoting() {
  const context = useContext(ConvictionVotingContext);

  return context;
}

export {
  ConvictionVotingContext,
  ConvictionVotingProvider,
  useConvictionVoting,
};
