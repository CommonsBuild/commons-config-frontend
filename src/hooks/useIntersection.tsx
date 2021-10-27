import { useEffect, useState, useRef } from 'react';

function useIntersection<T>(threshold = 0.75) {
  const ref: any = useRef<T | null>(null);
  const [isIntersecting, setIntersecting] = useState(false);
  const observer = new IntersectionObserver(
    ([entry]) => {
      setIntersecting(entry.isIntersecting);
    },
    { threshold }
  );
  useEffect(() => {
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, isIntersecting];
}

export default useIntersection;
