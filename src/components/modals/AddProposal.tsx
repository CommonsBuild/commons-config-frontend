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
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      title="Add Proposal"
      customButton={
        <button
          className="h-14 px-6 mx-auto bg-neon outline-none	hover:bg-neon-light-600 disabled:opacity-50 disabled:bg-gray-400 disabled:text-gray-300 w-full"
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
          <span className="font-bj font-bold text-lg uppercase cursor-pointer">
            Add Proposal
          </span>
        </button>
      }
    >
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
          placeholder="GIV"
        />
        <p className="font-inter text-neon-light pt-3">
          How much GIV is being governed by Conviction Voting
        </p>
        <Input
          name="commonPool"
          value={commonPool}
          param="Common Pool"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
          }
          placeholder="GIV"
        />
        <p className="font-inter text-neon-light pt-3">
          How many GIV are Actively Voting in Conviction Voting?
        </p>
        <p className="font-inter text-gray-200 text-xs pt-3 pb-1">
          Hatchers will have ~2 million GIV they can vote with.
        </p>
        <Input
          name="effectiveSupply"
          value={effectiveSupply}
          param="Effective Supply"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
          }
          placeholder="GIV"
        />
      </div>
    </Modal>
  );
}
export default AddProposal;
