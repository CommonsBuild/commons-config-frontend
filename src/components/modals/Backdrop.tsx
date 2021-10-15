import classnames from 'classnames';

interface BackdropProps {
  children: React.ReactNode;
  isOpen: boolean;
}

function Backdrop({ children, isOpen }: BackdropProps) {
  return (
    <div
      className={classnames(
        'fixed pin z-100 bg-background h-full w-full flex justify-center items-center',
        {
          hidden: !isOpen,
        }
      )}
    >
      {children}
    </div>
  );
}

export default Backdrop;
