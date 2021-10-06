import React from 'react';
import { motion, Variants } from 'framer-motion';

interface ChartContainerProps {
  children: React.ReactNode;
  title: string;
}

const titlesFade: Variants = {
  animate: {
    opacity: 1,
    transition: { ease: 'easeIn', duration: 0.6 },
  },
  initial: {
    opacity: 0.8,
    transition: { ease: 'easeIn', duration: 0.6 },
  },
};

function ChartContainer({ children, title }: ChartContainerProps) {
  return (
    <div className="flex flex-col bg-transparent mx-16 mt-4 w-3/5 lg:min-w-2/4">
      <motion.div
        key={title}
        animate="animate"
        initial="initial"
        variants={titlesFade}
      >
        <h1 className="font-bj text-gray-100 text-2xl text-center pt-6 pb-3 lg:text-left">
          {title}
        </h1>
      </motion.div>
      <motion.div layout>{children}</motion.div>
    </div>
  );
}

export default ChartContainer;
