interface RadioButtonProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  label: string;
  name: string;
  value: string;
}

function RadioButton({
  checked,
  onChange,
  id,
  label,
  name,
  value,
}: RadioButtonProps) {
  return (
    <p className="mx-4">
      <input
        id={id}
        type="radio"
        className="hidden radio"
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <label
        htmlFor={id}
        className="flex items-center cursor-pointer font-bj text-sm text-neon-light radio"
      >
        <span className="w-5 h-5 inline-block mr-2 rounded-full border border-grey flex-no-shrink radio" />
        {label}
      </label>
    </p>
  );
}

export default RadioButton;
