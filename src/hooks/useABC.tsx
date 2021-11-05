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
import errorToast from '@/lib/notifications/error';

type ABCContextType = {
  price: number[];
  balanceInThousands: number[];
  stepLinSpaces: { [key: string]: number[] }[];
  singlePoints: any[];
  reserveRatio: number;
  stepTable: { [key: string]: number[] };
  setContext: Dispatch<SetStateAction<ABCContextType>>;
};

const initialContext: ABCContextType = {
  price: [],
  balanceInThousands: [],
  stepLinSpaces: [{}],
  singlePoints: [],
  reserveRatio: 0,
  stepTable: {},
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
    const typeTimeOut = setTimeout(() => {
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
          const { chartData, stepTable } = response.data;
          setContext({
            // chart: data.chartData as { [key: string]: number[] },
            // stepLinSpaces: data.chartData.stepLinSpaces,
            // singlePoints: data.chartData.singlePoints,
            // reserveRatio: data.chartData.reserveRatio,
            // table: data.stepTable as { [key: string]: number[] },
            ...chartData,
            stepTable,
          });
        })
        .catch(() => errorToast());
    }, 500);
    return () => clearTimeout(typeTimeOut);
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
