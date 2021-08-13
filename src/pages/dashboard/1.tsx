import { useState } from "react";

import Card from "@/components/Card";
import Input from "@/components/Input";
import Navbar from "@/components/Navbar";
import LineChart from "@/components/LineChart";

type ParamsOptionsType = "OPENING_PRICE" | "TOKEN_FREEZE" | "TOKEN_THAW";

const paramsContent = {
  OPENING_PRICE: {
    question: "What price should we set the TEC token at launch?",
    description:
      "The Opening Price is the price we sell TEC tokens after Commons Upgrade is complete.",
  },
  TOKEN_FREEZE: {
    question:
      "How long should the Hatcher's TEC tokens be frozen to maintain the price floor?",
    description:
      "Token Freeze is the duration from the initiliazation of the Commons which tokens remain fully locked.",
  },
  TOKEN_THAW: {
    question:
      "How long should it take for 100% of the Hatcher’s TEC tokens to be released?",
    description:
      "Token Thaw is designed to guarantee, for a certain period, the minimum possible price of the token or, price floor.",
  },
};

function Dashboard() {
  const [paramSelected, setParamSelected] =
    useState<ParamsOptionsType>("OPENING_PRICE");

  const tableRows = [
    { time: "5", token: "0", price: "2" },
    { time: "10", token: "0", price: "2" },
    { time: "20", token: "40", price: "1.10" },
    { time: "30", token: "60", price: "0.80" },
    { time: "40", token: "80", price: "0.45" },
    { time: "52", token: "100", price: "0,00" },
  ];

  return (
    <div className="lg:min-h-screen bg-dash bg-cover">
      <Navbar />
      <div className="lg:flex">
        <Card title="token freeze & token thaw" nextPanel="The Economic Engine">
          <Input
            name="Opening Price"
            placeholder="wxDAI"
            changeParam={() => setParamSelected("OPENING_PRICE")}
            tooltipText="The Opening Price is the price we sell TEC tokens after the Commons Upgrade is complete."
          />
          <Input
            name="Token Freeze"
            placeholder="weeks"
            changeParam={() => setParamSelected("TOKEN_FREEZE")}
            tooltipText="Token Freeze is the duration from the initialization of the Commons which tokens remain fully locked."
          />
          <Input
            name="Token Thaw"
            placeholder="weeks"
            changeParam={() => setParamSelected("TOKEN_THAW")}
            tooltipText="Token Thaw is designed to guarantee, for a certain period, the minimum possible price of the token, or price floor."
          />
        </Card>
        <div className="flex flex-col bg-transparent w-10/12 mx-auto mt-4 shadow-2xl lg:w-7/12 lg:mt-4">
          <h1 className="font-bj text-gray-100 text-2xl text-center px-9 pt-6 pb-3 lg:text-left">
            {paramsContent[paramSelected].question}
          </h1>
          <h3 className="font-inter text-gray-300 text-center text-xs px-9 pb-6 lg:text-left">
            {paramsContent[paramSelected].description}
          </h3>
          <LineChart />
          <div className="min-w-full px-9 pt-4 pb-2 mt-auto">
            <div className="flex justify-between font-bj font-bold text-gray-100 text-xs uppercase border-b border-gray-100 pb-2 mb-2">
              <div className="w-1/3 max-w-144"># of weeks</div>
              <div className="w-1/3 max-w-144">% tokens released</div>
              <div className="w-1/3 max-w-144">price floor of token</div>
            </div>
            {tableRows.map((row) => (
              <div
                key={row.time}
                className="flex justify-between font-bj text-neon-light text-xs py-1 hover:bg-cyan-700 cursor-pointer"
              >
                <div className="w-1/3 max-w-144">{row.time} weeks</div>
                <div className="w-1/3 max-w-144">{row.token}%</div>
                <div className="w-1/3 max-w-144">{row.price} wxDAI</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
