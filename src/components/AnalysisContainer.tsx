import { useEffect } from 'react';
import { useIntersection } from '@/hooks';

interface AnalysisContainerProps {
  children: React.ReactNode;
  onVisible: () => void;
}

function AnalysisContainer({ children, onVisible }: AnalysisContainerProps) {
  const [ref, isVisible] = useIntersection<HTMLDivElement>();

  useEffect(() => {
    if (isVisible) {
      onVisible();
    }
  }, [isVisible]);

  return <div ref={ref}>{children}</div>;
}

export default AnalysisContainer;
