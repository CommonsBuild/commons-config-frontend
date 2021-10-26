import classnames from 'classnames';
import Tooltip from '@/components/_global/Tooltip';
import { useHover } from '@/hooks';

interface LabeledRadioButtonProps {
  checked?: boolean;
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
  big: 'w-24',
  medium: 'w-16',
  small: 'w-12',
};

function LabeledRadioButton({
  checked,
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
      <Tooltip isHovered={isHovered} text={tooltipText}>
        <input
          checked={checked}
          className="hidden labeled-radio"
          id={id}
          name={name}
          type="radio"
          value={value}
          onChange={onChange}
        />
        <label
          className={classnames(
            'labeled-radio bg-black-200 border text-center border-gray-500 hover:border-gray-400 py-1 cursor-pointer',
            {
              'mr-1': margin,
              'px-8': pX,
              'px-1': !pX,
            },
            labelSize[size]
          )}
          htmlFor={id}
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
