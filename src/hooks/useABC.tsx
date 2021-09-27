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

type ABCContextType = {
  chart: { [key: string]: number[] };
  stepLinSpaces: { [key: string]: number[] }[];
  table: { [key: string]: number[] };
  setContext: Dispatch<SetStateAction<ABCContextType>>;
};

const initialContext: ABCContextType = {
  chart: {},
  stepLinSpaces: [],
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
    ragequitPercentage,
    zoomGraph,
  } = useParams();

  useEffect(() => {
    console.log({
      openingPrice,
      commonsTribute,
      entryTribute,
      exitTribute,
      reserveBalance: Number(reserveBalance) / 1000,
      stepList,
      initialBuy,
      ragequitPercentage,
      zoomGraph,
    });
    axios
      .post(
        'https://abcurve-backend-test.herokuapp.com/augmented-bonding-curve/',
        {
          openingPrice,
          commonsTribute,
          entryTribute,
          exitTribute,
          reserveBalance: Number(reserveBalance) / 1000,
          stepList,
          initialBuy,
          ragequitPercentage,
          zoomGraph,
        }
      )
      .then((response) => {
        const { data } = response;
        setContext((previousContext) => ({
          ...previousContext,
          chart: data[0].chartData as { [key: string]: number[] },
          stepLinSpaces: data[0].chartData.stepLinSpaces,
          table: data[1].stepTable as { [key: string]: number[] },
        }));
      })
      .catch((e) => console.log(e));
  }, [
    openingPrice,
    commonsTribute,
    entryTribute,
    exitTribute,
    reserveBalance,
    stepList,
    initialBuy,
    ragequitPercentage,
    zoomGraph,
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
