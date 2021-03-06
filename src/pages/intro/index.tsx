import Head from 'next/head';
import GradientTitle from '@/components/GradientTitle';
import { CustomNavbar as Navbar } from '@/components/_global';
import { NeonButton } from '@/components/btns';

function IntroIndex() {
  return (
    <>
      <Head>
        <title>Intro | Commons Dashboard</title>
      </Head>
      <div className="flex flex-col min-h-screen bg-black-300">
        <Navbar
          href="/config/1"
          text="go to configuration"
          transparentBackground
        />
        <div className="flex-1 bg-300 bg-learn bg-no-repeat bg-left-bottom bg-blend-hard-light	text-center">
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
            <div className="w-48">
              <NeonButton href="/intro/1" fullWidth>
                next
              </NeonButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IntroIndex;
