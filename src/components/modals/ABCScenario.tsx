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
        Watch the graph and the table below the graph to see how your
        configuration reacts to transactions. Note that Transaction 0 is the
        initial buy that mints tokens for the Commons itself, and the following
        3 transactions are generated automatically.
      </p>
      <p className="font-inter text-lg text-neon-light text-center p-4">
        Click the &quot;Simulate a Transaction&quot; button, to place a buy or
        sell transaction on your ABC configuration. This will add a new
        transaction on the table and the graph. Take note that you can use large
        transactions to explore the full range of the ABC.
      </p>
    </Modal>
  );
}

export default ABCScenarioDialog;
