import { ReactNode } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

interface NeonButtonProps {
  children: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  hidden?: boolean;
  onClick?: () => void;
}

function NeonButton({
  disabled,
  hidden,
  fullWidth,
  href = '',
  children,
  onClick,
}: NeonButtonProps) {
  return (
    <Link href={href}>
      <button
        className={classnames(
          'h-14 px-6 mx-auto bg-neon hover:bg-neon-light-600 disabled:opacity-50 disabled:bg-gray-400 disabled:text-gray-300',
          {
            'w-full': fullWidth,
            hidden,
          }
        )}
        disabled={disabled}
        onClick={onClick}
      >
        <span className="font-bj font-bold text-lg uppercase cursor-pointer">
          {children}
        </span>
      </button>
    </Link>
  );
}

export default NeonButton;
