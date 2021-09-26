import Learn from '@/templates/Learn';
import Checkbox from '@/components/Chekbox';

function LearnThree() {
  return (
    <Learn title="Learn 4 | Commons Dashboard" nextHref="/learn/4">
      <h3 className="text-bj font-bold text-3xl">Tao Voting</h3>
      <div className="font-inter">
        <br />
        <p className="text-lg">
          As your Commons evolves so should its configuration. Parameters within
          the different Commons components will be able to be modified after
          they have been implemented. In this module you will need to define the
          voting requirements for any proposal to alter the Commons
          configuration.
        </p>
        <br />
        <p className="font-bold">Modifying the Commons</p>
        <br />
        <p>
          Tao Voting (TV) is the voting process by which the Commons can modify
          its economic and governance settings post-upgrade. It is a very
          powerful voting application that is capable of performing many
          high-impact functions, for example:
        </p>
        <br />
        <ul className="list-disc list-inside">
          <li>Mint and burn TEC tokens</li>
          <li>Install and remove Applications (Modules) in the Commons</li>
          <li>Modify the parameters of all existing Applications (Modules)</li>
        </ul>
        <br />
        <p>
          Since there are only one set of voting parameters for all Commons
          components, strong thresholds for passing proposals in TV are critical
          to ensure the Commons architecture remains uncompromised.
        </p>
        <br />
        <p>
          TV is an upgraded version of Dandelion Voting with familiar parameters
          such as Support Required, Minimum Quorum, Execution Delay and Vote
          Duration.
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
          TEC Token holders can delegate their disputable voting powers to
          another member who will cast votes on their behalf, these members
          become delegates. Delegates can only vote during the Delegate Voting
          Period, which is a specified amount of time at the beginning of the
          voting process. If a delegate votes contrary to their delegator the
          delegator can veto the delegated vote and cast their vote themselves.
          Any voter, delegate or otherwise, can only vote ONCE.
        </p>
        <br />
        <p className="font-bold">Quiet Ending</p>
        <br />
        <p>
          In the latter portion of the Vote Duration there’s a designated Quiet
          Ending Period (QEP). If during this period the vote outcome is flipped
          the Quiet Ending Extension(QEE) will trigger. The QEE will add more
          time to the voting period, giving eligible members who have not yet
          voted more time to do so. If the vote outcome flips again during QEE
          then another QEE will trigger, adding more time to vote. Voting closes
          only when the QEP or QEE ends without the vote outcome flipping.
        </p>
        <br />
        <p className="font-bold leading-loose">You decide:</p>
        <ul className="list-disc list-inside">
          <li>Legacy Dandelion Voting settings</li>
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
        <div className="mt-6">
          <Checkbox text="I understood everything and I’m able to configure the parameters" />
        </div>
      </div>
    </Learn>
  );
}

export default LearnThree;
