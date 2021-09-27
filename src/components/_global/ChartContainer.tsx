import React from 'react';

interface ChartContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

function ChartContainer({ children, title, subtitle }: ChartContainerProps) {
  return (
    <div className="flex flex-col bg-transparent mx-16 mt-4 w-3/5 lg:min-w-2/4">
      <h1 className="font-bj text-gray-100 text-2xl text-center pt-6 pb-3 lg:text-left">
        {title}
      </h1>
      <h3 className="font-inter text-gray-300 text-center text-xs pb-6 lg:text-left">
        {subtitle}
      </h3>
      {children}
    </div>
  );
}

export default ChartContainer;
