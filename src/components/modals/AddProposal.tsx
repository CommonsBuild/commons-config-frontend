import { useState } from 'react';
import Modal from './Modal';
import Input from '@/components/Input';

interface AddProposalProps {
  isOpen: boolean;
  handleClose: () => void;
  onClick: (step: (number | string)[], param: string) => void;
}

function AddProposal({ isOpen, handleClose, onClick }: AddProposalProps) {
  const [proposal, setProposal] = useState({
    requestedAmount: '',
    commonPool: '',
    effectiveSupply: '',
  });
  const { requestedAmount, commonPool, effectiveSupply } = proposal;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProposal((previousProposal) => ({
      ...previousProposal,
      [name]: value,
    }));
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title="Add a proposal">
      <div className="max-w-sm m-auto">
        <p className="font-inter text-neon-light pt-3">
          How much funding is the simulated proposal requesting?
        </p>
        <Input
          name="requestedAmount"
          value={requestedAmount}
          param="Requested Amount"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
          }
          placeholder="wxDAI"
        />
        <p className="font-inter text-neon-light pt-3">
          How much wxDAI is being governed by Conviction Voting
        </p>
        <Input
          name="commonPool"
          value={commonPool}
          param="Common Pool"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
          }
          placeholder="wxDAI"
        />
        <p className="font-inter text-neon-light pt-3">
          How many TEC tokens are Actively Voting in Conviction Voting?
        </p>
        <p className="font-inter text-gray-500 text-xs pt-2">
          Hatchers will have ~2 million TEC tokens they can vote with.
        </p>
        <Input
          name="effectiveSupply"
          value={effectiveSupply}
          param="Effective Supply"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
          }
          placeholder="wxDAI"
        />
        <a
          className="flex justify-center border border-neon my-3"
          onClick={() => {
            onClick(
              [
                Number(requestedAmount),
                Number(commonPool),
                Number(effectiveSupply),
              ],
              'tableScenarios'
            );
            handleClose();
          }}
        >
          <span className="font-bj font-bold text-xs text-neon uppercase p-2 py-3">
            add proposal
          </span>
        </a>
      </div>
    </Modal>
  );
}
export default AddProposal;
