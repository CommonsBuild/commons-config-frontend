import { ReactNode } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

interface NeonButtonProps {
  children: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  href: string;
}

function NeonButton({ disabled, fullWidth, href, children }: NeonButtonProps) {
  return (
    <Link href={href}>
      <button
        disabled={disabled}
        className={classnames(
          'h-14 px-6 mx-auto bg-neon hover:bg-neon-light-600 disabled:opacity-50 disabled:bg-gray-400 disabled:text-gray-300',
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
