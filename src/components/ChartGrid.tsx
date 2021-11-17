import Image from 'next/image';

function ChartGrid({ chart, id, xAxisLabel, yAxisLabel }) {
  return (
    <div className="bg-black-300" id={id}>
      <div className="grid chart-grid">
        <div className="flex w-max">{yAxisLabel}</div>
        <div className="flex justify-center py-2">
          <div className="w-full">
            <div className="relative h-3/5 chart">
              <Image layout="fill" src="/chart_bg.png" />
            </div>
            <div className="relative bottom-6/10">{chart}</div>
          </div>
        </div>
        <div />
        <div className="justify-self-center">{xAxisLabel}</div>
      </div>
    </div>
  );
}

export default ChartGrid;
