import type { ReactElement } from 'react';
import { useState } from 'react';
import Image from 'next/image';

import Intro from '@/templates/Intro';
import { Modal } from '@/components/modals/';

interface DialogProps {
  handleClose: () => void;
  isOpen: boolean;
}

function IntroTwoDialog({ handleClose, isOpen }: DialogProps) {
  return (
    <Modal
      handleClose={handleClose}
      isOpen={isOpen}
      title="The Augmented Bonding Curve (ABC)"
    >
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
      <div className="absolute top-4/10 left-0 -rotate-135 -z-1">
        <Image
          src="/animation_modal.png"
          height="1372"
          width="1485"
          layout="fixed"
        />
      </div>
    </Modal>
  );
}

function IntroTwo() {
  return (
    <>
      <h3 className="text-bj font-bold text-4xl">The Economic Engine</h3>
      <div className="font-inter md:pr-48">
        <br />
        <p>
          Construct the funding system for the TEC and the primary market for
          TEC tokens.
        </p>
        <br />
        <p className="font-bold leading-loose">You decide:</p>
        <ul className="list-disc list-inside">
          <li>
            What percent of hatch funds will go to funding Token Engineering
          </li>
          <li>The tribute taken from buy and sell orders</li>
        </ul>
      </div>
    </>
  );
}

IntroTwo.getLayout = function getLayout(page: ReactElement) {
  const [dialog, setDialog] = useState<boolean>(false);

  return (
    <Intro
      dialog={
        <IntroTwoDialog isOpen={dialog} handleClose={() => setDialog(false)} />
      }
      nextHref="/intro/3"
      openDialog={() => setDialog(true)}
      title="Intro 2 | Commons Dashboard"
    >
      {page}
    </Intro>
  );
};

export default IntroTwo;
