interface NeonButtonProps {
  name: string;
}

function NeonButton(props: NeonButtonProps) {
  const { name } = props;
  return (
    <button className="w-full h-14 mx-auto font-bj font-bold text-lg bg-neon hover:bg-neon-light-600 uppercase">
      {name}
    </button>
  );
}

export default NeonButton;
