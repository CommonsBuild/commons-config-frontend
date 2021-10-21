import Dialog from './Dialog';
import { NeonButton } from '@/components/btns';

interface AdvancedParametersDialogProps {
  handleClose: () => void;
  isOpen: boolean;
}

function AdvancedParametersDialog({
  isOpen,
  handleClose,
}: AdvancedParametersDialogProps) {
  return (
    <Dialog isOpen={isOpen} title="Advanced Settings">
      <div className="py-4 px-10">
        <p className="font-bj text-base text-neon-light pb-4">
          In the Advanced Settings there are many parameters that could have
          severe impacts on the Commons. Advanced Settings are for power-users
          who have in-depth knowledge on Commons Configurations.
        </p>
        <p className="font-bj font-bold text-base text-neon-light pb-4">
          Follow these links if you desire to learn more about Advanced
          Settings:
        </p>
        <a
          href="https://forum.tecommons.org/t/the-power-of-defaults-in-the-commons-configuration-dashboard/511"
          target="_blank"
          rel="noreferrer"
          className="block font-bj font-bold text-neon leading-loose"
        >
          The Power of Defaults
        </a>
        <a
          href="https://1hive.gitbook.io/gardens/"
          target="_blank"
          rel="noreferrer"
          className="block font-bj font-bold text-neon leading-loose"
        >
          Gardens Overview
        </a>
        <a
          href="https://1hive.gitbook.io/celeste/"
          target="_blank"
          rel="noreferrer"
          className="block font-bj font-bold text-neon leading-loose"
        >
          Disputability & Celeste
        </a>
        <a
          href="https://forum.tecommons.org/c/defi-legos-and-how-they-work-together/adv-ccd-params/27"
          target="_blank"
          rel="noreferrer"
          className="block font-bj font-bold text-neon leading-loose"
        >
          Advanced CCD Settings (TEC Forum)
        </a>
      </div>
      <div className="flex justify-center py-8 mx-36">
        <NeonButton fullWidth onClick={handleClose}>
          OK
        </NeonButton>
      </div>
    </Dialog>
  );
}

export default AdvancedParametersDialog;
