import type { ReactElement } from 'react';
import Image from 'next/image';

import Intro from '@/templates/Intro';

function IntroOneDialog() {
  return (
    <>
      <p className="font-inter text-base text-neon-light p-4">
        Instead of the Hatcher’s TEC tokens becoming available at once to sell
        or trade, they are frozen for some time.
      </p>
      <p className="font-inter text-base text-neon-light p-4">
        The Token Freeze is the duration from the initialization of the Commons
        which tokens remain frozen.
      </p>
      <p className="font-inter text-base text-neon-light p-4">
        The next period of time is known as the Token Thaw when tokens slowly
        become liquid.
      </p>
      <p className="font-inter text-base text-neon-light p-4">
        <b>You decide:</b>
        <li>How long to keep tokens frozen</li>
        <li>The rate at which tokens become liquid</li>
        <li>The opening price of the TEC token</li>
      </p>
      <div className="absolute top-0 right-3/10 -rotate-15 -z-1">
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

function IntroOne() {
  return (
    <>
      <h3 className="text-bj font-bold text-4xl">
        Transitioning from the Hatch
      </h3>
      <div className="font-inter md:pr-48">
        <br />
        <p>
          Determining the initial value of the TEC token and the impact of
          Hatchers on the Commons.
        </p>
        <br />
        <p className="font-bold leading-loose">You decide:</p>
        <ul className="list-disc list-inside">
          <li>How long to keep tokens frozen</li>
          <li>The rate at which tokens become liquid</li>
          <li>The opening price of the TEC token</li>
        </ul>
      </div>
    </>
  );
}

IntroOne.getLayout = function getLayout(page: ReactElement) {
  return (
    <Intro
      dialogContent={<IntroOneDialog />}
      dialogTitle="Token Freeze &amp; Token Thaw"
      nextHref="/intro/2"
      title="Intro 1 | Commons Dashboard"
    >
      {page}
    </Intro>
  );
};

export default IntroOne;
