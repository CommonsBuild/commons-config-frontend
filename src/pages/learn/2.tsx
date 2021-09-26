import Learn from '@/templates/Learn';
import Checkbox from '@/components/Chekbox';

function LearnTwo() {
  return (
    <Learn title="Learn 2 | Commons Dashboard" nextHref="/learn/3">
      <h3 className="text-bj font-bold text-3xl">
        The Augmented Bonding Curve (ABC)
      </h3>
      <div className="font-inter">
        <br />
        <p className="text-lg">
          The Augmented Bonding Curve (ABC) is the main economic engine by which
          we will provide a constant flow of funding to the Commons’
          Initiatives. In this module you’ll be tasked to design an ABC which
          will be the primary market where TEC tokens are bought and sold.
        </p>
        <br />
        <p>
          The magic of the Augmented Bonding Curve is that whenever a buy or
          sell order takes place on its market a percentage is sent directly to
          the funding pool. The percentage taken immediately in wxDAI from buy
          orders to the curve is the
          <strong>Entry Tribute</strong>. Conversely, the percentage taken from
          sell orders is the <strong>Exit Tribute</strong>. This means that for
          every action on the curve the Commons receives funding to advance
          Token Engineering.
        </p>
        <br />
        <p>The ABC funds two pools:</p>
        <br />
        <p>
          The Common Pool holds funds that will be used for realizing the
          initiatives of the TEC.
        </p>
        <br />
        <p>
          The Reserve backs the value of TEC tokens as they are bought and sold
          on the ABC. When tokens are bought on the curve the price of TEC goes
          up, when it is sold the price goes down.
        </p>
        <br />
        <p>
          During the Commons Upgrade a percentage of the total funds raised from
          the Hatch is sent to the Common Pool to kick-start the Commons’
          projects. This percentage is the
          <strong>Commons Tribute</strong>.
        </p>
        <br />
        <p className="font-bold leading-loose">You decide:</p>
        <ul className="list-disc list-inside">
          <li>What percent of hatch funds will go to each pool</li>
          <li>The tribute taken from buy and sell orders</li>
        </ul>
        <p className="font-bj font-bold text-lg my-6">
          If you need more information please check the links below:
        </p>
        <a
          href="https://forum.tecommons.org/t/augmented-bonding-curve-entry-exit-tribute/494"
          target="_blank"
          rel="noreferrer"
          className="block font-bj font-bold text-neon leading-loose"
        >
          Entry Tribute & Exit Tribute
        </a>
        <a
          href="https://forum.tecommons.org/t/augmented-bonding-curve-commons-tribute/517/2"
          target="_blank"
          rel="noreferrer"
          className="block font-bj font-bold text-neon leading-loose"
        >
          Commons Tribute
        </a>
        <a
          href="https://forum.tecommons.org/t/augmented-bonding-curve-opening-price-reserve-ratio/516/2"
          target="_blank"
          rel="noreferrer"
          className="block font-bj font-bold text-neon leading-loose"
        >
          Opening Price & Reserve Ratio
        </a>
        <div className="mt-6">
          <Checkbox text="I understood everything and I’m able to configure the parameters" />
        </div>
      </div>
    </Learn>
  );
}

export default LearnTwo;
