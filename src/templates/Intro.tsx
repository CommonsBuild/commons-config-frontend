import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

import { CustomNavbar as Navbar } from '@/components/Navbar';
import NeonButton from '@/components/NeonButton';

interface IntroProps {
  children: ReactNode;
  nextHref: string;
  title: string;
}

const introFade: Variants = {
  animate: {
    opacity: 1,
    transition: { ease: 'easeInOut', duration: 0.6 },
  },
  initial: {
    opacity: 0.75,
    transition: { ease: 'easeInOut', duration: 0.6 },
  },
  exit: {
    opacity: 0,
    transition: { ease: 'easeInOut', duration: 0.6 },
  },
};

const sections = [
  {
    slug: 1,
    subtitle: 'module',
  },
  {
    slug: 2,
    subtitle: 'module',
  },
  {
    slug: 3,
    subtitle: 'module',
  },
  {
    slug: 4,
    subtitle: 'module',
  },
];

function Intro({ children, title, nextHref }: IntroProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar href="/config/1" text="go to configuration" />
      <div className="min-h-screen bg-black-300">
        <div className="container grid grid-cols-1 lg:grid-cols-4 lg:gap-24 mx-auto px-4 py-8">
          <img
            className="mb-6 lg:mt-16"
            src="/assets/intro-side-title.svg"
            alt="Decide how you want your token economy to function"
          />
          <div className="col-span-2 text-white">
            <nav className="font-bj lg:mb-16">
              <ul className="flex gap-16">
                {sections.map(({ slug, subtitle }) => (
                  <Link href={`/intro/${slug}`}>
                    <li
                      className={`cursor-pointer text-gray-50 text-8xl ${
                        router.pathname !== `/intro/${slug}`
                          ? 'text-opacity-20'
                          : ''
                      }`}
                    >
                      {slug}
                      <div
                        className={`text-base ml-4 w-18 break-words ${
                          router.pathname === `/intro/${slug}`
                            ? 'inline-block'
                            : 'hidden'
                        }`}
                      >
                        {subtitle}
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </nav>
            <motion.div
              exit="exit"
              animate="animate"
              initial="initial"
              variants={introFade}
            >
              {children}
            </motion.div>
          </div>
          <NeonButton href={nextHref}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mx-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </NeonButton>
        </div>
      </div>
    </>
  );
}

export default Intro;
