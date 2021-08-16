interface NeonButtonProps {
  name: string;
}

function NeonButton(props: NeonButtonProps) {
  const { name } = props;
  return (
    <button
      disabled
      className="w-full h-14 mx-auto font-bj font-bold text-lg bg-neon hover:bg-neon-light-600 uppercase disabled:opacity-50 disabled:bg-gray-400 disabled:text-gray-300"
    >
      {name}
    </button>
  );
}

export default NeonButton;
