import { ReactNode } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

interface NeonButtonProps {
  children: ReactNode;
  fullWidth?: boolean;
  href: string;
}

function NeonButton({ fullWidth, href, children }: NeonButtonProps) {
  return (
    <Link href={href}>
      <button
        className={classnames(
          'px-8 h-16 mx-auto bg-neon hover:bg-neon-light-600 ',
          {
            'w-full': fullWidth,
          }
        )}
      >
        <span className="font-bj font-bold text-lg uppercase">{children}</span>
      </button>
    </Link>
  );
}

export default NeonButton;
