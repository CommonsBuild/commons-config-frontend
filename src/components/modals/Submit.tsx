import Backdrop from './Backdrop';
import Modal from './Modal';
import { NeonButton } from '@/components/btns';

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
          <NeonButton fullWidth href={url} passHref onClick={handleClose}>
            <span>check your submission</span>
          </NeonButton>
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
