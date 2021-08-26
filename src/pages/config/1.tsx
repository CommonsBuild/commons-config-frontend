import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

import Card from '@/components/Card';
import Input from '@/components/Input';
import { ConfigNavbar as Navbar } from '@/components/Navbar';
import LineChart from '@/components/LineChart';

type ParamsOptionsType = 'OPENING_PRICE' | 'TOKEN_FREEZE' | 'TOKEN_THAW';

interface ParamsValues {
  'opening-price': string;
  'token-freeze': string;
  'token-thaw': string;
}

interface ChartData {
  price: number[];
  week: number[];
}

interface TableData {
  price: number[];
  tokens_released: number[];
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
  const [paramsValue, setParamsValue] = useState<ParamsValues>({
    'opening-price': '1',
    'token-freeze': '50',
    'token-thaw': '5',
  });
  const [chartData, setChartData] = useState<ChartData>({
    price: [],
    week: null,
  });
  const [tableData, setTableData] = useState<TableData>({
    price: [],
    tokens_released: [],
    week: [],
  });

  const [paramSelected, setParamSelected] =
    useState<ParamsOptionsType>('OPENING_PRICE');

  useEffect(() => {
    const values = Object.values(paramsValue);
    const validParams = values.every((elem) => elem !== '');
    if (validParams) {
      axios
        .post(
          'https://test-token-lockup.herokuapp.com/token-lockup/',
          paramsValue
        )
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
            tokens_released: table.tokens_released,
            week: table.week,
          });
        });
    }
  }, [paramsValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const { value } = event.target;

    setParamsValue({
      ...paramsValue,
      [name]: value,
    });
  };

  return (
    <>
      <Head>
        <title>Config 1 | Commons Dashboard</title>
      </Head>
      <div className="lg:min-h-screen bg-dash bg-cover">
        <Navbar />
        <div className="lg:flex">
          <Card
            title="token freeze & token thaw"
            nextPanel="Modifying the Commons"
            nextHref="/config/3"
          >
            <Input
              name="opening-price"
              value={paramsValue['opening-price']}
              param="Opening Price"
              placeholder="wxDAI"
              changeParam={() => setParamSelected('OPENING_PRICE')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(event)
              }
              tooltipText="The Opening Price is the price we sell TEC tokens after the Commons Upgrade is complete."
            />
            <Input
              name="token-freeze"
              value={paramsValue['token-freeze']}
              param="Token Freeze"
              placeholder="weeks"
              changeParam={() => setParamSelected('TOKEN_FREEZE')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(event)
              }
              tooltipText="Token Freeze is the duration from the initialization of the Commons which tokens remain fully locked."
            />
            <Input
              name="token-thaw"
              value={paramsValue['token-thaw']}
              param="Token Thaw"
              placeholder="weeks"
              changeParam={() => setParamSelected('TOKEN_THAW')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(event)
              }
              tooltipText="Token Thaw is designed to guarantee, for a certain period, the minimum possible price of the token, or price floor."
            />
          </Card>
          <div className="flex flex-col bg-transparent w-10/12 mx-auto mt-4 lg:w-7/12">
            <h1 className="font-bj text-gray-100 text-2xl text-center px-9 pt-6 pb-3 lg:text-left">
              {paramsContent[paramSelected].question}
            </h1>
            <h3 className="font-inter text-gray-300 text-center text-xs px-9 pb-6 lg:text-left">
              {paramsContent[paramSelected].description}
            </h3>
            <LineChart price={chartData.price} week={chartData.week} />
            <div className="min-w-full px-9 pt-2 pb-2 font-bj text-neon-light text-xs">
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
                    {Number(tableData.tokens_released[index].toFixed(2)) * 100}%
                  </div>
                  <div className="w-1/3 max-w-144">{elem.toFixed(2)} wxDAI</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
