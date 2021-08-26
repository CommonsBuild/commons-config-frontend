import Head from 'next/head';

import { CustomNavbar as Navbar } from '@/components/Navbar';
import GradientTitle from '@/components/GradientTitle';

function IntroDone() {
  return (
    <>
      <Head>
        <title>Intro Done | Commons Dashboard</title>
      </Head>
      <Navbar href="" />
      <div className="min-h-screen bg-black-one">
        <div className="flex container mx-auto px-4 py-8 justify-center text-center text-white">
          <div className="max-w-screen-lg">
            <GradientTitle>
              It&apos;s <span className="text-white underline">important</span>{' '}
              to deeply understand your decisions
            </GradientTitle>
            <p className="font-inter font-normal text-xl text-white mt-6">
              In order to make good decisions you should understand the impact
              of your choices for the various parameters that comprise the
              economy and governance of the Commons we’re launching.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default IntroDone;
