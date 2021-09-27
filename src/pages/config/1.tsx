import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Input from '@/components/Input';
import {
  Card,
  ChartContainer,
  ConfigNavbar as Navbar,
} from '@/components/_global';
import { RedirectButton } from '@/components/btns';
import { TokenFreezeThawChart } from '@/components/charts';
import { useParams, useTokenFreezeThaw } from '@/hooks';
import { TokenFreezeThawTable } from '@/components/tables';

type ParamsOptionsType = 'OPENING_PRICE' | 'TOKEN_FREEZE' | 'TOKEN_THAW';

const paramsContent = {
  OPENING_PRICE: {
    question: 'What price should we set the TEC token at launch?',
    description:
      'The Opening Price is the price we sell TEC tokens after Commons Upgrade is complete.',
  },
  TOKEN_FREEZE: {
    question:
      "How long should the Hatcher's TEC tokens be frozen to maintain the price floor?",
    description:
      'Token Freeze is the duration from the initialization of the Commons which tokens remain fully locked.',
  },
  TOKEN_THAW: {
    question:
      'How long should it take for 100% of the Hatcher’s TEC tokens to be released?',
    description:
      'Token Thaw is designed to guarantee, for a certain period, the minimum possible price of the token or, price floor.',
  },
};

function TokenFreezeThaw() {
  const { chart, table } = useTokenFreezeThaw();
  const {
    openingPrice,
    tokenFreeze,
    tokenThaw,
    submitProposal,
    setParams,
    handleChange,
  } = useParams();
  const [paramSelected, setParamSelected] =
    useState<ParamsOptionsType>('OPENING_PRICE');

  useEffect(() => {
    if ([tokenFreeze, tokenThaw].every((elem) => elem === '')) {
      setParams((previousParams) => ({
        ...previousParams,
        openingPrice: openingPrice || '2',
        tokenFreeze: '30',
        tokenThaw: '10',
      }));
    }
  }, []);

  const inputs = [
    {
      name: 'openingPrice',
      paramName: 'OPENING_PRICE',
      value: openingPrice,
      param: 'Opening Price',
      placeholder: 'wxDAI',
      tooltipText:
        'The Opening Price is the price we sell TEC tokens after the Commons Upgrade is complete.',
    },
    {
      name: 'tokenFreeze',
      paramName: 'TOKEN_FREEZE',
      value: tokenFreeze,
      param: 'Token Freeze',
      placeholder: 'weeks',
      tooltipText:
        'Token Freeze is the duration from the initialization of the Commons which tokens remain fully locked.',
    },
    {
      name: 'tokenThaw',
      paramName: 'TOKEN_THAW',
      value: tokenThaw,
      param: 'Token Thaw',
      placeholder: 'weeks',
      tooltipText:
        'TToken Thaw is designed to guarantee, for a certain period, the minimum possible price of the token, or price floor.',
    },
  ];

  return (
    <>
      <Head>
        <title>Config 1 | Commons Dashboard</title>
      </Head>
      <div className="lg:min-h-screen bg-dash bg-cover">
        <Navbar />
        <div className="flex justify-center">
          <Card
            title="token freeze & token thaw"
            nextHref="/config/2"
            nextPanel="Modifying the Commons"
            submitProposal={!submitProposal}
          >
            {inputs.map((input) => (
              <Input
                key={input.name}
                name={input.name}
                value={input.value}
                param={input.param}
                changeParam={() =>
                  setParamSelected(input.paramName as ParamsOptionsType)
                }
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(event)
                }
                placeholder={input.placeholder}
                tooltipText={input.tooltipText}
              />
            ))}
            <RedirectButton href="/learn/1" />
          </Card>
          <ChartContainer
            title={paramsContent[paramSelected].question}
            subtitle={paramsContent[paramSelected].description}
          >
            <TokenFreezeThawChart price={chart.price} week={chart.week} />
            <TokenFreezeThawTable table={table} />
          </ChartContainer>
        </div>
      </div>
    </>
  );
}

export default TokenFreezeThaw;
