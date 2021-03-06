import Head from 'next/head';
import GradientTitle from '@/components/GradientTitle';
import { CustomNavbar as Navbar } from '@/components/_global';
import { NeonButton } from '@/components/btns';

function LearnDone() {
  return (
    <>
      <Head>
        <title>Learn Done | Commons Dashboard</title>
      </Head>
      <div className="flex flex-col bg-black-300 min-h-screen">
        <Navbar href="/learn/" text="take me back" transparentBackground />
        <div className="flex-1 bg-300 bg-learn bg-no-repeat bg-left-bottom bg-blend-hard-light	text-center">
          <div className="container mx-auto flex flex-col items-center gap-12">
            <GradientTitle extraLargeText>PREPARE FOR LAUNCH!</GradientTitle>
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
