import { useState } from 'react';
import Head from 'next/head';

import { CustomNavbar as Navbar } from '@/components/Navbar';
import NeonButton from '@/components/NeonButton';
import Dialog from '@/components/Dialog';

function IntroOne() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDialog = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Head>
        <title>Intro 1 | Commons Dashboard</title>
      </Head>
      <Navbar href="/config/1" text="go to configuration" />
      <div className="min-h-screen bg-black-one">
        <Dialog title="The Augmented Bonding Curve (ABC)" isOpen={isOpen}>
          <div style={{ maxWidth: '350px' }} className="py-8 m-auto" />
          <button
            className="flex m-auto uppercase font-bj font-bold text-neon text-xs pt-6"
            onClick={() => handleDialog()}
          >
            close
          </button>
        </Dialog>
        <div className="container grid grid-cols-1 lg:grid-cols-4 lg:gap-24 mx-auto px-4 py-8">
          <img
            className="mb-6 lg:mt-16"
            src="/assets/intro-side-title.svg"
            alt="Decide how you want your token economy to function"
          />
          <div className="col-span-2 text-white">
            <h3 className="text-bj font-bold text-4xl">
              Transitioning from the Hatch
            </h3>
            <div className="font-inter md:pr-48">
              <br />
              <p>
                Determining the initial value of the TEC token and the impact of
                Hatchers on the Commons.
              </p>
              <br />
              <p className="font-bold leading-loose">You decide:</p>
              <ul className="list-disc list-inside">
                <li>How long to keep tokens frozen</li>
                <li>The rate at which tokens become liquid</li>
                <li>The opening price of the TEC token</li>
              </ul>
              <a
                onClick={() => handleDialog()}
                className="block font-bj font-bold text-sm text-neon uppercase my-6"
              >
                learn more
              </a>
            </div>
          </div>
          <NeonButton href="/intro/2">
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

export default IntroOne;
