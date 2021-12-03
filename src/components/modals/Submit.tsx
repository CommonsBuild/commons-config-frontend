import Backdrop from './Backdrop';
import Modal from './Modal';

interface SubmitDialogProps {
  handleClose: () => void;
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
      <Modal
        handleClose={handleClose}
        isOpen={isOpen && url !== undefined}
        customButton={
          <a href={url} target="_blank" rel="noreferrer">
            <button className="h-14 px-6 mx-auto bg-neon outline-none	hover:bg-neon-light-600 disabled:opacity-50 disabled:bg-gray-400 disabled:text-gray-300 w-full">
              <span className="font-bj font-bold text-lg uppercase cursor-pointer">
                view your proposal
              </span>
            </button>
          </a>
        }
      >
        <h2 className="font-bj font-bold text-xl text-neon text-center py-6 px-4">
          Congratulations!
        </h2>
        <div className="font-bj text-neon-light px-16 text-center">
          Your proposal was created successfully!
        </div>
      </Modal>
    </>
  );
}

export default SubmitDialog;
