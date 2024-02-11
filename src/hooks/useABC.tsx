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
    virtualSupply,
    virtualBalance,
    totalHatchFunding,
    totalInitialTechSupply,
    hatchFinalTechPrice,
    setParams,
  } = useParams();

  const advancedParams = [
    { name: 'totalHatchFunding', value: totalHatchFunding, multiplier: 1000 },
    {
      name: 'totalInitialTechSupply',
      value: totalInitialTechSupply,
      multiplier: 1000,
    },
    { name: 'hatchFinalTechPrice', value: hatchFinalTechPrice, multiplier: 1 },
  ];

  const fetchABCData = async () => {
    setContext((previousParams) => ({
      ...previousParams,
      isLoading: true,
    }));
    const formattedParams = {
      openingPrice,
      commonsTribute: Number(commonsTribute) / 100,
      entryTribute: Number(entryTribute) / 100,
      exitTribute: Number(exitTribute) / 100,
      stepList: stepList.length >= 0 ? stepList : undefined,
      initialBuy: Number.isNaN(Number(initialBuy)) ? 0 : Number(initialBuy),
      ragequitAmount,
      zoomGraph,
      includeMilestones: 1,
      virtualSupply,
      virtualBalance,
    };

    advancedParams.forEach(({ name, value, multiplier }) => {
      if (Number.isNaN(Number(value) / multiplier)) return;
      formattedParams[name] = Number(value) / multiplier;
    });

    await api
      .post('/augmented-bonding-curve/', formattedParams)
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
    virtualSupply,
    virtualBalance,
    totalHatchFunding,
    totalInitialTechSupply,
    hatchFinalTechPrice,
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
