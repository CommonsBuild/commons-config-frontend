interface ChartLegendProps {
  name: string;
  // bgColor?: string;
}

function ChartLegend({ name }: ChartLegendProps) {
  return (
    <div className="flex p-2 my-2 last:col-start-3">
      <div className="h-4 w-4 bg-neon mx-4" />
      <span className="font-bj font-bold text-neon-light text-xs uppercase">
        {name}
      </span>
    </div>
  );
}

export default ChartLegend;
