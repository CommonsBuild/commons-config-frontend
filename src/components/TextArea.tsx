interface TextAreaProps {
  name?: string;
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({ name, placeholder, value, onChange }: TextAreaProps) {
  return (
    <div className="flex flex-col flex-grow pt-2 pb-4">
      <div className="relative bg-black-200 flex-grow">
        <textarea
          className="font-bold text-neon-light text-xl w-full h-full pl-3 border-2 border-gray-500 focus:border-neon hover:border-gray-400 bg-transparent outline-none resize-none"
          name={name}
          value={value}
          onChange={onChange}
        />
        <div className="absolute left-3 top-6 transform -translate-y-2/4">
          <span className="font-inter text-xs text-gray-300">
            {value ? '' : placeholder}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TextArea;
