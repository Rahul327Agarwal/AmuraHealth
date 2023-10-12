import { useEffect, useRef, useState } from 'react';
import { useGesture, usePinch } from '@use-gesture/react';
import { motion } from 'framer-motion';
import QuickPinchZoom, { make3dTransformValue } from 'react-quick-pinch-zoom';
import { useStyles } from '../MediaViewer.styles';

export interface ZoomableImageProps {
  children: React.ReactNode;
}

export function ZoomableImage(props: ZoomableImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { classes } = useStyles({} as any);

  return (
    <>
      <div className={classes.zoomableImgWrapper}>
        <QuickPinchZoom
          doubleTapToggleZoom={false}
          centerContained
          doubleTapZoomOutOnMaxScale={true}
          maxZoom={2}
          onUpdate={({ x, y, scale }) => {
            const { current: img } = wrapperRef;
            if (img) {
              const value = make3dTransformValue({ x, y, scale });
              img.style.setProperty('transform', value);
            }
          }}
        >
          <motion.div ref={wrapperRef}>{props.children}</motion.div>
        </QuickPinchZoom>
      </div>
    </>
  );
}
