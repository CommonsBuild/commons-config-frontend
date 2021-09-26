import Intro from '@/templates/Intro';

function IntroFour() {
  return (
    <Intro title="Intro 4 | Commons Dashboard" nextHref="/learn/done">
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

export default IntroFour;
