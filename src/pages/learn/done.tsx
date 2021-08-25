import Head from 'next/head';

import { Navbar } from '@/components/Navbar';
import NeonButton from '@/components/NeonButton';

function LearnDone() {
  return (
    <>
      <Head>
        <title>Learn Done | Commons Dashboard</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 bg-black-one bg-learn bg-no-repeat bg-left-bottom bg-blend-hard-light	text-center">
          <div className="container mx-auto flex flex-col items-center gap-12">
            <h2 className="font-bj text-6xl md:text-9xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-br from-neon to-cyan mt-8 lg:mt-16">
              PREPARE FOR THE LAUNCH!
            </h2>
            <p className="font-inter font-normal text-3xl text-white max-w-screen-md">
              Now you should be equipped with the knowledge to take the reins
              and design your Commons. Continue to the Configuration to begin
              setting your parameters.
            </p>
            <p className="text-white">
              If you want more info head on over to{' '}
              <a className="text-neon">the forum</a> for in depth explanations
              for each parameter.
            </p>
            <NeonButton href="/config/1">GO TO THE CONFIGURATION</NeonButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default LearnDone;
