import { useState } from 'react';
import Dialog from './Dialog';
import { LabeledRadioButton } from '@/components/btns';

interface ABCAddStepDialogProps {
  handleClose: React.MouseEventHandler<HTMLElement>;
  onClick: (step: (number | string)[]) => void;
  isOpen: boolean;
}

interface StepValues {
  type: string;
  value: string;
}

function ABCAddStepDialog({
  handleClose,
  onClick,
  isOpen,
}: ABCAddStepDialogProps) {
  const [stepData, setStepData] = useState<StepValues>({
    type: 'wxDAI',
    value: '-',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const { value } = event.target;

    setStepData({
      ...stepData,
      [name]: value,
    });
  };

  return (
    <Dialog isOpen={isOpen}>
      <div className="bg-black-200 px-8 py-6">
        <span className="block font-bj font-bold text-xs text-neon-light uppercase pb-2">
          add transaction to experience your bonding curve
        </span>
        <span className="font-inter text-xs text-gray-400">
          Make a Buy or Sell onto your Augmented Bonding Curve to experiment
          with your configuration settings.
        </span>
      </div>
      <div className="p-4">
        <LabeledRadioButton
          margin
          pX
          checked={stepData.type === 'wxDAI'}
          id="buy"
          label="buy"
          name="type"
          size="big"
          value="wxDAI"
          onChange={(event) => handleChange(event)}
        />
        <LabeledRadioButton
          margin
          pX
          checked={stepData.type === 'TEC'}
          id="sell"
          label="sell"
          name="type"
          size="big"
          value="TEC"
          onChange={(event) => handleChange(event)}
        />
        <div className="relative h-12 bg-black-200 my-3">
          <input
            className="font-bold text-neon-light text-xl w-full h-full pl-3 border-2 border-gray-500 focus:border-neon hover:border-gray-400 bg-transparent outline-none placeholder-right"
            name="value"
            value={stepData.value}
            onChange={(event) => handleChange(event)}
          />
          <div className="absolute right-3 top-2/4 transform -translate-y-2/4">
            <span className="font-inter text-xs text-gray-300">
              {stepData.type}
            </span>
          </div>
        </div>
        <a
          className="flex justify-center border border-neon my-3"
          onClick={(e) => {
            onClick([Number(stepData.value), stepData.type]);
            handleClose(e);
          }}
        >
          <span className="font-bj font-bold text-xs text-neon uppercase p-2 py-3">
            add a step
          </span>
        </a>
        <button
          className="flex m-auto uppercase font-bj font-bold text-neon text-xs pt-3"
          onClick={handleClose}
        >
          close
        </button>
      </div>
    </Dialog>
  );
}

export default ABCAddStepDialog;
