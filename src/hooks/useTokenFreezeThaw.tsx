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

type TokenFreezeThawContextType = {
  chart: { [key: string]: number[] };
  table: { [key: string]: number[] };
  setContext: Dispatch<SetStateAction<TokenFreezeThawContextType>>;
};

const initialContext: TokenFreezeThawContextType = {
  chart: {},
  table: {},
  setContext: (): void => {
    throw new Error('setContext must be overridden');
  },
};

const TokenFreezeThawContext =
  createContext<TokenFreezeThawContextType>(initialContext);

interface AppTokenFreezeThawContextProps {
  children: React.ReactNode;
}

function TokenFreezeThawProvider({ children }: AppTokenFreezeThawContextProps) {
  const [params, setContext] =
    useState<TokenFreezeThawContextType>(initialContext);
  const { openingPrice, tokenFreeze, tokenThaw } = useParams();

  useEffect(() => {
    const typeTimeOut = setTimeout(() => {
      api
        .post('/token-lockup/', {
          openingPrice,
          tokenFreeze,
          tokenThaw,
        })
        .then((response) => {
          const { output } = response.data;
          console.log(output);
          setContext({ ...output });
        })
        .catch((e) => console.log(e));
    }, 500);
    return () => clearTimeout(typeTimeOut);
  }, [openingPrice, tokenFreeze, tokenThaw]);

  return (
    <TokenFreezeThawContext.Provider value={{ ...params }}>
      {children}
    </TokenFreezeThawContext.Provider>
  );
}

function useTokenFreezeThaw() {
  const context = useContext(TokenFreezeThawContext);

  return context;
}

export { TokenFreezeThawContext, TokenFreezeThawProvider, useTokenFreezeThaw };
