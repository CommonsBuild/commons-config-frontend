import type { ReactElement } from 'react';
import { useState } from 'react';

import Intro from '@/templates/Intro';
import { Dialog } from '@/components/modals/';

interface DialogProps {
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}

function IntroThreeDialog({ handleClose, isOpen }: DialogProps) {
  return (
    <Dialog isOpen={isOpen} title="Tao Voting">
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
      <button
        className="flex m-auto uppercase font-bj font-bold text-neon text-xs py-6"
        onClick={handleClose}
      >
        ok
      </button>
    </Dialog>
  );
}

function IntroThree() {
  const [dialog, setDialog] = useState<boolean>(false);
  return (
    <>
      <IntroThreeDialog isOpen={dialog} handleClose={() => setDialog(false)} />
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

IntroThree.getLayout = function getLayout(page: ReactElement) {
  return (
    <Intro title="Intro 3 | Commons Dashboard" nextHref="/intro/4">
      {page}
    </Intro>
  );
};

export default IntroThree;
