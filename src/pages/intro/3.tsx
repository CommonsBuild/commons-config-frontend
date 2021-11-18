import type { ReactElement } from 'react';
import Image from 'next/image';

import Intro from '@/templates/Intro';

function IntroThreeDialog() {
  return (
    <>
      <p className="font-inter text-base text-neon-light p-4">
        Tao Voting (TV) is the voting process by which the Commons can modify
        its economic and governance settings post-upgrade.
      </p>
      <p className="font-inter text-base text-neon-light p-4">
        In this module you will need to define the voting requirements for any
        proposal to alter the Commons configuration.
      </p>
      <p className="font-inter text-base text-neon-light p-4">
        <b>You decide:</b>
        <li>Legacy Dandelion Voting settings</li>
        <li>The amount of time Delegates are allowed to vote</li>
        <li>How long to listen for a change of outcome</li>
        <li>The amount of time that can be added for voting</li>
      </p>
      <div className="absolute -top-full right-6/10 -rotate-15 -z-1">
        <Image
          src="/animation_modal.png"
          height="1372"
          width="1485"
          layout="fixed"
        />
      </div>
    </>
  );
}

function IntroThree() {
  return (
    <>
      <h3 className="text-bj font-bold text-4xl">Modifying the Commons</h3>
      <div className="font-inter md:pr-48">
        <br />
        <p>How to alter the Commons Configuration post-launch.</p>
        <br />
        <p className="font-bold leading-loose">You decide:</p>
        <ul className="list-disc list-inside">
          <li>Legacy Dandelion Voting settings</li>
          <li>The amount of time Delegates are allowed to vote</li>
          <li>How long to listen for a change of outcome</li>
          <li>The amount of time that can be added for voting</li>
        </ul>
      </div>
    </>
  );
}

IntroThree.getLayout = function getLayout(page: ReactElement) {
  return (
    <Intro
      dialogContent={<IntroThreeDialog />}
      dialogTitle="Tao Voting"
      nextHref="/intro/4"
      title="Intro 3 | Commons Dashboard"
    >
      {page}
    </Intro>
  );
};

export default IntroThree;
