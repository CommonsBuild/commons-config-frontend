import Link from 'next/link';

interface RedirectButtonProps {
  href: string;
}

function RedirectButton({ href }: RedirectButtonProps) {
  return (
    <Link legacyBehavior href={href}>
      <a
        target="_blank"
        rel="noreferrer noopener"
        className="font-bj font-bold text-xs text-neon uppercase py-2"
      >
        learn more
      </a>
    </Link>
  );
}

export default RedirectButton;
