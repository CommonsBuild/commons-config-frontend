import React from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import { Listbox, Transition } from '@headlessui/react';

const Select = ({ name, options, selectedOption, handelChange }) => (
  <Listbox
    as="div"
    className="h-full w-full"
    value={selectedOption}
    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
      handelChange({ target: { ...event, name } });
    }}
  >
    {({ open }) => (
      <>
        <div className="h-full w-full relative">
          <span className="h-full w-full inline-block shadow-sm">
            <Listbox.Button className="h-full w-full cursor-default relative pl-3 pr-10 py-2 border-2 border-gray-500 focus:border-neon active:border-neon hover:border-gray-400 outline-none transition ease-in-out duration-150">
              <span className="font-bj font-bold text-xl text-neon-light text-left block truncate">
                {selectedOption?.label}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 cursor-pointer">
                <Image src="/icons/selector.svg" height="20" width="20" />
              </span>
            </Listbox.Button>
          </span>
          <div className="absolute z-10 w-full shadow-lg mb-11">
            <Transition
              show={open}
              leave="transition duration-100 ease-in"
              leaveFrom="transform opacity-100"
              leaveTo="transform opacity-0"
            >
              <Listbox.Options
                static
                className="bg-black-200 focus:outline-none"
              >
                {options.map((option) => (
                  <Listbox.Option
                    as={React.Fragment}
                    key={option.label}
                    value={option}
                  >
                    {({ active }) => (
                      <li
                        className={classnames(
                          'flex items-center cursor-default select-none relative h-12 py-2 pl-3 pr-9',
                          {
                            'text-black bg-neon': active,
                            'text-neon-light': !active,
                          }
                        )}
                      >
                        <div className="flex items-center">
                          <span className="font-bj font-bold text-xl flex items-center truncate">
                            {option.label}
                          </span>
                        </div>
                      </li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      </>
    )}
  </Listbox>
);

export default Select;
