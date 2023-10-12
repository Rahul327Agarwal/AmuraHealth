import { useEffect, useRef, useState } from 'react';
import { getCardFixedWidth } from './MyTeam.function';

/**
 * In `MyTeam` Panel
 *
 * Returns the number of cards that can fit in the parent container
 * where width is constant, pulled from `getCardFixedWidth` function
 */
export function useCardsSizeInfo(options?: { extraSpace?: number; cardsSpacing?: number }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [cardsCanFit, setCardsCanFit] = useState(0);

  useEffect(() => {
    if (!parentRef.current) return;

    const cardsFixedWidth = getCardFixedWidth();

    const calculateSize = (parentWidth: number) => {
      const cardsCanFit = Math.floor(
        (parentWidth - (options?.extraSpace ?? 0)) / (cardsFixedWidth + (options?.cardsSpacing ?? 0))
      );
      setCardsCanFit(cardsCanFit);
    };

    calculateSize(parentRef.current.clientWidth);

    const onWidthChange: ResizeObserverCallback = ([e]) => calculateSize(e.contentRect.width);

    const resizeObserver = new ResizeObserver(onWidthChange);
    resizeObserver.observe(parentRef.current!);

    return () => {
      resizeObserver.disconnect();
    };
  }, [parentRef]);

  return { parentRef, numOfCardsCanFit: cardsCanFit < 0 ? 0 : cardsCanFit };
}
