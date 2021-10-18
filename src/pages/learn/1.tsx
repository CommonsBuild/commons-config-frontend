import type { ReactElement } from 'react';
import Learn from '@/templates/Learn';

function LearnOne() {
  return (
    <>
      <h3 className="text-bj font-bold text-3xl">Token Freeze & Token Thaw</h3>
      <div className="font-inter">
        <br />
        <p>
          Instead of the Hatcher’s TEC tokens becoming available at once to sell
          or trade, they are locked for some time until a linear function is
          implemented to unlock tokens, rendering them liquid at a steady
          trickle.
        </p>
        <br />
        <p>
          The <strong>Token Freeze</strong> is the duration from the
          initialization of the Commons in which tokens remain fully locked,
          only at the end of the Token Freeze do tokens begin to thaw. This next
          period of time is known as the <strong>Token Thaw</strong>. We use
          this time for the Commons to establish value and start its
          initiatives. This mechanism is designed to guarantee, for a certain
          period, the minimum possible price of the token or, price floor.
        </p>
        <br />
        <p>
          During the Hatch, TECH tokens were minted at a value of 1 wxDAI per
          TECH. At the Commons Upgrade TEC tokens will be given to Hatchers at a
          1:1 TEC/TECH ratio. The <strong>Opening Price</strong> is the price we
          sell TEC tokens on the Augmented Bonding Curve after the Commons
          Upgrade is complete.
        </p>
        <br />
        <p>
          Early buyers of TEC tokens will benefit from the price floor in that
          they will be assured its value will never drop below a certain
          threshold at a given time. As tokens begin to thaw the price floor
          descends, linearly, eventually reaching zero when 100% of the TEC
          tokens are rendered liquid. This would be the end of the Token Thaw
          period. Ideally, by this time the Commons should be well on its way,
          advancing token engineering, and the TEC token having firm value
          backing it.
        </p>
        <br />
        <p className="font-bold leading-loose">You decide:</p>
        <ul className="list-disc list-inside">
          <li>How long to keep tokens frozen</li>
          <li>The rate at which tokens become liquid</li>
          <li>The opening price of the TEC token</li>
        </ul>
        <p className="font-bj font-bold text-lg my-6">
          If you need more information please check the links below:
        </p>
        <a
          href="https://forum.tecommons.org/t/opening-price-price-floor-mechanism/507/2"
          target="_blank"
          rel="noreferrer"
          className="block font-bj font-bold text-neon leading-loose"
        >
          Price Floor Dynamics
        </a>
        <a
          href="https://forum.tecommons.org/t/token-freeze-token-thaw/509/2"
          target="_blank"
          rel="noreferrer"
          className="block font-bj font-bold text-neon leading-loose"
        >
          Token Thaw and Token Freeze
        </a>
      </div>
    </>
  );
}

LearnOne.getLayout = function getLayout(page: ReactElement) {
  return (
    <Learn title="Learn 1 | Commons Dashboard" nextHref="/learn/2">
      {page}
    </Learn>
  );
};

export default LearnOne;
