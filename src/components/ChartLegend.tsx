interface ChartLegendProps {
  name: string;
  bgColor?: string;
}

function ChartLegend({ name, bgColor }: ChartLegendProps) {
  return (
    <div className="flex p-2 my-2 last:col-start-3">
      <div className={`h-4 w-4 mx-4 bg-chart-${bgColor}`} />
      {/* <div className="h-4 w-4 mx-4 bg-chart-orange" /> */}
      <span className="font-bj font-bold text-neon-light text-xs uppercase">
        {name}
      </span>
    </div>
  );
}

export default ChartLegend;
