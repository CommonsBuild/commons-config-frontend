import { useParams } from '@/hooks';
import classnames from 'classnames';
import { AnimateSharedLayout, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

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
      <div className="flex flex-1 self-stretch px-4 md:px-8">
        <img
          className="mr-16 self-center"
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
        <button className="flex self-center ml-auto uppercase font-bj font-bold text-neon text-xs pt-6">
          {text}
        </button>
      </Link>
    </Navbar>
  );
}

function ConfigNavbar() {
  const router = useRouter();
  const { pathname } = router;
  const { setParams, convictionGrowth } = useParams();

  return (
    <Navbar>
      <div className="hidden lg:flex">
        <AnimateSharedLayout>
          {configModules.map(({ id, title, href }) => (
            <Link href={href} key={id} shallow>
              <div className="flex flex-col justify-center items-center">
                <motion.div
                  initial={false}
                  transition={{
                    duration: 0.2,
                  }}
                  animate={{
                    color: pathname !== `/config/${id}` ? '#595959' : '#FFFFFF',
                  }}
                  className={classnames(
                    'flex items-center mx-4 m-auto font-bj cursor-pointer text-gray-500'
                  )}
                >
                  <span className="text-5xl mr-4">{id}</span>
                  <h3 className="font-bold text-xs w-28">{title}</h3>
                </motion.div>
                {pathname === `/config/${id}` && (
                  <motion.div
                    layoutId="underline"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                    }}
                    className="self-end w-full border-2 border-neon"
                  />
                )}
              </div>
            </Link>
          ))}
        </AnimateSharedLayout>
      </div>
      <Link href="/config/submit">
        <button
          className="self-center font-bj font-bold text-xs text-neon uppercase ml-auto"
          onClick={() =>
            setParams((previousParams) => ({
              ...previousParams,
              convictionGrowth: convictionGrowth || '5',
            }))
          }
        >
          QUICK CONFIGURATION
        </button>
      </Link>
    </Navbar>
  );
}

export { ConfigNavbar, CustomNavbar, Navbar };
