import { useInView } from 'framer-motion';
import { memo, useRef } from 'react';

interface IProps {
  children: React.ReactNode;
  fallbackUI: React.ReactNode;
}

function InViewWrapper({ children, fallbackUI }: IProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return <span ref={ref}>{isInView ? children : fallbackUI}</span>;
}

export default memo(InViewWrapper);
