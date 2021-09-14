import classnames from 'classnames';
import Tooltip from '@/components/Tooltip';
import useHover from '@/utils/useHover';

interface LabeledRadioButtonProps {
  borderColor?: boolean;
  id: string;
  label: string;
  margin?: boolean;
  name: string;
  pX?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: string;
  tooltipText?: string;
  value?: string | number;
}

const labelSize = {
  big: 'w-16',
  medium: 'w-12',
  small: 'w-10',
};

function LabeledRadioButton({
  borderColor,
  id,
  label,
  margin,
  name,
  onChange,
  pX,
  size,
  tooltipText,
  value,
}: LabeledRadioButtonProps) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  return (
    <>
      <input
        className="hidden"
        id={id}
        type="radio"
        name={name}
        onChange={onChange}
        value={value}
      />
      <Tooltip text={tooltipText} isHovered={isHovered}>
        <label
          htmlFor={id}
          className={classnames(
            'bg-black-200 border text-center hover:border-gray-400 py-1 cursor-pointer',
            {
              'border-gray-500': !borderColor,
              'border-neon': borderColor,
              'mr-1': margin,
              'px-8': pX,
              'px-1': !pX,
            },
            labelSize[size]
          )}
        >
          <span
            ref={hoverRef}
            className="font-inter font-medium text-neon-light text-xs uppercase"
          >
            {label}
          </span>
        </label>
      </Tooltip>
    </>
  );
}

export default LabeledRadioButton;
