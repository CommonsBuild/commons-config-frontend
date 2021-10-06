import ChartLegend from '@/components/ChartLegend';
import { TaoVotingPie } from '@/components/charts';
import Dialog from './Dialog';

const pieChartLegend = [
  { name: 'non-quiet voting period', bgColor: 'yellow' },
  { name: 'quiet ending period', bgColor: 'orange' },
  { name: 'quiet ending extension', bgColor: 'blue' },
  { name: 'execution delay', bgColor: 'turquoise' },
];

interface TaoVotingPieDialogProps {
  data: { [key: string]: number };
  isOpen: boolean;
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
}

function TaoVotingPieDialog({
  data,
  isOpen,
  handleClose,
}: TaoVotingPieDialogProps) {
  return (
    <Dialog title="Disputable Voting" isOpen={isOpen}>
      <div style={{ maxWidth: '350px' }} className="py-8 m-auto">
        <TaoVotingPie
          nonQuietVotingPeriod={data.nonQuietVotingPeriod}
          quietEndingPeriod={data.quietEndingPeriod}
          quietEndingExtension={data.quietEndingExtension}
          executionDelay={data.executionDelay}
        />
      </div>
      <div className="grid grid-cols-2 px-12">
        {pieChartLegend.map((legend) => (
          <ChartLegend name={legend.name} bgColor={legend.bgColor} />
        ))}
      </div>
      <button
        className="flex m-auto uppercase font-bj font-bold text-neon text-xs py-6"
        onClick={handleClose}
      >
        close
      </button>
    </Dialog>
  );
}

export default TaoVotingPieDialog;
