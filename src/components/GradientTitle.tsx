import { ReactNode } from 'react';

interface GradientTitleProps {
  children: ReactNode;
  extraLargeText?: boolean;
}

function GradientTitle({ children, extraLargeText }: GradientTitleProps) {
  return (
    <h2
      className={`font-bj font-bold uppercase mt-8 lg:mt-16 ${
        extraLargeText ? 'text-6xl md:text-9xl' : 'text-3xl md:text-6xl'
      }
      `}
    >
      <span className="text-transparent leading-tight bg-clip-text bg-gradient-to-br from-cyan to-neon">
        {children}
      </span>
    </h2>
  );
}

export default GradientTitle;
