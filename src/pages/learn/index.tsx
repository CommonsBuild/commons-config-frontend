import Head from 'next/head';

import { CustomNavbar as Navbar } from '@/components/Navbar';
import NeonButton from '@/components/NeonButton';
import Checkbox from '@/components/Chekbox';
import GradientTitle from '@/components/GradientTitle';
import ListItem from '@/components/ListItem';

const learnings = [
  'Distribution of TEC tokens and Governance power to Hatchers',
  'How the TEC token economy works',
  'The process for changing the settings of the Commons',
  'How the Commons can request funds to advance Token Engineering',
];

function LearnIndex() {
  return (
    <>
      <Head>
        <title>Learn | Commons Dashboard</title>
      </Head>
      <Navbar href="/intro/" text="take me back" />
      <div className="min-h-screen bg-black-one">
        <div className="flex container mx-auto px-4 py-8 justify-center text-center">
          <GradientTitle>
            Let&apos;s learn a little bit about how the Commons works before we
            configure it.
          </GradientTitle>
        </div>
        <div className="container mx-auto px-4">
          <h3 className="text-bj text-white font-bold text-2xl mb-4">
            What you will learn:
          </h3>
          <ul className="text-inter">
            {learnings.map((text, index) => (
              <ListItem key={index}>{text}</ListItem>
            ))}
          </ul>
        </div>
        <div className="container mx-auto px-4 text-inter text-white">
          <div className="flex flex-row">
            <img src="/icons/clock.svg" alt="Clock Icon" />
            <span className="italic ml-2">
              This will take you about 15-20 minutes. Please make sure you have
              the time and focus.
            </span>
          </div>
          <Checkbox text="I have enough time, no distractions and will be fully focused" />
        </div>
        <NeonButton disabled href="/learn/1">
          LET&apos;S GO
        </NeonButton>
      </div>
    </>
  );
}

export default LearnIndex;
