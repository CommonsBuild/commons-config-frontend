import Head from 'next/head';

import Checkbox from '@/components/Chekbox';
import { CustomNavbar as Navbar } from '@/components/Navbar';
import NeonButton from '@/components/NeonButton';

function LearnFour() {
  return (
    <>
      <Head>
        <title>Learn 4 | Commons Dashboard</title>
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
              Disputable Conviction Voting
            </h3>
            <div className="font-inter">
              <br />
              <p className="text-lg">
                Disputable Conviction Voting is the governance system in which
                Commons Members create proposals to request funds from the
                Common Pool.
              </p>
              <br />
              <p>
                TEC tokens can be staked on these proposals to signal approval
                of the request. Staked tokens accrue voting power, or
                Conviction, continuously over time. The amount of tokens
                currently voting on all proposals in Disputable Conviction
                Voting is represented by the term Effective Supply. The
                logarithmic function that decides the rate at which Conviction
                accumulates is Conviction Growth.
              </p>
              <br />
              <p>
                This is the real power behind the TEC token. TEC holders have a
                direct impact on funding Token Engineering by reviewing projects
                and voting on which initiatives get funded and how much funding
                they receive.
              </p>
              <br />
              <p>
                The Spending Limit sets the maximum percentage of the Common
                Pool funds that can be requested by a single proposal. The
                Minimum Conviction dictates how many TEC tokens are needed to
                pass a proposal, no matter how small the amount requested.
              </p>
              <br />
              <p className="font-bold leading-loose">You decide:</p>
              <ul className="list-disc list-inside">
                <li>
                  How much of the Common Pool’s funds can be requested in a
                  single proposal
                </li>
                <li>How many tokens are needed to pass a proposal</li>
                <li>The rate at which conviction accumulates</li>
              </ul>
              <p className="font-bj font-bold text-lg my-6">
                If you need more information please check the links below:
              </p>
              <a
                href="https://forum.tecommons.org/t/disputable-conviction-voting-conviction-growth-aka-half-life/490"
                target="_blank"
                rel="noreferrer"
                className="block font-bj font-bold text-neon leading-loose"
              >
                Conviction Growth
              </a>
              <a
                href="https://forum.tecommons.org/t/disputable-conviction-voting-spending-limit-aka-max-ratio-beta/469"
                target="_blank"
                rel="noreferrer"
                className="block font-bj font-bold text-neon leading-loose"
              >
                Spending Limit
              </a>
              <a
                href="https://forum.tecommons.org/t/disputable-conviction-voting-minimum-conviction-aka-minimum-threshold/493"
                target="_blank"
                rel="noreferrer"
                className="block font-bj font-bold text-neon leading-loose"
              >
                Minimum Conviction
              </a>
              <a
                href="https://forum.1hive.org/t/celeste-a-brief-primer/1483"
                target="_blank"
                rel="noreferrer"
                className="block font-bj font-bold text-neon leading-loose"
              >
                Disputing and Celeste
              </a>
              <div className="mt-6">
                <Checkbox text="I understood everything and I’m able to configure the parameters" />
              </div>
            </div>
          </div>
          <NeonButton href="/learn/done">
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

export default LearnFour;
