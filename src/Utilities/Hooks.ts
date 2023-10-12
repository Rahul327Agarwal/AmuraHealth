import { useEffect, useRef, useState } from 'react';

export const useDivHeight = () => {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const handleResize = (height: number) => {
      setHeight(height);
    };

    handleResize(ref.current.clientHeight);

    const onResize: ResizeObserverCallback = ([e]) => handleResize(e.contentRect.height);

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(ref.current!);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return { height, ref };
};

export const useScrollDetection = () => {
  const [isPanelScrolled, setIsPanelScrolled] = useState(false);
  const onScroll = (scrollTop) => {
    scrollTop <= 0 ? setIsPanelScrolled(false) : setIsPanelScrolled(true);
  };
  return { onScroll, isPanelScrolled };
};
