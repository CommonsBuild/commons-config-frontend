import Head from 'next/head';

import Checkbox from '@/components/Chekbox';
import { CustomNavbar as Navbar } from '@/components/Navbar';
import NeonButton from '@/components/NeonButton';

function LearnTwo() {
  return (
    <>
      <Head>
        <title>Learn 2 | Commons Dashboard</title>
      </Head>
      <div className="min-h-screen bg-300">
        <Navbar
          href="/learn/done"
          text="finish learning"
          transparentBackground
        />
        <div className="container grid grid-cols-1 lg:grid-cols-4 lg:gap-24 mx-auto px-4 py-8">
          <img
            className="mb-4 lg:mt-16"
            src="/assets/learn-side-title.svg"
            alt="Getting familiar with the Commons configuration"
          />
          <div className="col-span-2 text-white">
            <h3 className="text-bj font-bold text-3xl">
              The Augmented Bonding Curve (ABC)
            </h3>
            <div className="font-inter">
              <br />
              <p className="text-lg">
                The Augmented Bonding Curve (ABC) is the main economic engine by
                which we will provide a constant flow of funding to the Commons’
                Initiatives. In this module you’ll be tasked to design an ABC
                which will be the primary market where TEC tokens are bought and
                sold.
              </p>
              <br />
              <p>
                The magic of the Augmented Bonding Curve is that whenever a buy
                or sell order takes place on its market a percentage is sent
                directly to the funding pool. The percentage taken immediately
                in wxDAI from buy orders to the curve is the
                <strong>Entry Tribute</strong>. Conversely, the percentage taken
                from sell orders is the <strong>Exit Tribute</strong>. This
                means that for every action on the curve the Commons receives
                funding to advance Token Engineering.
              </p>
              <br />
              <p>The ABC funds two pools:</p>
              <br />
              <p>
                The Common Pool holds funds that will be used for realizing the
                initiatives of the TEC.
              </p>
              <br />
              <p>
                The Reserve backs the value of TEC tokens as they are bought and
                sold on the ABC. When tokens are bought on the curve the price
                of TEC goes up, when it is sold the price goes down.
              </p>
              <br />
              <p>
                During the Commons Upgrade a percentage of the total funds
                raised from the Hatch is sent to the Common Pool to kick-start
                the Commons’ projects. This percentage is the
                <strong>Commons Tribute</strong>.
              </p>
              <br />
              <p className="font-bold leading-loose">You decide:</p>
              <ul className="list-disc list-inside">
                <li>What percent of hatch funds will go to each pool</li>
                <li>The tribute taken from buy and sell orders</li>
              </ul>
              <p className="font-bj font-bold text-lg my-6">
                If you need more information please check the links below:
              </p>
              <a
                href="https://forum.tecommons.org/t/augmented-bonding-curve-entry-exit-tribute/494"
                target="_blank"
                rel="noreferrer"
                className="block font-bj font-bold text-neon leading-loose"
              >
                Entry Tribute & Exit Tribute
              </a>
              <a
                href="https://forum.tecommons.org/t/augmented-bonding-curve-commons-tribute/517/2"
                target="_blank"
                rel="noreferrer"
                className="block font-bj font-bold text-neon leading-loose"
              >
                Commons Tribute
              </a>
              <a
                href="https://forum.tecommons.org/t/augmented-bonding-curve-opening-price-reserve-ratio/516/2"
                target="_blank"
                rel="noreferrer"
                className="block font-bj font-bold text-neon leading-loose"
              >
                Opening Price & Reserve Ratio
              </a>
              <div className="mt-6">
                <Checkbox text="I understood everything and I’m able to configure the parameters" />
              </div>
            </div>
          </div>
          <NeonButton href="/learn/3">
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

export default LearnTwo;
