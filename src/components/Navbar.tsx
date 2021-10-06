import React from 'react';
import Link from 'next/link';
import classnames from 'classnames';

interface NavbarProps {
  children?: React.ReactNode;
  transparentBackground?: boolean;
}

interface CustomNavbarProps {
  text?: string;
  href?: string;
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

function Navbar({ children, transparentBackground }: NavbarProps) {
  return (
    <div
      className={classnames('flex items-center sticky top-0 z-40', {
        'bg-black': !transparentBackground,
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
  transparentBackground,
}: CustomNavbarProps) {
  return (
    <Navbar transparentBackground={transparentBackground}>
      <Link href={href}>
        <button className="flex ml-auto uppercase font-bj font-bold text-neon text-xs pt-6">
          {text}
        </button>
      </Link>
    </Navbar>
  );
}

function ConfigNavbar() {
  return (
    <Navbar>
      <div className="hidden lg:flex">
        {configModules.map(({ id, title, href }) => (
          <Link href={href} key={id}>
            <div className="flex items-center mx-4 font-bj text-white cursor-pointer">
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
