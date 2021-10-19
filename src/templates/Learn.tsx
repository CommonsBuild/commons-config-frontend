/* eslint-disable jsx-a11y/media-has-caption */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { motion, Variants } from 'framer-motion';

import { CustomNavbar as Navbar } from '@/components/_global/Navbar';
import { Checkbox, NeonButton } from '@/components/btns';
import AudioPlayer from '@/components/AudioPlayer';
// import TokenFreezeThawAudio from '../../public/media/tokenFreezeThaw.mp3';

interface LearnProps {
  children: ReactNode;
  nextHref: string;
  title: string;
}

const learnFade: Variants = {
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
    subtitle: 'Token and its value',
  },
  {
    slug: 2,
    subtitle: 'The Ecomonic engine',
  },
  {
    slug: 3,
    subtitle: 'Governing the Commons',
  },
  {
    slug: 4,
    subtitle: 'Projects and funding',
  },
];

const TokenFreezeThawAudio = require('../../public/media/tokenFreezeThaw.mp3');

function Learn({ children, title, nextHref }: LearnProps) {
  const [checked] = useState<boolean>(true);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="min-h-screen bg-black-300">
        <Navbar
          href="/learn/done"
          text="finish learning"
          transparentBackground={false}
        />
        <div className="container grid grid-cols-1 lg:grid-cols-4 lg:gap-24 mx-auto px-4 py-8">
          <img
            className="mb-4 lg:mt-16"
            src="/assets/learn-side-title.svg"
            alt="Getting familiar with the Commons configuration"
          />
          <div className="col-span-2">
            <nav className="font-bj lg:mb-16">
              <ul className="flex gap-16">
                {sections.map(({ slug, subtitle }) => (
                  <Link href={`/learn/${slug}`}>
                    <li
                      className={`cursor-pointer text-gray-50 text-8xl ${
                        router.pathname !== `/learn/${slug}`
                          ? 'text-opacity-20'
                          : ''
                      }`}
                    >
                      {slug}
                      <div
                        className={`text-base ml-4 w-28 break-words ${
                          router.pathname === `/learn/${slug}`
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
              variants={learnFade}
            >
              <div>
                <div className="text-neon-light">Listen to this module</div>
                <div>audio controllers</div>
                <figure>
                  <figcaption>Listen to the T-Rex:</figcaption>
                  <audio autoPlay src={TokenFreezeThawAudio}>
                    <track />
                    Your browser does not support the
                    <code>audio</code> element.
                  </audio>
                </figure>
                <AudioPlayer tracks={[{ audioSrc: TokenFreezeThawAudio }]} />
              </div>
              <div className="text-white">{children}</div>
              <div className="mt-6">
                <Checkbox text="I understood everything and I’m able to configure the parameters" />
              </div>
              <div className="mt-10">
                <NeonButton disabled={!checked} href={nextHref}>
                  next
                </NeonButton>
              </div>
            </motion.div>
          </div>
          <NeonButton disabled={!checked} href={nextHref}>
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

export default Learn;
