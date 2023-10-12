import { useInView } from 'framer-motion';
import { memo, useRef } from 'react';
import MUISkeleton from '../../../../LibraryComponents/MUISkeleton/MUISkeleton';

function InViewWrapper({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <span ref={ref}>
      {isInView ? (
        children
      ) : (
        <MUISkeleton animation="wave" variant="rectangular" height="78px" width="100%" style={{ marginBottom: '1px' }} />
      )}
    </span>
  );
}

export default memo(InViewWrapper);
