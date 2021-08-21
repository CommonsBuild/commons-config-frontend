import Card from '@/components/Card';
import ChartLegend from '@/components/ChartLegend';
import HorizontalBarChart from '@/components/HorizontalBarChart';
import Input from '@/components/Input';
import Navbar from '@/components/Navbar';

function DisputableVoting() {
  const chartLegend = [
    { name: 'non-quiet voting period' },
    { name: 'delegated voting period' },
    { name: 'delegated and non-delegated voting' },
    { name: 'quiet voting period' },
    { name: 'quiet ending extension' },
    { name: 'execution delay' },
  ];

  return (
    <div className="lg:min-h-screen bg-dash bg-cover">
      <Navbar />
      <div className="lg:flex">
        <Card
          title="disputable voting"
          nextPanel="Requesting Funds"
          previousPanel="Back"
        >
          <Input name="" value="" param="Support required" placeholder="%" />
          <Input name="" value="" param="Minimum Quorum" placeholder="%" />
          <Input name="" value="" param="Vote duration" placeholder="days" />
          <Input
            name=""
            value=""
            param="Delegated Voting Period"
            placeholder="days"
          />
          <Input
            name=""
            value=""
            param="Quiet Ending Period"
            placeholder="days"
          />
          <Input
            name=""
            value=""
            param="Quiet Ending Extension"
            placeholder="days"
          />
          <Input name="" value="" param="Execution Delay" placeholder="days" />
        </Card>
        <div className="flex flex-col w-10/12 mx-auto mt-4 shadow-2xl lg:w-7/12">
          <h1 className="font-bj text-gray-100 text-2xl text-center px-9 pt-6 pb-3 lg:text-left">
            What percent of yes votes are needed to pass a proposal?
          </h1>
          <HorizontalBarChart />
          <div className="grid grid-rows-3 grid-flow-col text-gray">
            {chartLegend.map((legend) => (
              <ChartLegend name={legend.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisputableVoting;
