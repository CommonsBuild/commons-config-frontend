import { motion } from 'framer-motion';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import { Card } from '@/components/_global';

interface SummaryContainerProps {
  inputList: { [key: string]: string }[];
  title: string;
  textAreaName: string;
  textAreaValue: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTextAreaChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function SummaryContainer({
  inputList,
  title,
  textAreaName,
  textAreaValue,
  onChange,
  onTextAreaChange,
}: SummaryContainerProps) {
  return (
    <motion.div layout className="flex justify-around">
      <Card title={title} hiddenButton minWidth>
        {inputList.map((input) => (
          <Input
            key={input.name}
            name={input.name}
            param={input.param}
            placeholder={input.placeholder}
            tooltipText={input.tooltipText}
            value={input.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onChange(event)
            }
          />
        ))}
      </Card>
      <div className="flex flex-col flex-grow my-4 mx-8 py-6 px-9 max-w-xl">
        <h2 className="font-bj text-sm text-neon-light py-4">Your Strategy</h2>
        <TextArea
          name={textAreaName}
          placeholder="Why did you choose these settings ... ?"
          value={textAreaValue}
          onChange={onTextAreaChange}
        />
      </div>
    </motion.div>
  );
}

export default SummaryContainer;
