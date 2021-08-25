import { ReactNode } from 'react';

interface BorderedTextProps {
  children: ReactNode;
}

function BorderedText({ children }: BorderedTextProps) {
  return (
    <div className="font-bj font-bold text-8xl text-stroke uppercase text-transparent">
      {children}
    </div>
  );
}

export default BorderedText;
