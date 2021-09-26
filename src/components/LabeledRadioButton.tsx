import classnames from 'classnames';
import Tooltip from '@/components/Tooltip';
import useHover from '@/hooks/useHover';

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
  big: 'w-16',
  medium: 'w-12',
  small: 'w-10',
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
      <input
        checked={checked}
        className="hidden labeled-radio"
        id={id}
        name={name}
        type="radio"
        value={value}
        onChange={onChange}
      />
      <Tooltip isHovered={isHovered} text={tooltipText}>
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
