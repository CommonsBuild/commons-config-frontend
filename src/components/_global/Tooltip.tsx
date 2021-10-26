import React from 'react';
import classnames from 'classnames';

const tooltipPosition = {
  top: 'tooltip-top',
  right: 'tooltip-right',
  bottom: 'tooltip-bottom',
  left: 'tooltip-left',
};

const trianglePosition = {
  top: 'triangle-top',
  right: 'triangle-right',
  bottom: 'triangle-bottom',
  left: 'triangle-left',
};

type Position = 'top' | 'right' | 'bottom' | 'left';

interface TooltipProps {
  children: React.ReactNode;
  isHovered: boolean;
  text: string | React.ReactNode;
  position?: Position;
}

function Tooltip({
  children,
  isHovered,
  position = 'top',
  text,
}: TooltipProps) {
  return (
    <>
      {text ? (
        <div className="relative flex">
          {children}
          <div
            className={classnames(
              'font-inter font-normal text-xs text-gray-300 text-center normal-case absolute bg-black rounded px-5 py-2.5 shadow-xl left-1/2 z-50',
              tooltipPosition[position],
              {
                hidden: !isHovered,
              }
            )}
          >
            <span
              className={classnames(
                'absolute border-8 border-t-0 border-transparent -bottom-2 ',
                trianglePosition[position]
              )}
            />
            {text}
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default Tooltip;
