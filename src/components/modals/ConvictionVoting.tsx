import Modal from './Modal';
import { ConvictionGrowthChart } from '@/components/charts';

interface ConvictionGrowthDialogProps {
  convictionGrowth: string;
  convictionPercentage: number[];
  dataPoints: { [key: string]: number }[];
  handleClose: () => void;
  isOpen: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  timeDays: number[];
}

function ConvictionGrowthDialog({
  convictionGrowth,
  convictionPercentage,
  dataPoints,
  handleClose,
  isOpen,
  onChange,
  timeDays,
}: ConvictionGrowthDialogProps) {
  return (
    <Modal handleClose={handleClose} isOpen={isOpen} title="Conviction Growth">
      <div className="py-8 m-auto w-11/12">
        <ConvictionGrowthChart
          convictionPercentage={convictionPercentage}
          timeDays={timeDays}
          dataPoints={dataPoints}
        />
      </div>
      <div className="h-12 border border-gray-500 w-2/3 mx-auto flex justify-center items-center">
        <span className="font-bj font-bold text-neon-light uppercase">
          conviction growth: {convictionGrowth}
        </span>
        <span className="font-inter font-medium text-gray-200 text-xs px-1 pt-1">
          days
        </span>
      </div>
      <div className="py-4 px-16">
        <input
          className="slider"
          name="convictionGrowth"
          type="range"
          min="1"
          max="60"
          value={convictionGrowth}
          onChange={onChange}
        />
      </div>
    </Modal>
  );
}

export default ConvictionGrowthDialog;
