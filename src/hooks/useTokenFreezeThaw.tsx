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
    axios
      .post('https://commons-config-backend.herokuapp.com/token-lockup/', {
        openingPrice,
        tokenFreeze,
        tokenThaw,
      })
      .then((response) => {
        const { output } = response.data;
        setContext({ ...output });
      })
      .catch((e) => console.log(e));
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
