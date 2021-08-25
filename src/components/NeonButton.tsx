import classnames from 'classnames';

interface NeonButtonProps {
  disabled?: boolean;
  fullWidth?: boolean;
  name: string;
}

function NeonButton({ disabled, fullWidth, name }: NeonButtonProps) {
  return (
    <button
      disabled={disabled}
      className={classnames(
        'h-14 mx-auto bg-neon hover:bg-neon-light-600 disabled:opacity-50 disabled:bg-gray-400 disabled:text-gray-300',
        {
          'w-full': fullWidth,
        }
      )}
    >
      <span className="font-bj font-bold text-lg uppercase">{name}</span>
    </button>
  );
}

export default NeonButton;
