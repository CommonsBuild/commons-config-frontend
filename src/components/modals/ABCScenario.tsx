import Dialog from './Dialog';

interface ABCScenarioDialogProps {
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}

function ABCScenarioDialog({ handleClose, isOpen }: ABCScenarioDialogProps) {
  return (
    <Dialog isOpen={isOpen} title="What is a Market Scenario?">
      <p className="font-inter text-lg text-neon-light text-center p-4">
        Market Scenarios have been designed as a pre-set series of 3 steps
        (transactions) in order to aid in the digestion of ABC mechanics.
        Simulating typical market events, there are two scenarios to choose from
        on the ABC tool: <b>Bullish</b> or <b>Bearish</b>.
      </p>
      <p className="font-inter text-lg text-neon-light text-center p-4">
        By choosing one or the other take note of any theoretical profits or
        losses between Step 1 and Step 3 resulting from Step 2 and the funds
        being contributed to the Common Pool.
      </p>
      <p className="font-inter text-lg text-neon-light text-center p-4">
        Market Scenarios have no impact on the Commons Configuration parameters.
      </p>
      <button
        className="flex m-auto uppercase font-bj font-bold text-neon text-xs py-6"
        onClick={handleClose}
      >
        close
      </button>
    </Dialog>
  );
}

export default ABCScenarioDialog;
