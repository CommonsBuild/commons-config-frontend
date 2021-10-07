import classnames from 'classnames';
import Backdrop from './Backdrop';

interface DialogProps {
  bg?: boolean;
  children: React.ReactNode;
  isOpen: boolean;
  title?: string;
}

function Dialog({ bg, children, isOpen, title }: DialogProps) {
  return (
    <Backdrop isOpen={isOpen}>
      <div
        className={classnames('m-auto max-w-xl w-full', {
          'bg-dialog': bg,
          'bg-black': !bg,
        })}
      >
        <h1
          className={classnames(
            'font-bj font-bold text-neon-light text-4xl text-center p-6',
            {
              hidden: !title,
            }
          )}
        >
          {title}
        </h1>
        {children}
      </div>
    </Backdrop>
  );
}

export default Dialog;
