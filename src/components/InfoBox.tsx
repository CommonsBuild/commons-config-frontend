import Image from 'next/image';
import classnames from 'classnames';
import { Tooltip } from '@/components/_global';
import { useHover } from '@/hooks';

const textColors = {
  neon: 'text-neon',
  white: 'text-neon-light',
};

type TextColor = 'neon' | 'white';
interface InfoBoxProps {
  color?: TextColor;
  label: string | React.ReactNode;
  link?: string;
  tooltipText?: string | React.ReactNode;
}

function InfoBox({ color = 'white', label, link, tooltipText }: InfoBoxProps) {
  const [questionRef, questionIsHovered] = useHover<HTMLDivElement>();

  return (
    <Tooltip isHovered={questionIsHovered} text={tooltipText}>
      <div
        ref={questionRef}
        className="grid grid-flow-col gap-2 justify-between items-center px-4 py-2 bg-black-200"
      >
        <a href={link} target="_blank" rel="noreferrer">
          <span
            className={classnames(
              'font-bj font-bold text-sm cursor-pointer flex',
              textColors[color]
            )}
          >
            {label}
          </span>
        </a>
        {tooltipText && (
          <Image
            className="m-1"
            alt="Question mark."
            height="12"
            src="/icons/questionMark.svg"
            width="12"
          />
        )}
      </div>
    </Tooltip>
  );
}

export default InfoBox;
