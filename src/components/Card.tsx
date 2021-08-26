import React from 'react';
import Image from 'next/image';
import NeonButton from './NeonButton';

interface CardProps {
  children: React.ReactNode;
  previousPanel?: string;
  nextPanel?: string;
  title: string;
}

function Card({ children, previousPanel, nextPanel, title }: CardProps) {
  return (
    <div className="self-start flex flex-col bg-secondary-black w-10/12 mx-auto my-4 py-6 px-9 lg:w-96 lg:mt-8">
      <h3 className="font-bj font-bold text-sm text-gray-100 mb-4 uppercase">
        {title}
      </h3>
      {children}
      <div className="w-full mt-8">
        <div className="flex justify-between">
          {previousPanel ? (
            <div className="flex justify-end items-center font-bj text-right text-xs text-gray-100 cursor-pointer py-2">
              <Image
                src="/assets/arrow-left.svg"
                alt="Left arrow icon."
                width="20"
                height="20"
              />
              {previousPanel}
            </div>
          ) : (
            <div />
          )}
          {nextPanel ? (
            <div className="flex justify-end items-center font-bj text-right text-xs text-gray-100 cursor-pointer py-2">
              {nextPanel}
              <Image
                src="/assets/arrow-right.svg"
                alt="Right arrow icon."
                width="20"
                height="20"
              />
            </div>
          ) : (
            <div />
          )}
        </div>
        <NeonButton disabled fullWidth href="/config/2">
          submit proposal
        </NeonButton>
      </div>
    </div>
  );
}

export default Card;
