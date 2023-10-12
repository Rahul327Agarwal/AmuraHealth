import { useRef } from 'react';
import { CANVAS_HEIGHT, DATAPOINT_CURSOR, TOOLTIP_OFFSET } from '../../DiagnosticCondition.utils';
import { TDLocation } from './Graph.types';

export function useGraphPan() {
  const dataTooltipRef = useRef<HTMLDivElement>();
  const isMoveStart = useRef(false);
  const datapointLocation = useRef<TDLocation[]>([]);

  const onMouseEnter = () => {
    isMoveStart.current = true;
    dataTooltipRef.current.style.opacity = '0';
  };

  const onMouseHover = (event) => {
    if (!isMoveStart.current || !datapointLocation.current) return;
    const rect = event.target.getBoundingClientRect();
    const xPosition = event.clientX - rect.left;
    const yPosition = event.clientY - rect.top;

    const curData = datapointLocation.current.find((v) => {
      const xMin = v.xPos - DATAPOINT_CURSOR / 2;
      const xMax = v.xPos + DATAPOINT_CURSOR / 2;
      const yMin = v.yPos - DATAPOINT_CURSOR / 2;
      const yMax = v.yPos + DATAPOINT_CURSOR / 2;

      return xMin <= xPosition && xMax >= xPosition && yMin <= yPosition && yMax >= yPosition;
    });

    if (!curData) {
      dataTooltipRef.current.style.opacity = '0';
      return;
    }

    const yEle = dataTooltipRef.current.querySelector('[data-y-data]');
    const xEle = dataTooltipRef.current.querySelector('[data-x-data]');

    let newY = curData.yPos;
    yEle.innerHTML = `${curData.yValue}`;
    const nTextWidth = dataTooltipRef.current.offsetWidth;

    let newX = curData.xPos - TOOLTIP_OFFSET - nTextWidth;
    newX = newX <= TOOLTIP_OFFSET ? curData.xPos + TOOLTIP_OFFSET : newX;
    xEle.innerHTML = `${curData.xValue}`;

    const nTextHeight = dataTooltipRef.current.offsetHeight;

    const isMaxTop = newY - nTextHeight / 2 - TOOLTIP_OFFSET <= TOOLTIP_OFFSET;
    const maxBottom = newY + nTextHeight / 2 + TOOLTIP_OFFSET >= CANVAS_HEIGHT;

    newY = isMaxTop ? TOOLTIP_OFFSET + nTextHeight / 2 : maxBottom ? CANVAS_HEIGHT - nTextHeight / 2 - TOOLTIP_OFFSET : newY;

    dataTooltipRef.current.style.opacity = '1';
    dataTooltipRef.current.style.left = `${newX}px`;
    dataTooltipRef.current.style.top = `${newY}px`;
  };

  const onMouseLeave = () => {
    isMoveStart.current = false;
    dataTooltipRef.current.style.opacity = '0';
  };

  return { dataTooltipRef, datapointLocation, onMouseEnter, onMouseHover, onMouseLeave };
}
