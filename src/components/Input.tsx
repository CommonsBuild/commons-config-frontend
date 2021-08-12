interface InputProps {
  name: string;
  placeholder: string;
}

function Input(props: InputProps) {
  const { name, placeholder } = props;
  return (
    <div className="px-9 pb-2 text-gray-100 lg:grid lg:grid-cols-2">
      <div className="font-bj self-center py-1">{name}</div>
      <div className="relative h-11">
        <input className="font-bj font-bold text-neon-light text-xl w-full h-full pl-3 border-2 border-gray-500 hover:border-neon focus:border-neon bg-transparent outline-none placeholder-right" />
        <span className="absolute right-3 top-2/4 transform -translate-y-2/4 font-inter text-xs text-gray-300">
          {placeholder}
        </span>
      </div>
    </div>
  );
}

export default Input;
