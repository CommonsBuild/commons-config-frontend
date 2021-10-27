import React from 'react';
import Head from 'next/head';
import Input from '@/components/Input';
import { Card, ChartContainer } from '@/components/_global';
import { RedirectButton } from '@/components/btns';
import { TokenFreezeThawChart } from '@/components/charts';
import { useParams, useTokenFreezeThaw } from '@/hooks';
import { TokenFreezeThawTable } from '@/components/tables';

function TokenFreezeThaw() {
  const { chart, table } = useTokenFreezeThaw();
  const { openingPrice, tokenFreeze, tokenThaw, submitProposal, handleChange } =
    useParams();

  const inputs = [
    {
      name: 'openingPrice',
      paramName: 'OPENING_PRICE',
      value: openingPrice,
      param: 'Opening Price',
      link: 'https://forum.tecommons.org/t/augmented-bonding-curve-opening-price-reserve-ratio/516',
      placeholder: 'wxDAI',
      tooltipText:
        'The Opening Price is the price we sell TEC tokens after the Commons Upgrade is complete.',
    },
    {
      name: 'tokenFreeze',
      paramName: 'TOKEN_FREEZE',
      value: tokenFreeze,
      param: 'Token Freeze',
      link: 'https://forum.tecommons.org/t/token-freeze-token-thaw/509',
      placeholder: 'weeks',
      tooltipText:
        'Token Freeze is the duration from the initialization of the Commons which tokens remain fully locked.',
    },
    {
      name: 'tokenThaw',
      paramName: 'TOKEN_THAW',
      value: tokenThaw,
      param: 'Token Thaw',
      link: 'https://forum.tecommons.org/t/token-freeze-token-thaw/509',
      placeholder: 'weeks',
      tooltipText:
        'Token Thaw is the duration after the Token Freeze where TEC tokens gradually thaw, allowing them to become tradeable.',
    },
  ];

  return (
    <>
      <Head>
        <title>Config 1 | Commons Dashboard</title>
      </Head>
      <div className="min-h-screen h-full bg-dash bg-cover">
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
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(event)
                }
                placeholder={input.placeholder}
                tooltipText={input.tooltipText}
                link={input.link}
              />
            ))}
            <RedirectButton href="/learn/1" />
          </Card>
          <ChartContainer title="Analyze how the price floor of the TEC token reacts with changes made to parameters in this module.">
            <TokenFreezeThawChart price={chart?.price} week={chart?.week} />
            <TokenFreezeThawTable table={table} />
          </ChartContainer>
        </div>
      </div>
    </>
  );
}

export default TokenFreezeThaw;
