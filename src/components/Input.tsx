import Image from 'next/image';
import { Tooltip } from '@/components/_global';
import { useHover } from '@/hooks';
import Select from './Select';

interface InputProps {
  children?: React.ReactNode;
  min?: number;
  max?: number;
  name: string;
  param: string;
  placeholder: string;
  options?: { [key: string]: string }[];
  select?: boolean;
  tooltipText: string;
  value: string | number;
  changeParam?(): void;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

function Input({
  children,
  min,
  max,
  name,
  param,
  placeholder,
  options,
  select,
  tooltipText,
  value,
  changeParam,
  onChange,
}: InputProps) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <div className="py-1 lg:grid lg:grid-cols-5 justify-between">
      <div className="col-span-3 self-center">
        <Tooltip text={tooltipText} isHovered={isHovered}>
          <div className="flex flex-col justify-center">
            <span ref={hoverRef} className="font-bj text-gray-100">
              {param}{' '}
              <div className="inline-block mt-1 ml-1">
                <Image src="/questionMark.svg" height="12px" width="12px" />
              </div>
            </span>
            {children}
          </div>
        </Tooltip>
      </div>
      <div className="relative h-12 bg-black-200 col-span-2">
        {select ? (
          <Select
            name={name}
            options={options}
            selectedOption={options.find((elem) => elem.value === value)}
            handelChange={onChange}
          />
        ) : (
          <input
            type="numeric"
            min={min}
            max={max}
            name={name}
            value={value}
            onClick={changeParam}
            onChange={onChange}
            className="font-bj font-bold text-neon-light text-xl w-full h-full pl-3 border-2 border-gray-500 focus:border-neon hover:border-gray-400 bg-transparent outline-none"
          />
        )}

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
