import Intro from '@/templates/Intro';

function IntroThree() {
  return (
    <Intro title="Intro 3 | Commons Dashboard" nextHref="/intro/4">
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

export default IntroThree;
