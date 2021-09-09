import React from 'react';

interface TooltipProps {
  children: React.ReactNode;
  isHovered: boolean;
  text: string;
}

function Tooltip({ children, isHovered, text }: TooltipProps) {
  return (
    <div className="relative flex">
      {children}
      <div
        style={{ display: isHovered ? '' : 'none' }}
        className=" absolute left-1/2 text-center bg-black rounded transform -translate-x-2/4 px-5 py-2.5 shadow-2xl tooltip z-10"
      >
        <span className="absolute border-8 border-t-0 border-transparent -bottom-2 triangle" />
        <span className="font-inter text-xs text-gray-300">{text}</span>
      </div>
    </div>
  );
}

export default Tooltip;
