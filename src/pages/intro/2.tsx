import Intro from '@/templates/Intro';

function IntroTwo() {
  return (
    <Intro title="Intro 2 | Commons Dashboard" nextHref="/intro/3">
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
        <a
          href="#"
          target="_blank"
          className="block font-bj font-bold text-sm text-neon uppercase my-6"
        >
          learn more
        </a>
      </div>
    </Intro>
  );
}

export default IntroTwo;
