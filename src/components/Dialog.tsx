import classnames from 'classnames';

interface DialogProps {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
}

function Dialog({ children, isOpen, title }: DialogProps) {
  return (
    <div
      className={classnames(
        'absolute h-screen w-screen z-20 bg-black bg-opacity-75 flex justify-center',
        {
          hidden: !isOpen,
        }
      )}
    >
      <div className="bg-black m-auto max-w-4xl p-8">
        <h1 className="font-bj font-bold text-neon-light text-4xl text-center">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}

export default Dialog;
