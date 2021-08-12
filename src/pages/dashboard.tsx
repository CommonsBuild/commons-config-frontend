import Image from "next/image";
import Card from "../components/Card";
import Input from "../components/Input";
import Navbar from "../components/Navbar";

function Dashboard() {
  const tableRows = [
    { time: "5", token: "0", price: "2" },
    { time: "10", token: "0", price: "2" },
    { time: "20", token: "40", price: "1.10" },
    { time: "30", token: "60", price: "0.80" },
    { time: "40", token: "80", price: "0.45" },
    { time: "52", token: "100", price: "0,00" },
  ];

  return (
    <div className="lg:min-h-screen bg-black">
      <Navbar />
      <div className="lg:flex lg:my-8">
        <Card title="token freeze & token thaw" nextPanel="The Economic Engine">
          <Input
            name="Opening Price"
            placeholder="wxDAI"
            tooltipText="The Opening Price is the price we sell TEC tokens after the Commons Upgrade is complete."
          />
          <Input
            name="Token Freeze"
            placeholder="weeks"
            tooltipText="Token Freeze is the duration from the initialization of the Commons which tokens remain fully locked."
          />
          <Input
            name="Token Thaw"
            placeholder="weeks"
            tooltipText="Token Thaw is designed to guarantee, for a certain period, the minimum possible price of the token, or price floor."
          />
        </Card>
        <div className="flex flex-col bg-black w-10/12 mx-auto mt-4 shadow-2xl lg:w-7/12">
          <h1 className="font-bj font-bold text-gray-100 text-2xl text-center px-9 pt-6 pb-3 lg:text-left">
            What price should we set the TEC token at launch?
          </h1>
          <h3 className="font-inter font-normal text-gray-300 text-center text-xs px-9 pb-2 lg:text-left">
            The Opening Price is the price we sell TEC tokens after Commons
            Upgrade is complete.
          </h3>
          <div className="max-h-80">chart</div>
          <div className="min-w-full px-9 pt-6 pb-12 mt-auto">
            <div className="flex justify-between font-bj font-bold text-gray-100 text-xs uppercase border-b border-gray-100 pb-2 mb-2">
              <div className="w-1/3 max-w-144"># of tokens</div>
              <div className="w-1/3 max-w-144">% tokens released</div>
              <div className="w-1/3 max-w-144">price floor of token</div>
            </div>
            {tableRows.map((row) => (
              <div
                key={row.time}
                className="flex justify-between font-bj font-normal text-neon-light text-xs py-1 hover:bg-cyan-700 cursor-pointer"
              >
                <div className="w-1/3 max-w-144">{row.time} weeks</div>
                <div className="w-1/3 max-w-144">{row.token}%</div>
                <div className="w-1/3 max-w-144">{row.price} wxDAI</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden lg:inline fixed left-64 -bottom-16">
        <Image src="/purple_ellipse.png" width="108" height="108" />
      </div>
    </div>
  );
}

export default Dashboard;
