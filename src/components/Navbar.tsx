import React from 'react';

interface NavbarProps {
  children?: React.ReactNode;
}

const configModules = [
  {
    id: 1,
    slug: '',
    title: 'TOKEN FREEZE & TOKEN THAW',
  },
  {
    id: 2,
    slug: '',
    title: 'AUGMENTED BONDING CURVE',
  },
  {
    id: 3,
    slug: '',
    title: 'MODIFYING THE COMMONS',
  },
  {
    id: 4,
    slug: '',
    title: 'REQUESTING FUNDS',
  },
];

function Navbar({ children }: NavbarProps) {
  return (
    <div className="flex bg-black items-center">
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

function ConfigNavbar() {
  return (
    <Navbar>
      <div className="hidden lg:flex">
        {configModules.map(({ id, title }) => (
          <div className="flex items-center mx-4 font-bj text-white" key={id}>
            <span className="text-5xl mr-4">{id}</span>
            <h3 className="font-bold text-xs w-28">{title}</h3>
          </div>
        ))}
      </div>
      <button className="font-bj font-bold text-xs text-neon uppercase ml-auto">
        ADVANCED SETTINGS
      </button>
    </Navbar>
  );
}

export { Navbar, ConfigNavbar };
