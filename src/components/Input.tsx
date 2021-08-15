import Tooltip from './Tooltip';
import useHover from '../utils/useHover';

interface InputProps {
  name: string;
  param: string;
  placeholder: string;
  tooltipText: string;
  value: number;
  min: number;
  changeParam(): void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  name,
  param,
  placeholder,
  tooltipText,
  value,
  min,
  changeParam,
  onChange,
}: InputProps) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <div className="px-9 pb-2 text-gray-100 lg:grid lg:grid-cols-2 justify-between">
      <Tooltip text={tooltipText} isHovered={isHovered}>
        <div ref={hoverRef} className="font-bj self-center py-1">
          {param}
        </div>
      </Tooltip>
      <div className="relative h-11">
        <input
          name={name}
          value={value}
          type="number"
          min={min}
          onClick={changeParam}
          onChange={onChange}
          maxLength={5}
          className="transition font-bold text-neon-light text-xl w-full h-full pl-3 border-2 border-gray-500 focus:border-neon hover:border-gray-400 bg-transparent outline-none placeholder-right"
        />
        <span className="absolute right-3 top-2/4 transform -translate-y-2/4 font-inter text-xs text-gray-300">
          {placeholder}
        </span>
      </div>
    </div>
  );
}

export default Input;
