import { debounce } from '@mui/material';
import { PointerEvent, useEffect, useRef } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { DragIcon } from '../DiagnosticCondition.svg';
import { IDraggableElementProps } from '../DiagnosticCondition.types';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DRAGGABLE_BAR_MAX,
  DRAGGABLE_BAR_MIN,
  DRAGGABLE_BAR_WIDTH,
  TOOLTIP_OFFSET,
} from '../DiagnosticCondition.utils';
import { useStyles } from './Components.styles';
import { getGripperLabel, getYPosition, getYValue, remapRange } from './Graph/Graph.functions';
import { getQuesXLabelFromX } from './StackedBar/StackedBar.functions';

const DraggableElement = (props: IDraggableElementProps) => {
  const {
    verticalBarRef,
    dateRange,
    openAccordion,
    selectedFilter,
    tooltipRef,
    quesBarTooltipRef,
    quesBarDataRef,
    graphsDataRef,
  } = props;
  const { viewMaxDate, viewMinDate, minDate, maxDate } = dateRange;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  const grabIconRef = useRef<HTMLSpanElement>(null);
  const gripperLabelRef = useRef<HTMLSpanElement>(null);
  const barAreaRef = useRef<HTMLDivElement>(null);
  const panGesture = useRef({
    parentX: 0,
    offsetX: 0,
    isPanning: false,
  });

  useEffect(() => {
    if (!barAreaRef.current || !verticalBarRef.current) return;

    const barAreaEl = barAreaRef.current.getBoundingClientRect();
    const barEl = verticalBarRef.current.getBoundingClientRect();
    const xPosition = barEl.x - barAreaEl.x + DRAGGABLE_BAR_WIDTH / 2;
    const xValue = remapRange(xPosition, 0, CANVAS_WIDTH, viewMinDate, viewMaxDate);

    debounceFun(xPosition, xValue);
  }, [dateRange, openAccordion]);

  const setGraphTooltip = (xPosition: number, xValue: number) => {
    /* The `setQesTooltip(xPosition, xValue)` function is responsible for setting the tooltip position
    and content for the question bar. */
    setQesTooltip(xPosition, xValue);

    const gripperLabel = getGripperLabel(xValue, selectedFilter);
    gripperLabelRef.current.innerText = `${gripperLabel}`;

    if (!graphsDataRef.current || !tooltipRef.current || xPosition === undefined) return;
    Object.entries(graphsDataRef.current)?.forEach(([key, data]) => {
      const [accorKey] = key.split('###');
      const tooltip = tooltipRef.current[key];

      if (!openAccordion[accorKey] || !tooltip.current) return;
      const yEle = tooltip.current?.querySelector('[data-y-data]');
      if (!yEle) return;

      const yPosition = getYPosition(xValue, viewMinDate, viewMaxDate, data.datapoints);

      if (yPosition === null) {
        tooltip.current.style.opacity = '0';
        return;
      }
      const yValue = getYValue(yPosition, data.yMin, data.yMax);

      const newY = (1 - (yPosition ?? 0)) * CANVAS_HEIGHT;
      yEle.innerHTML = `${yValue}`;
      const nTextWidth = tooltip.current.offsetWidth;

      let newX = xPosition - TOOLTIP_OFFSET - nTextWidth - DRAGGABLE_BAR_WIDTH;
      newX = newX <= TOOLTIP_OFFSET ? TOOLTIP_OFFSET : newX;

      tooltip.current.style.opacity = '1';
      tooltip.current.style.left = `${newX}px`;
      tooltip.current.style.top = `${newY}px`;
    });
  };

  const setQesTooltip = (xPosition: number, xValue: number) => {
    if (!quesBarDataRef.current || !quesBarTooltipRef.current || xPosition === undefined) return;
    const xMax = new Date().getTime();
    Object.entries(quesBarDataRef.current)?.forEach(([key, data], i) => {
      const [accorKey] = key.split('###');
      const tooltip = quesBarTooltipRef.current[key];

      if (!openAccordion[accorKey] || !tooltip.current) return;
      const yEle = tooltip.current?.querySelector('[data-y-data]');
      if (!yEle) return;

      if (xValue < data.xMin || xValue > xMax) {
        tooltip.current.style.opacity = '0';
        return;
      }

      const xLabel = getQuesXLabelFromX(xValue, data.datapoints, data.xMin, xMax);

      if (xLabel === null) {
        tooltip.current.style.opacity = '0';
        return;
      }

      yEle.innerHTML = `${xLabel}`;
      const nTextWidth = tooltip.current.offsetWidth;

      let newX = xPosition - TOOLTIP_OFFSET - nTextWidth - DRAGGABLE_BAR_WIDTH;
      newX = newX <= TOOLTIP_OFFSET ? TOOLTIP_OFFSET : newX;

      tooltip.current.style.opacity = '1';
      tooltip.current.style.left = `${newX}px`;
      tooltip.current.style.top = `${-6}px`;
    });
  };

  const debounceFun = debounce(setGraphTooltip, 100);

  const onDragStart = (event: PointerEvent<HTMLDivElement>) => {
    const { pointerId, clientX } = event;

    const barAreaEl = barAreaRef.current.getBoundingClientRect();
    const barEl = verticalBarRef.current.getBoundingClientRect();

    grabIconRef.current.setPointerCapture(pointerId);
    grabIconRef.current.style.cursor = 'grabbing';
    panGesture.current.isPanning = true;
    panGesture.current.parentX = barAreaEl.x;
    panGesture.current.offsetX = clientX - barEl.x;
    gripperLabelRef.current.style.opacity = '1';
  };

  const onDragActive = (event: PointerEvent<HTMLDivElement>) => {
    onDragIconStart(event);
    if (!panGesture.current.isPanning) return;

    const { clientX } = event;
    const { parentX, offsetX } = panGesture.current;
    const movement = clientX - parentX - offsetX;

    let newMovement =
      movement <= DRAGGABLE_BAR_MIN ? DRAGGABLE_BAR_MIN : movement >= DRAGGABLE_BAR_MAX ? DRAGGABLE_BAR_MAX : movement;

    let xPosition = newMovement + DRAGGABLE_BAR_WIDTH / 2;

    let xValue = remapRange(xPosition, 0, CANVAS_WIDTH, viewMinDate, viewMaxDate);

    if (Math.ceil(xValue) > maxDate) {
      xPosition = remapRange(maxDate, viewMinDate, viewMaxDate, 0, CANVAS_WIDTH);
      newMovement = xPosition - DRAGGABLE_BAR_WIDTH / 2;
      xValue = maxDate;
    }
    if (Math.floor(xValue) < minDate) {
      xPosition = remapRange(minDate, viewMinDate, viewMaxDate, 0, CANVAS_WIDTH);
      newMovement = xPosition - DRAGGABLE_BAR_WIDTH / 2;
      xValue = minDate;
    }

    verticalBarRef.current.style.left = `${newMovement}px`;
    verticalBarRef.current.setAttribute('data-xposition', `${xPosition}`);
    verticalBarRef.current.setAttribute('data-focus-date', `${xValue}`);

    setGraphTooltip(xPosition, xValue);
  };

  const onDragEnd = (event: PointerEvent<HTMLDivElement>) => {
    panGesture.current.isPanning = false;
    grabIconRef.current.style.cursor = 'grab';
    onRemoveDragIcon();
  };

  const onDragIconStart = (event: PointerEvent<HTMLDivElement>) => {
    const barEl = verticalBarRef.current.getBoundingClientRect();
    const iconEl = grabIconRef.current.getBoundingClientRect();
    const relativeY = event.clientY - barEl.top - iconEl.height / 2;
    if (relativeY + iconEl.height / 2 <= 0) return onRemoveDragIcon();

    grabIconRef.current.style.visibility = 'unset';
    grabIconRef.current.style.pointerEvents = 'unset';
    grabIconRef.current.style.translate = `-50% ${relativeY}px`;
  };

  const onRemoveDragIcon = () => {
    grabIconRef.current.style.cursor = 'grab';
    grabIconRef.current.style.visibility = 'hidden';
    grabIconRef.current.style.pointerEvents = 'none';
    gripperLabelRef.current.style.opacity = '0';
  };

  return (
    <div className={classes.draggableBarArea} ref={barAreaRef}>
      <div
        className={classes.draggableBar}
        onPointerEnter={onDragIconStart}
        onPointerDown={onDragStart}
        onPointerMove={onDragActive}
        onPointerLeave={onDragEnd}
        onPointerUp={onDragEnd}
        ref={verticalBarRef}
        data-xPosition={`${DRAGGABLE_BAR_MAX}`}
      >
        <span ref={grabIconRef} className={classes.dragIcon}>
          <DragIcon />
        </span>
        <span ref={gripperLabelRef} className={`${commonClasses.caption12Regular} ${classes.focusLabel}`} />
      </div>
    </div>
  );
};

export default DraggableElement;
