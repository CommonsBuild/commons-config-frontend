import React from 'react';
import Link from 'next/link';
import { NeonButton } from '@/components/btns';

interface CardProps {
  children: React.ReactNode;
  hiddenButton?: boolean;
  nextHref?: string;
  nextPanel?: string;
  previousPanel?: string;
  previousHref?: string;
  title: string;
  submitProposal?: boolean;
}

function Card({
  children,
  hiddenButton,
  nextHref,
  nextPanel,
  previousPanel,
  previousHref,
  title,
  submitProposal,
}: CardProps) {
  return (
    <div className="self-start flex flex-col bg-black-100 mx-16 my-4 pt-2 pb-6 px-9 lg:w-96 lg:mt-8">
      <h3 className="font-bj font-bold text-sm text-gray-100 mb-4 uppercase">
        {title}
      </h3>
      {children}
      <div className="w-full mt-2">
        <div className="flex justify-between gap-2 mb-2">
          {previousPanel ? (
            <Link href={previousHref}>
              <a className="flex justify-center w-full py-2 border border-neon">
                <label className="font-bj font-bold text-neon uppercase">
                  back
                </label>
              </a>
            </Link>
          ) : (
            <></>
          )}
          {nextPanel ? (
            <Link href={nextHref}>
              <a className="flex justify-center w-full py-2 border border-neon">
                <span className="font-bj font-bold text-neon uppercase">
                  next
                </span>
              </a>
            </Link>
          ) : (
            <></>
          )}
        </div>
        <NeonButton
          disabled={submitProposal}
          hidden={hiddenButton}
          fullWidth
          href="/config/submit"
        >
          submit proposal
        </NeonButton>
      </div>
    </div>
  );
}

export default Card;
