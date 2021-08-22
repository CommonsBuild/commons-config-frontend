import Head from 'next/head';

import Checkbox from '@components/Chekbox';
import { Navbar } from '@components/Navbar';
import NeonButton from '@components/NeonButton';

function LearnOne() {
  return (
    <>
      <Head>
        <title>Learn 1 | Commons Dashboard</title>
      </Head>
      <Navbar />
      <div className="min-h-screen bg-black-one">
        <div className="container grid grid-cols-1 lg:grid-cols-4 lg:gap-24 mx-auto px-4 py-8">
          <img
            className="mb-4 lg:mt-16"
            src="/assets/learn-side-title.svg"
            alt="Getting familiar with the Commons configuration"
          />
          <div className="col-span-2 text-white">
            <h3 className="text-bj font-bold text-3xl">
              Token Freeze & Token Thaw
            </h3>
            <div className="font-inter">
              <br />
              <p className="text-lg">
                Instead of the Hatcher’s TEC tokens becoming available at once
                to sell or trade, they are locked for some time until a linear
                function is implemented to unlock tokens, rendering them liquid
                at a steady trickle.
              </p>
              <br />
              <p>
                The Token Freeze is the duration from the initialization of the
                Commons which tokens remain fully locked, only at the end of the
                Token Freeze do tokens begin to thaw. This next period of time
                is known as the Token Thaw. We use this time for the Commons to
                establish value and start its initiatives. This mechanism is
                designed to guarantee, for a certain period, the minimum
                possible price of the token or, price floor.
              </p>
              <br />
              <p>
                During the Hatch, TECH tokens were minted at a value of 1 wxDAI
                per TECH. At the Commons Upgrade TEC tokens will be given to
                Hatchers at a 1:1 TEC/TECH ratio. The Opening Price is the price
                we sell TEC tokens on the Augmented Bonding Curve after the
                Commons Upgrade is complete.
              </p>
              <br />
              <p>
                Early buyers of TEC tokens will benefit from the price floor in
                that they will be assured its value will never drop below a
                certain threshold at a given time. As tokens begin to thaw the
                price floor descends, linearly, eventually reaching zero when
                100% of the TEC tokens are rendered liquid. This would be the
                end of the Token Thaw period. Ideally, by this time the Commons
                should be well on its way, advancing token engineering, and the
                TEC token having firm value backing it.
              </p>
              <br />
              <p className="font-bold leading-loose">You decide:</p>
              <ul className="list-disc list-inside">
                <li>How long to keep tokens frozen</li>
                <li>The rate at which tokens become liquid</li>
                <li>The opening price of the TEC token</li>
              </ul>
              <p className="font-bj font-bold text-lg my-6">
                If you need more information please check the links below:
              </p>
              <a
                href="#"
                className="block font-bj font-bold text-neon leading-loose"
              >
                Price Floor Dynamics
              </a>
              <a
                href="#"
                className="block font-bj font-bold text-neon leading-loose"
              >
                Token Thaw and Token Freeze
              </a>
              <div className="mt-6">
                <Checkbox text="I understood everything and I’m able to configure the parameters" />
              </div>
            </div>
          </div>
          <NeonButton href="/learn/2">
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

export default LearnOne;