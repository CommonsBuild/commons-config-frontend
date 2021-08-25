import Head from 'next/head';

import { Navbar } from '@/components/Navbar';
import NeonButton from '@/components/NeonButton';
import GradientTitle from '@/components/GradientTitle';

function IntroIndex() {
  return (
    <>
      <Head>
        <title>Intro | Commons Dashboard</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 bg-black-one bg-learn bg-no-repeat bg-left-bottom bg-blend-hard-light	text-center">
          <div className="container mx-auto flex flex-col items-center gap-12">
            <GradientTitle extraLargeText>
              OUR ECONOMY, OUR CHOICE
            </GradientTitle>
            <p className="font-inter font-normal text-3xl text-white max-w-screen-lg">
              You, as a member of the Commons, can configure each component and{' '}
              <span className="text-neon">
                collaborate on the design of our token economy.
              </span>
            </p>
            <NeonButton href="/intro/1">NEXT</NeonButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default IntroIndex;
