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
          <NeonButton href="/intro/2">Next</NeonButton>
        </div>
      </div>
    </>
  );
}

export default IntroOne;
