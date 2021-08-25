interface CheckboxProps {
  text: string;
}
function Checkbox({ text }: CheckboxProps) {
  return (
    <div className="flex items-center">
      <input type="checkbox" className="w-4 h-4 text-white rounded-none" />
      <label className="ml-2 block text-white">{text}</label>
    </div>
  );
}

export default Checkbox;
