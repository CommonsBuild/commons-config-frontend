import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classnames from 'classnames';

interface NavbarProps {
  children?: React.ReactNode;
  transparentBackground?: boolean;
  sticky?: boolean;
}

interface CustomNavbarProps {
  text?: string;
  href?: string;
  sticky?: boolean;
  transparentBackground?: boolean;
}

const configModules = [
  {
    id: 1,
    slug: '',
    title: 'TOKEN FREEZE & TOKEN THAW',
    href: '/config/1',
  },
  {
    id: 2,
    slug: '',
    title: 'AUGMENTED BONDING CURVE',
    href: '/config/2',
  },
  {
    id: 3,
    slug: '',
    title: 'MODIFYING THE COMMONS',
    href: '/config/3',
  },
  {
    id: 4,
    slug: '',
    title: 'REQUESTING FUNDS',
    href: '/config/4',
  },
];

function Navbar({
  children,
  sticky = true,
  transparentBackground,
}: NavbarProps) {
  return (
    <div
      className={classnames('flex items-center top-0 z-40', {
        'bg-black': !transparentBackground,
        sticky,
      })}
    >
      <div className="bg-neon px-5 py-10">
        <img src="/assets/tec-logo-light.svg" alt="TEC Logomark" />
      </div>
      <div className="flex flex-1 px-4 md:px-8">
        <img
          className="mr-16"
          src="/assets/tec-text-light.svg"
          alt="Token Engineering Commons"
        />
        {children}
      </div>
    </div>
  );
}

function CustomNavbar({
  href,
  text,
  sticky,
  transparentBackground,
}: CustomNavbarProps) {
  return (
    <Navbar sticky={sticky} transparentBackground={transparentBackground}>
      <Link href={href}>
        <button className="flex ml-auto uppercase font-bj font-bold text-neon text-xs pt-6">
          {text}
        </button>
      </Link>
    </Navbar>
  );
}

function ConfigNavbar() {
  const router = useRouter();

  return (
    <Navbar>
      <div className="hidden lg:flex">
        {configModules.map(({ id, title, href }) => (
          <Link href={href} key={id}>
            <div
              className={`flex items-center mx-4 font-bj cursor-pointer py-10 lg:self-end ${
                router.pathname !== `/config/${id}`
                  ? 'text-gray-500'
                  : 'text-white border-neon border-b-2'
              }`}
            >
              <span className="text-5xl mr-4">{id}</span>
              <h3 className="font-bold text-xs w-28">{title}</h3>
            </div>
          </Link>
        ))}
      </div>
      <Link href="/config/submit">
        <button className="font-bj font-bold text-xs text-neon uppercase ml-auto">
          QUICK CONFIGURATION
        </button>
      </Link>
    </Navbar>
  );
}

export { Navbar, ConfigNavbar, CustomNavbar };
