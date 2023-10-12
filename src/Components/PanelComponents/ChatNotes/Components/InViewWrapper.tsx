import { useInView } from 'framer-motion';
import { memo, useRef } from 'react';
import MUISkeleton from '../../../LibraryComponents/MUISkeleton/MUISkeleton';

function InViewWrapper({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref}>
      {isInView ? (
        children
      ) : (
        <MUISkeleton
          animation="wave"
          variant="rectangular"
          height="135px"
          width="90%"
          style={{ margin: '0 16px', minWidth: '232px' }}
        />
      )}
    </span>
  );
}

export default memo(InViewWrapper);
