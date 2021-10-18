import Head from 'next/head';

import BorderedText from '@/components/BorderedText';
import { Navbar, Tooltip } from '@/components/_global';
import { NeonButton } from '@/components/btns';
import { useHover } from '@/hooks';

function Home() {
  const [hatchRef, hatchIsHovered] = useHover<HTMLDivElement>();
  const [upgradeRef, upgradeIsHovered] = useHover<HTMLDivElement>();
  const [launchRef, launchIsHovered] = useHover<HTMLDivElement>();

  return (
    <>
      <Head>
        <title>Commons Config Dashboard</title>
      </Head>
      <div className="bg-lp bg-lp-size h-lp">
        <Navbar transparentBackground sticky={false} />
        <BorderedText>
          <span className="inline-block font-bj font-bold text-5xl text-center leading-relaxed px-12 pt-9 lg:text-8xl">
            the token engineering commons enters the next phase
          </span>
        </BorderedText>
        <div className="font-inter text-neon-light text-xl text-center leading-relaxed w-3/4 mx-auto px-16 pt-8 lg:text-3xl">
          We as community, as a Commons, have accomplished every milestone along
          our path with a holistic and inclusive process.
        </div>
        <div style={{ top: '920px', left: '17%' }} className="absolute">
          <Tooltip
            isHovered={hatchIsHovered}
            text="The Hatch is the incubation phase of the Commons."
          >
            <span
              ref={hatchRef}
              className="font-bj font-medium text-gray text-lg"
            >
              The Hatch
            </span>
          </Tooltip>
        </div>
        <div style={{ top: '1160px', left: '49%' }} className="absolute">
          <div className="bg-blue w-24 py-2 px-4">
            <span className="font-bj font-bold text-xs text-neon-light block text-center">
              We&apos;re here!
            </span>
          </div>
          <Tooltip
            isHovered={upgradeIsHovered}
            text="The Commons upgrade is the process by which the Hatch DAO upgrades into a full Commons."
          >
            <span
              ref={upgradeRef}
              className="font-bj font-medium text-gray text-lg block pt-2"
            >
              Commons upgrade
            </span>
          </Tooltip>
        </div>
        <div style={{ top: '1425px', left: '68%' }} className="absolute">
          <NeonButton href="/intro">
            <a className="px-24 py-8">What&apos;s next?</a>
          </NeonButton>
        </div>
        <div style={{ top: '1600px', left: '22.5%' }} className="absolute">
          <Tooltip
            isHovered={launchIsHovered}
            text="The Commons Launch implements the Commons Configuration that has been voted and passed by the community."
          >
            <span
              ref={launchRef}
              className="font-bj font-medium text-gray text-lg"
            >
              Launch!
            </span>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

export default Home;
