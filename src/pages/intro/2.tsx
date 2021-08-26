import Head from 'next/head';

import { CustomNavbar as Navbar } from '@/components/Navbar';
import NeonButton from '@/components/NeonButton';

function IntroTwo() {
  return (
    <>
      <Head>
        <title>Intro 2 | Commons Dashboard</title>
      </Head>
      <Navbar href="/config/1" text="go to configuration" />
      <div className="min-h-screen bg-black-one">
        <div className="container grid grid-cols-1 lg:grid-cols-4 lg:gap-24 mx-auto px-4 py-8">
          <img
            className="mb-6 lg:mt-16"
            src="/assets/intro-side-title.svg"
            alt="Decide how you want your token economy to function"
          />
          <div className="col-span-2 text-white">
            <h3 className="text-bj font-bold text-4xl">The Economic Engine</h3>
            <div className="font-inter md:pr-48">
              <br />
              <p>
                Construct the funding system for the TEC and the primary market
                for TEC tokens.
              </p>
              <br />
              <p className="font-bold leading-loose">You decide:</p>
              <ul className="list-disc list-inside">
                <li>
                  What percent of hatch funds will go to funding Token
                  Engineering
                </li>
                <li>The tribute taken from buy and sell orders</li>
              </ul>
              <a
                href="#"
                target="_blank"
                className="block font-bj font-bold text-sm text-neon uppercase my-6"
              >
                learn more
              </a>
            </div>
          </div>
          <NeonButton href="/intro/3">Next</NeonButton>
        </div>
      </div>
    </>
  );
}

export default IntroTwo;
