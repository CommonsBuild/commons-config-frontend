import Intro from '@/templates/Intro';

function IntroOne() {
  return (
    <Intro title="Intro 2 | Commons Dashboard" nextHref="/intro/3">
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
        <a className="block font-bj font-bold text-sm text-neon uppercase my-6">
          learn more
        </a>
      </div>
    </Intro>
  );
}

export default IntroOne;
