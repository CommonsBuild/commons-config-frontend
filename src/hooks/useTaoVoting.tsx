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

type TaoVotingContextType = {
  barChart: { [key: string]: { [key: string]: number } };
  pieChart: { [key: string]: number };
  setContext: Dispatch<SetStateAction<TaoVotingContextType>>;
};

const initialContext: TaoVotingContextType = {
  barChart: {},
  pieChart: {},
  setContext: (): void => {
    throw new Error('setContext must be overridden');
  },
};

const TaoVotingContext = createContext<TaoVotingContextType>(initialContext);

interface AppTaoVotingContextProps {
  children: React.ReactNode;
}

function TaoVotingProvider({ children }: AppTaoVotingContextProps) {
  const [params, setContext] = useState<TaoVotingContextType>(initialContext);
  const {
    supportRequired,
    minimumQuorum,
    voteDuration,
    delegatedVotingPeriod,
    quietEndingPeriod,
    quietEndingExtension,
    executionDelay,
  } = useParams();

  useEffect(() => {
    axios
      .post(
        'https://dev-commons-config-backend.herokuapp.com/disputable-voting/',
        {
          supportRequired: Number(supportRequired) / 100,
          minimumQuorum: Number(minimumQuorum) / 100,
          voteDuration,
          delegatedVotingPeriod,
          quietEndingPeriod,
          quietEndingExtension,
          executionDelay,
        }
      )
      .then((response) => {
        const { output } = response.data;
        setContext({ ...output });
      })
      .catch((e) => console.log(e));
  }, [
    supportRequired,
    minimumQuorum,
    voteDuration,
    delegatedVotingPeriod,
    quietEndingPeriod,
    quietEndingExtension,
    executionDelay,
  ]);

  return (
    <TaoVotingContext.Provider value={{ ...params }}>
      {children}
    </TaoVotingContext.Provider>
  );
}

function useTaoVoting() {
  const context = useContext(TaoVotingContext);

  return context;
}

export { TaoVotingContext, TaoVotingProvider, useTaoVoting };
