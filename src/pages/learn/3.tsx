import type { ReactElement } from 'react';
import Learn from '@/templates/Learn';
import AudioPlayer from '@/components/AudioPlayer';

const TaoVotingAudio = require('../../../public/media/tao.mp3');

function LearnThree() {
  return (
    <>
      <AudioPlayer track={TaoVotingAudio} />
      <h3 className="text-bj font-bold text-3xl">Tao Voting</h3>
      <div className="font-inter">
        <br />
        <p>
          As the GIVeconomy evolves so should its configuration. Parameters
          within the GIVgarden will be able to be modified during deployment. In
          this module you will need to define the voting requirements for any
          proposal to alter the GIVgarden on-chain configuration.
        </p>
        <br />
        <p className="font-bold">Modifying the GIVgarden</p>
        <br />
        <p>
          Tao Voting is the voting application by which the GIVers can modify
          the economic and governance settings of the GIVgarden. It is a very
          powerful voting application that is capable of performing many
          high-impact Decisions, for example:
        </p>
        <br />
        <ul className="list-disc list-inside">
          <li>Install and remove Aragon Applications</li>
          <li>Modify the parameters of all existing Applications</li>
          <li>Remove GIV from the Common Pool</li>
        </ul>
        <br />
        <p>
          Since there is only one set of voting parameters for all GIVgarden
          components, well-thought out thresholds for passing proposals in Tao
          Voting are critical to ensure the GIVgarden architecture remains
          uncompromised.
        </p>
        <br />
        <p>
          Tao Voting is an upgraded version of a normal DAO Voting app with
          familiar parameters such as <strong>Support Required</strong>,{' '}
          <strong>Minimum Quorum</strong>, <strong>Execution Delay</strong>
          and <strong>Vote Duration</strong>.
        </p>
        <br />
        <p>
          Tao Voting also comes with two new concepts: Delegation and Quiet
          Ending.
        </p>
        <br />
        <p className="font-bold">Delegation</p>
        <br />
        <p>
          GIV holders can delegate their Tao Voting powers to another member who
          will cast votes on their behalf, these members become delegates.
          Delegates can only vote during the{' '}
          <strong>Delegate Voting Period</strong>, which is a specified amount
          of time at the beginning of the voting process. If a delegate votes
          contrary to their delegator the delegator can veto the delegated vote
          and cast their vote themselves. Any voter, delegate or otherwise, can
          only vote ONCE.
        </p>
        <br />
        <p className="font-bold">Quiet Ending</p>
        <br />
        <p>
          In the latter portion of the Vote Duration there’s a designated{' '}
          <strong>Quiet Ending Period</strong> (QEP). If during this period the
          vote outcome is flipped the <strong>Quiet Ending Extension</strong>{' '}
          (QEE) will trigger. The QEE will add more time to the voting period,
          giving eligible members who have not yet voted more time to do so. If
          the vote outcome flips again during QEE then another QEE will trigger,
          adding more time to vote. Voting closes only when the QEP or QEE ends
          without the vote outcome flipping.
        </p>
        <br />
        <p className="font-bold leading-loose">You decide:</p>
        <ul className="list-disc list-inside">
          <li>Normal DAO Voting settings</li>
          <li>The amount of time Delegates are allowed to vote</li>
          <li>How long to listen for a change of outcome</li>
          <li>The amount of time that can be added for voting</li>
        </ul>
        <p className="font-bj font-bold text-lg my-6">
          If you need more information please check the links below:
        </p>
        <a
          href="https://forum.tecommons.org/t/disputable-voting-support-required/486/2"
          target="_blank"
          rel="noreferrer"
          className="block font-bj font-bold text-neon leading-loose"
        >
          Support Required
        </a>
        <a
          href="https://forum.tecommons.org/t/disputable-voting-minimum-quorum/485/2"
          target="_blank"
          rel="noreferrer"
          className="block font-bj font-bold text-neon leading-loose"
        >
          Minimum Quorum
        </a>
        <a
          href="https://forum.tecommons.org/t/disputable-voting-execution-delay/489/2"
          target="_blank"
          rel="noreferrer"
          className="block font-bj font-bold text-neon leading-loose"
        >
          Execution Delay
        </a>
        <a
          href="https://forum.1hive.org/t/celeste-a-brief-primer/1483"
          target="_blank"
          rel="noreferrer"
          className="block font-bj font-bold text-neon leading-loose"
        >
          Disputability and Celeste
        </a>
        <a
          href="https://forum.tecommons.org/t/disputable-voting-delegated-voting-period/487/2"
          target="_blank"
          rel="noreferrer"
          className="block font-bj font-bold text-neon leading-loose"
        >
          Delegated Voting
        </a>
        <a
          href="https://forum.tecommons.org/t/disputable-voting-quiet-ending-period-and-quiet-ending-extension/488/2"
          target="_blank"
          rel="noreferrer"
          className="block font-bj font-bold text-neon leading-loose"
        >
          Quiet Ending
        </a>
        <a
          href="https://forum.tecommons.org/t/disputable-voting-vote-duration/484/2"
          target="_blank"
          rel="noreferrer"
          className="block font-bj font-bold text-neon leading-loose"
        >
          Vote Duration
        </a>
      </div>
    </>
  );
}

LearnThree.getLayout = function getLayout(page: ReactElement) {
  return (
    <Learn title="Learn 3 | Commons Dashboard" nextHref="/learn/4">
      {page}
    </Learn>
  );
};

export default LearnThree;
