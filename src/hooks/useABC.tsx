import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from '@/hooks/useParams';
import api from '@/services/api';

type ABCContextType = {
  chart: { [key: string]: number[] };
  stepLinSpaces: { [key: string]: number[] }[];
  singlePoints: { [key: string]: number }[];
  reserveRatio: number;
  table: { [key: string]: number[] };
  setContext: Dispatch<SetStateAction<ABCContextType>>;
};

const initialContext: ABCContextType = {
  chart: {},
  stepLinSpaces: [{}],
  singlePoints: [],
  reserveRatio: 0,
  table: {},
  setContext: (): void => {
    throw new Error('setContext must be overridden');
  },
};

const ABCContext = createContext<ABCContextType>(initialContext);

interface AppABCContextProps {
  children: React.ReactNode;
}

function ABCProvider({ children }: AppABCContextProps) {
  const [params, setContext] = useState<ABCContextType>(initialContext);
  const {
    openingPrice,
    commonsTribute,
    entryTribute,
    exitTribute,
    reserveBalance,
    stepList,
    initialBuy,
    ragequitAmount,
    zoomGraph,
    // virtualSupply,
    // virtualBalance,
    setParams,
  } = useParams();

  useEffect(() => {
    api
      .post('/augmented-bonding-curve/', {
        openingPrice,
        commonsTribute: Number(commonsTribute) / 100,
        entryTribute: Number(entryTribute) / 100,
        exitTribute: Number(exitTribute) / 100,
        reserveBalance,
        stepList,
        initialBuy,
        ragequitAmount,
        zoomGraph,
        // virtualSupply,
        // virtualBalance,
      })
      .then((response) => {
        const { data } = response;
        console.log(data);
        setContext((previousContext) => ({
          ...previousContext,
          chart: data.chartData as { [key: string]: number[] },
          stepLinSpaces: data.chartData.stepLinSpaces,
          singlePoints: data.chartData.singlePoints,
          reserveRatio: data.chartData.reserveRatio,
          table: data.stepTable as { [key: string]: number[] },
        }));
      })
      .catch((e) => console.log('error', e));
  }, [
    openingPrice,
    commonsTribute,
    entryTribute,
    exitTribute,
    reserveBalance,
    JSON.stringify(stepList),
    initialBuy,
    ragequitAmount,
    zoomGraph,
    setParams,
  ]);

  return (
    <ABCContext.Provider value={{ ...params }}>{children}</ABCContext.Provider>
  );
}

function useABC() {
  const context = useContext(ABCContext);

  return context;
}

export { ABCContext, ABCProvider, useABC };
