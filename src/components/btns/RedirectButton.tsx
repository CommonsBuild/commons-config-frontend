import Link from 'next/link';

interface RedirectButtonProps {
  href: string;
}

function RedirectButton({ href }: RedirectButtonProps) {
  return (
    <Link href={href}>
      <a className="font-bj font-bold text-xs text-neon uppercase py-2">
        confused?
      </a>
    </Link>
  );
}

export default RedirectButton;
