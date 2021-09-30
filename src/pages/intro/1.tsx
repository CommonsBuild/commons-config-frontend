import type { ReactElement } from 'react';
import { useState } from 'react';

import Intro from '@/templates/Intro';
import { Dialog } from '@/components/modals/';

interface DialogProps {
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}

function IntroOneDialog({ handleClose, isOpen }: DialogProps) {
  return (
    <Dialog isOpen={isOpen} title="The Augmented Bonding Curve (ABC)">
      <p className="font-inter text-base text-neon-light p-4">
        The Augmented Bonding Curve (ABC) is the main economic engine by which
        we will provide a constant flow of funding to the Commons Initiatives.
      </p>
      <p className="font-inter text-base text-neon-light p-4">
        In this module you’ll be tasked to design an ABC which will be the
        primary market where TEC tokens are bought and sold.
      </p>
      <p className="font-inter text-base text-neon-light p-4">
        In other words: When you buy or sell (trade) TEC the Commons receives
        funding.
      </p>
      <p className="font-inter text-base text-neon-light p-4">
        <b>You decide:</b>
        <li>What percent of hatch funds will go to funding Token</li>
        <li>Engineering The tribute taken from buy and sell orders</li>
      </p>
      <button
        className="flex m-auto uppercase font-bj font-bold text-neon text-xs py-6"
        onClick={handleClose}
      >
        ok
      </button>
    </Dialog>
  );
}

function IntroOne() {
  const [dialog, setDialog] = useState<boolean>(false);
  return (
    <>
      <IntroOneDialog isOpen={dialog} handleClose={() => setDialog(false)} />
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
        <a
          onClick={() => setDialog(true)}
          className="block font-bj font-bold text-sm text-neon uppercase my-6"
        >
          learn more
        </a>
      </div>
    </>
  );
}

IntroOne.getLayout = function getLayout(page: ReactElement) {
  return (
    <Intro title="Intro 1 | Commons Dashboard" nextHref="/intro/2">
      {page}
    </Intro>
  );
};

export default IntroOne;
