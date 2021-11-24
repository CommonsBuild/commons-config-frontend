import Modal from './Modal';

interface ABCScenarioDialogProps {
  handleClose: () => void;
  isOpen: boolean;
}

function ABCScenarioDialog({ handleClose, isOpen }: ABCScenarioDialogProps) {
  return (
    <Modal
      handleClose={handleClose}
      isOpen={isOpen}
      title="How to use the ABC Simulator"
    >
      <p className="font-inter text-lg text-neon-light text-center p-4">
        Use the ABC simulator to see how your configurations react to
        transactions. Note that Transaction 0 is the initial buy that mints
        tokens for the Commons itself, and the next 3 transactions are generated
        automatically.
      </p>
      Click the &quot;Add a Transaction&quot; button, to place a buy or sell
      transaction on your ABC configuration. This will simulate a new
      transaction on your ABC. Take note that you can use large transactions to
      explore the full range of the ABC
    </Modal>
  );
}

export default ABCScenarioDialog;
