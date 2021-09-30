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
    setParams,
  } = useParams();

  useEffect(() => {
    axios
      .post(
        'https://abcurve-backend-test.herokuapp.com/augmented-bonding-curve/',
        {
          openingPrice: Number(openingPrice),
          commonsTribute: Number(commonsTribute) / 100,
          entryTribute: Number(entryTribute) / 100,
          exitTribute: Number(exitTribute) / 100,
          reserveBalance: Number(reserveBalance) / 1000,
          stepList,
          initialBuy,
          ragequitPercentage,
          zoomGraph,
        }
      )
      .then((response) => {
        const { data } = response;
        data.chartData.stepLinSpaces.forEach((elem, index) => {
          console.log(
            `elem ${index}: (${elem.balanceInThousands[0]}, ${
              elem.price[0]
            }) - (${elem.balanceInThousands.at(-1)}, ${elem.price.at(-1)})`
          );
        });
        setContext((previousContext) => ({
          ...previousContext,
          chart: data.chartData as { [key: string]: number[] },
          stepLinSpaces: data.chartData.stepLinSpaces,
          table: data.stepTable as { [key: string]: number[] },
        }));
      })
      .catch((e) => console.log(e.response));
  }, [
    openingPrice,
    commonsTribute,
    entryTribute,
    exitTribute,
    reserveBalance,
    JSON.stringify(stepList),
    initialBuy,
    ragequitPercentage,
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
