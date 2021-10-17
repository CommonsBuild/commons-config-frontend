import type { ReactElement } from 'react';
import { useState } from 'react';

import Intro from '@/templates/Intro';
import { Dialog } from '@/components/modals/';

interface DialogProps {
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}

function IntroTwoDialog({ handleClose, isOpen }: DialogProps) {
  return (
    <Dialog isOpen={isOpen} title="Token Freeze & Token Thaw">
      <p className="font-inter text-base text-neon-light p-4">
        Instead of the Hatcher’s TEC tokens becoming available at once to sell
        or trade, they are frozen for some time.
      </p>
      <p className="font-inter text-base text-neon-light p-4">
        The Token Freeze is the duration from the initiliazation of the Commons
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
      <button
        className="flex m-auto uppercase font-bj font-bold text-neon text-xs py-6"
        onClick={handleClose}
      >
        ok
      </button>
    </Dialog>
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
