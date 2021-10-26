import Backdrop from './Backdrop';
import Dialog from './Dialog';

interface SubmitDialogProps {
  handleClose: React.MouseEventHandler<HTMLElement>;
  isOpen: boolean;
  loading: boolean;
  url: string;
}

function SubmitDialog({
  handleClose,
  isOpen,
  loading,
  url,
}: SubmitDialogProps) {
  return (
    <>
      <Backdrop isOpen={loading}>
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-neon" />
      </Backdrop>
      <Dialog isOpen={isOpen && url !== undefined}>
        <h2 className="font-bj font-bold text-xl text-neon text-center py-6 px-4">
          Congratulations!
        </h2>
        <div className="font-bj text-neon-light px-16 text-center">
          Your proposal was created successfully! To see your submission,{' '}
          <a
            className="font-bj font-bold text-neon"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            click here!
          </a>
        </div>
        <button
          className="flex m-auto uppercase font-bj font-bold text-neon text-xs py-6"
          onClick={handleClose}
        >
          close
        </button>
      </Dialog>
    </>
  );
}

export default SubmitDialog;
