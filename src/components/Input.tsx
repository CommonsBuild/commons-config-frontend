import Tooltip from './Tooltip';
import useHover from '../utils/useHover';

interface InputProps {
  name: string;
  placeholder: string;
  tooltipText: string;
  changeParam(): void;
}

function Input({ name, placeholder, tooltipText, changeParam }: InputProps) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <div className="px-9 pb-2 text-gray-100 lg:grid lg:grid-cols-2 justify-between">
      <Tooltip text={tooltipText} isHovered={isHovered}>
        <div ref={hoverRef} className="font-bj self-center py-1 cursor-default">
          {name}
        </div>
      </Tooltip>
      <div className="relative h-11">
        <input
          maxLength={5}
          onClick={changeParam}
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
