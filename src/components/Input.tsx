import { Tooltip } from '@/components/_global';
import { useHover, useParams } from '@/hooks';
import classnames from 'classnames';
import Image from 'next/image';
import Select from './Select';

interface InputProps {
  children?: React.ReactNode;
  formatNumber?: boolean;
  min?: number;
  max?: number;
  name: string;
  param: string;
  placeholder: string;
  options?: { [key: string]: string }[];
  select?: boolean;
  tooltipText?: string;
  link?: string;
  value: string | number;
  isNumber?: boolean;
  changeParam?(): void;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

function Input({
  children,
  formatNumber,
  min,
  max,
  name,
  param,
  placeholder,
  options,
  select,
  tooltipText,
  value,
  link,
  isNumber = true,
  changeParam,
  onChange,
}: InputProps) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const error = min > Number(value) || max < Number(value);
  const { setParams } = useParams();

  const handleBlur = (e) => {
    const num = parseFloat(e.target.value);
    const cleanNum = num.toFixed(2);
    setParams((previousParams) => ({
      ...previousParams,
      [e.target.name]: cleanNum,
    }));
  };

  return (
    <div className="py-1 lg:grid lg:grid-cols-5 justify-between">
      <div className="col-span-3 self-center">
        <Tooltip text={tooltipText} isHovered={isHovered}>
          <div className="flex flex-col justify-center">
            <a href={link} target="_blank" rel="noreferrer">
              <span
                ref={hoverRef}
                className="font-bj text-gray-200 cursor-pointer hover:text-white"
              >
                {param}{' '}
                {tooltipText ? (
                  <div className="inline-block mt-1 ml-1">
                    <Image
                      src="/icons/questionMark.svg"
                      height="12"
                      width="12"
                    />
                  </div>
                ) : (
                  <></>
                )}
              </span>
            </a>
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
            type={isNumber ? 'number' : 'text'}
            min={min}
            max={max}
            name={name}
            value={value}
            onClick={changeParam}
            onChange={onChange}
            onBlur={formatNumber && handleBlur}
            className={classnames(
              'font-bj font-bold text-neon-light text-xl w-full h-full pl-3 border-2 focus:border-neon hover:border-gray-400 bg-transparent outline-none',
              error ? 'border-red-500' : 'border-gray-500'
            )}
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
