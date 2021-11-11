import type { ReactElement } from 'react';
import { useState } from 'react';
import Image from 'next/image';

import Intro from '@/templates/Intro';
import { Modal } from '@/components/modals/';

interface DialogProps {
  handleClose: () => void;
  isOpen: boolean;
}

function IntroFourDialog({ handleClose, isOpen }: DialogProps) {
  return (
    <Modal handleClose={handleClose} isOpen={isOpen} title="Conviction Voting">
      <p className="font-inter text-base text-neon-light p-4">
        Conviction Voting (CV) is the governance system in which Commons members
        create proposals to request funds from the Common Pool.
      </p>
      <p className="font-inter text-base text-neon-light p-4">
        TEC holders have a direct impact on funding Token Engineering by
        reviewing projects and voting on which initiatives get funded and how
        much funding they receive.
      </p>
      <p className="font-inter text-base text-neon-light p-4">
        <b>You decide:</b>
        <li>
          How much of the Common Pool’s funds can be requested in a single
          proposal
        </li>
        <li>How many tokens are needed to pass a proposal</li>
        <li>The rate at which conviction accumulates</li>
      </p>
      <div className="absolute -top-full left-3/10 -rotate-15 -z-1">
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

function IntroFour() {
  return (
    <>
      <h3 className="text-bj font-bold text-4xl">Requesting Funds</h3>
      <div className="font-inter md:pr-48">
        <br />
        <p>
          Governance architecture to request funds for the Commons’ initiatives.
        </p>
        <br />
        <p className="font-bold leading-loose">You decide:</p>
        <ul className="list-disc list-inside">
          <li>
            How much of the Common Pool’s funds can be requested by a single
            proposal
          </li>
          <li>How many tokens are needed to pass a proposal</li>
          <li>The rate at which conviction accumulates</li>
        </ul>
      </div>
    </>
  );
}

IntroFour.getLayout = function getLayout(page: ReactElement) {
  const [dialog, setDialog] = useState<boolean>(false);

  return (
    <Intro
      dialog={
        <IntroFourDialog isOpen={dialog} handleClose={() => setDialog(false)} />
      }
      nextHref="/intro/done"
      openDialog={() => setDialog(true)}
      title="Intro 4 | Commons Dashboard"
    >
      {page}
    </Intro>
  );
};

export default IntroFour;
