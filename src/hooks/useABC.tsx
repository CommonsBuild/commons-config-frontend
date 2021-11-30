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
import errorToast from '@/lib/notifications/error';

type ABCContextType = {
  isLoading: boolean;
  price: number[];
  balanceInThousands: number[];
  stepLinSpaces: { [key: string]: number[] }[];
  singlePoints: any[];
  reserveRatio: number;
  milestoneTable: { [key: string]: number[] };
  stepTable: { [key: string]: number[] };
  fundAllocations: { [key: string]: number };
  setContext: Dispatch<SetStateAction<ABCContextType>>;
};

const initialContext: ABCContextType = {
  isLoading: false,
  price: [],
  balanceInThousands: [],
  stepLinSpaces: [{}],
  singlePoints: [],
  reserveRatio: 0,
  milestoneTable: {},
  fundAllocations: {},
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
    stepList,
    initialBuy,
    ragequitAmount,
    zoomGraph,
    // virtualSupply,
    // virtualBalance,
    setParams,
  } = useParams();

  const fetchABCData = async () => {
    setContext((previousParams) => ({
      ...previousParams,
      isLoading: true,
    }));
    await axios
      .post(
        'https://abcurve-backend-test.herokuapp.com/augmented-bonding-curve/',
        {
          openingPrice,
          commonsTribute: Number(commonsTribute) / 100,
          entryTribute: Number(entryTribute) / 100,
          exitTribute: Number(exitTribute) / 100,
          stepList,
          initialBuy,
          ragequitAmount,
          zoomGraph,
          includeMilestones: 1,
          // virtualSupply,
          // virtualBalance,
        }
      )
      .then((response) => {
        const { chartData, milestoneTable, stepTable, fundAllocations } =
          response.data;
        setContext({
          ...chartData,
          milestoneTable,
          stepTable,
          fundAllocations,
          isLoading: false,
        });
      })
      .catch(() => errorToast());
  };

  useEffect(() => {
    const typeTimeOut = setTimeout(() => {
      fetchABCData();
    }, 500);
    return () => clearTimeout(typeTimeOut);
  }, [
    openingPrice,
    commonsTribute,
    entryTribute,
    exitTribute,
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
