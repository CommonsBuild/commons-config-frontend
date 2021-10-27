/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import classnames from 'classnames';
import { Dialog, Transition } from '@headlessui/react';
import { NeonButton } from '../btns';

interface ModalProps {
  children: React.ReactNode;
  handleClose: () => void;
  isOpen: boolean;
  title?: string;
  transparent?: boolean;
}

function Modal({
  children,
  handleClose,
  isOpen = false,
  title,
  transparent = false,
}: ModalProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={classnames(
                'inline-block align-bottom rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-16 lg:max-w-2xl',
                transparent ? 'bg-transparent' : 'bg-black'
              )}
            >
              <div className="mt-3 sm:mt-5">
                <Dialog.Title
                  as="h3"
                  className="font-bj font-bold text-4xl text-neon-light text-center"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-8">{children}</div>
              </div>
              <div
                className={classnames(
                  'bg-black pt-5 px-16 sm:pt-6',
                  transparent && 'pb-5 sm:pb-6'
                )}
              >
                <NeonButton fullWidth onClick={handleClose}>
                  <span>close</span>
                </NeonButton>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default Modal;
