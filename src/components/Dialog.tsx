import classnames from 'classnames';

interface DialogProps {
  bg?: boolean;
  children: React.ReactNode;
  isOpen: boolean;
  title?: string;
}

function Dialog({ bg, children, isOpen, title }: DialogProps) {
  return (
    <div
      className={classnames(
        'absolute h-screen w-screen z-10 bg-black bg-opacity-75 flex justify-center',
        {
          hidden: !isOpen,
        }
      )}
    >
      <div
        className={classnames('m-auto max-w-lg', {
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
    </div>
  );
}

export default Dialog;
