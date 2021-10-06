import { Tooltip } from '@/components/_global';
import { useHover } from '@/hooks';

interface InputProps {
  children?: React.ReactNode;
  name: string;
  param: string;
  placeholder: string;
  tooltipText: string;
  value: string | number;
  changeParam?(): void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  children,
  name,
  param,
  placeholder,
  tooltipText,
  value,
  changeParam,
  onChange,
}: InputProps) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <div className="py-1 lg:grid lg:grid-cols-2 justify-between">
      <Tooltip text={tooltipText} isHovered={isHovered}>
        <div className="flex flex-col justify-center">
          <span ref={hoverRef} className="font-bj text-gray-100 self-center">
            {param}
          </span>
          {children}
        </div>
      </Tooltip>
      <div className="relative h-12 bg-black-200">
        <input
          name={name}
          value={value}
          onClick={changeParam}
          onChange={onChange}
          max={100}
          className="font-bold text-neon-light text-xl w-full h-full pl-3 border-2 border-gray-500 focus:border-neon hover:border-gray-400 bg-transparent outline-none"
        />
        <div className="absolute right-3 top-2/4 transform -translate-y-2/4">
          <span className="font-inter text-xs text-gray-300">
            {placeholder}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Input;
