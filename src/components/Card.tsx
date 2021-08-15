import React from "react";
import NeonButton from "../components/NeonButton";

interface CardProps {
  children: React.ReactNode;
  previousPanel?: string;
  nextPanel?: string;
  title: string;
}

function Card({ children, previousPanel, nextPanel, title }: CardProps) {
  return (
    <div className="flex flex-col bg-secondary-black w-10/12 mx-auto my-4 shadow-2xl lg:w-96 lg:h-144 lg:my-8">
      <h3 className="font-bj font-bold text-sm text-gray-100 uppercase py-6 px-9">
        {title}
      </h3>
      {children}
      <div className="w-full px-9 py-6 mt-auto">
        <div className="flex justify-between">
          {previousPanel ? (
            <div className="flex justify-end items-center font-bj text-right text-xs text-gray-100 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mx-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              {previousPanel}
            </div>
          ) : (
            <div />
          )}
          {nextPanel ? (
            <div className="flex justify-end items-center font-bj text-right text-xs text-gray-100 py-2">
              {nextPanel}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mx-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : (
            <div />
          )}
        </div>
        <NeonButton name="next" />
      </div>
    </div>
  );
}

export default Card;
