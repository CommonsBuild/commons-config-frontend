import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import ChartContainer from '@/components/ChartContainer';
import Card from '@/components/Card';
import Input from '@/components/Input';
import { ConfigNavbar as Navbar } from '@/components/Navbar';
import LineChart from '@/components/LineChart';
import { useParams } from '@/hooks/useParams';

type ParamsOptionsType = 'OPENING_PRICE' | 'TOKEN_FREEZE' | 'TOKEN_THAW';

interface ChartData {
  price: number[];
  week: number[];
}

interface TableData {
  price: number[];
  tokensReleased: number[];
  week: number[];
}

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

function Dashboard() {
  const [chartData, setChartData] = useState<ChartData>({
    price: [],
    week: null,
  });
  const [tableData, setTableData] = useState<TableData>({
    price: [],
    tokensReleased: [],
    week: [],
  });
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
    if ([openingPrice, tokenFreeze, tokenThaw].every((elem) => elem === '')) {
      setParams((previousParams) => ({
        ...previousParams,
        openingPrice: '2',
        tokenFreeze: '30',
        tokenThaw: '10',
      }));
    }
  }, []);

  useEffect(() => {
    axios
      .post('https://commons-config-backend.herokuapp.com/token-lockup/', {
        openingPrice,
        tokenFreeze,
        tokenThaw,
      })
      .then((response) => {
        const { output } = response.data;
        const { chart } = output;
        const { table } = output;

        setChartData({
          price: chart.price,
          week: chart.week,
        });

        setTableData({
          price: table.price,
          tokensReleased: table.tokensReleased,
          week: table.week,
        });
      })
      .catch((e) => console.log(e));
  }, [openingPrice, tokenFreeze, tokenThaw]);

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
          </Card>
          <ChartContainer
            title={paramsContent[paramSelected].question}
            subtitle={paramsContent[paramSelected].description}
          >
            <LineChart price={chartData.price} week={chartData.week} />
            <div className="pl-16 pt-6 pb-2 font-bj text-neon-light text-xs">
              <div className="flex justify-between pb-2 mb-2 border-b border-gray-100 uppercase font-bold">
                <div className="w-1/3 max-w-144 table-text"># of weeks</div>
                <div className="w-1/3 max-w-144">% tokens released</div>
                <div className="w-1/3 max-w-144">price floor of token</div>
              </div>
              {tableData.price.map((elem, index) => (
                <div
                  key={index}
                  className="flex justify-between py-1 hover:bg-cyan-700 cursor-pointer"
                >
                  <div className="w-1/3 max-w-144">
                    {tableData.week[index]} weeks
                  </div>
                  <div className="w-1/3 max-w-144">
                    {Number(tableData.tokensReleased[index].toFixed(2)) * 100}%
                  </div>
                  <div className="w-1/3 max-w-144">{elem.toFixed(2)} wxDAI</div>
                </div>
              ))}
            </div>
          </ChartContainer>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
