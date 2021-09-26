import Learn from '@/templates/Learn';
import Checkbox from '@/components/Chekbox';

function LearnFour() {
  return (
    <Learn title="Learn 4 | Commons Dashboard" nextHref="/learn/done">
      <h3 className="text-bj font-bold text-3xl">
        Disputable Conviction Voting
      </h3>
      <div className="font-inter">
        <br />
        <p className="text-lg">
          Disputable Conviction Voting is the governance system in which Commons
          Members create proposals to request funds from the Common Pool.
        </p>
        <br />
        <p>
          TEC tokens can be staked on these proposals to signal approval of the
          request. Staked tokens accrue voting power, or Conviction,
          continuously over time. The amount of tokens currently voting on all
          proposals in Disputable Conviction Voting is represented by the term
          Effective Supply. The logarithmic function that decides the rate at
          which Conviction accumulates is Conviction Growth.
        </p>
        <br />
        <p>
          This is the real power behind the TEC token. TEC holders have a direct
          impact on funding Token Engineering by reviewing projects and voting
          on which initiatives get funded and how much funding they receive.
        </p>
        <br />
        <p>
          The Spending Limit sets the maximum percentage of the Common Pool
          funds that can be requested by a single proposal. The Minimum
          Conviction dictates how many TEC tokens are needed to pass a proposal,
          no matter how small the amount requested.
        </p>
        <br />
        <p className="font-bold leading-loose">You decide:</p>
        <ul className="list-disc list-inside">
          <li>
            How much of the Common Pool’s funds can be requested in a single
            proposal
          </li>
          <li>How many tokens are needed to pass a proposal</li>
          <li>The rate at which conviction accumulates</li>
        </ul>
        <p className="font-bj font-bold text-lg my-6">
          If you need more information please check the links below:
        </p>
        <a
          href="https://forum.tecommons.org/t/disputable-conviction-voting-conviction-growth-aka-half-life/490"
          target="_blank"
          rel="noreferrer"
          className="block font-bj font-bold text-neon leading-loose"
        >
          Conviction Growth
        </a>
        <a
          href="https://forum.tecommons.org/t/disputable-conviction-voting-spending-limit-aka-max-ratio-beta/469"
          target="_blank"
          rel="noreferrer"
          className="block font-bj font-bold text-neon leading-loose"
        >
          Spending Limit
        </a>
        <a
          href="https://forum.tecommons.org/t/disputable-conviction-voting-minimum-conviction-aka-minimum-threshold/493"
          target="_blank"
          rel="noreferrer"
          className="block font-bj font-bold text-neon leading-loose"
        >
          Minimum Conviction
        </a>
        <a
          href="https://forum.1hive.org/t/celeste-a-brief-primer/1483"
          target="_blank"
          rel="noreferrer"
          className="block font-bj font-bold text-neon leading-loose"
        >
          Disputing and Celeste
        </a>
        <div className="mt-6">
          <Checkbox text="I understood everything and I’m able to configure the parameters" />
        </div>
      </div>
    </Learn>
  );
}

export default LearnFour;
