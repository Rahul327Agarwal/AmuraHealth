import React, { useEffect, useRef, useState } from 'react';
import { LeftIcon, RightIcon } from '../../SVGs/Common';
import { useStyles } from './GrabSwiper.styles';
import { IProps } from './GrabSwiper.types';

const TabSwiper = (props: IProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isRightEnd, setIsRightEnd] = useState(false);
  const [isLeftEnd, setIsLeftEnd] = useState(false);
  const { navButtonSensitivity } = props;
  const containerRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const pointerState = useRef({
    isDragging: false,
  });

  const scrollLeft = () => {
    if (containerRef.current) containerRef.current.scrollLeft -= navButtonSensitivity ?? 200;
  };
  const scrollRight = () => {
    if (containerRef.current) containerRef.current.scrollLeft += navButtonSensitivity ?? 200;
  };

  const checkForEnds = () => {
    const container = containerRef.current;
    const scrollPosition = Math.round(container?.scrollLeft);
    const maxScrollableWidth = container?.scrollWidth - container?.clientWidth;
    if (scrollPosition === 0) setIsLeftEnd(true);
    else setIsLeftEnd(false);

    if (scrollPosition + 5 > maxScrollableWidth) setIsRightEnd(true);
    else setIsRightEnd(false);
  };

  useEffect(() => {
    checkForEnds();
  }, [props.children]);

  // on scroll
  useEffect(() => {
    const container = containerRef.current;
    const handleScroll = () => {
      checkForEnds();
    };
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  //   on mouseDown
  useEffect(() => {
    const container = containerRef.current;
    const handleClick = () => {
      pointerState.current.isDragging = true;
    };
    container?.addEventListener('pointerdown', handleClick);
    return () => container?.removeEventListener('pointerdown', handleClick);
  }, []);

  // mouse up
  useEffect(() => {
    const container = containerRef.current;
    const handleUp = () => {
      pointerState.current.isDragging = false;
      setIsDragging(false);
    };
    container?.addEventListener('pointerup', handleUp);
    return () => container?.removeEventListener('pointerup', handleUp);
  }, []);

  //   on leave
  useEffect(() => {
    const container = containerRef.current;
    const handleLeave = () => {
      pointerState.current.isDragging = false;
      setIsDragging(false);
    };
    container?.addEventListener('pointerleave', handleLeave);
    return () => container?.removeEventListener('pointerleave', handleLeave);
  }, []);

  //   on drag
  useEffect(() => {
    const container = containerRef.current;
    const handleDrag = (e: PointerEvent) => {
      if (!pointerState.current.isDragging) return;
      setIsDragging(true);
      if (container) container.scrollLeft -= e.movementX;
    };
    container?.addEventListener('pointermove', handleDrag);
    return () => container?.removeEventListener('pointermove', handleDrag);
  }, []);

  const { classes } = useStyles({ ...props, isDragging, isLeftEnd, isRightEnd });

  return (
    <div className={classes.root}>
      {
        <div onClick={scrollLeft} className={`${classes.navigationIcon} ${classes.navigationLeft}`}>
          <LeftIcon />
        </div>
      }
      {/* .............. */}
      <div className={`${classes.swiperContainer}`} ref={containerRef}>
        <div className={classes.slide}>{props.children}</div>
      </div>
      {/* .............. */}
      {
        <div onClick={scrollRight} className={`${classes.navigationIcon} ${classes.navigationRight}`}>
          <RightIcon />
        </div>
      }
    </div>
  );
};

export default TabSwiper;
