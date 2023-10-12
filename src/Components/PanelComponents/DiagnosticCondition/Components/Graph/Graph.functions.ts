import { round } from 'lodash';
import { CANVAS_HEIGHT, CANVAS_WIDTH, DATAPOINT_CURSOR } from '../../DiagnosticCondition.utils';
import { TDLocation, TDataPointN } from './Graph.types';
import { IFilterObject } from '../../DiagnosticCondition.types';
import { GraphRulerUtils } from '../GraphRuler/GraphRuler.utils';
import { format } from 'date-fns';
import { GetRulerLinesFn, RulerLine } from '../GraphRuler/GraphRuler.types';
import { MutableRefObject } from 'react';
import { TStackedDataPoint } from '../StackedBar/StackedBar.types';

type vectorFun = (point: { x: number; y: number }) => { x: number; y: number };

type drawFun = (
  ctx: CanvasRenderingContext2D,
  datapoints: TDataPointN[],
  getVector: vectorFun,
  startClip: number,
  endClip: number,
  dLocation: MutableRefObject<TDLocation[]>
) => void;

export const drawGraphLine: drawFun = (ctx, datapoints, getVector, startClip, endClip) => {
  ctx.beginPath();
  for (let i = 0; i < datapoints.length; i++) {
    const isLastIndex = i === datapoints.length - 1;
    const { x, y } = getVector(datapoints[i]);

    if (!isLastIndex) {
      const clipIndex = i + 1 > datapoints.length - 1 ? i : i + 1;
      if (datapoints[clipIndex].x < startClip) {
        continue;
      }
      if (datapoints[i].x > endClip) {
        break;
      }

      const { x: x2, y: y2 } = getVector(datapoints[i + 1]);

      if (i === 0) {
        ctx.moveTo(x, y);
      }

      ctx.lineTo(x, y);
      ctx.lineTo(x2, y);

      if (i === datapoints.length - 2) {
        ctx.lineTo(x2, y2);
      }
    }
  }
  ctx.strokeStyle = '#A6A6A6';
  ctx.lineWidth = 1;
  ctx.setLineDash([0, 0]);
  ctx.stroke();
  ctx.closePath();
};

export const drawGraphCircle: drawFun = (ctx, datapoints, getVector, startClip, endClip, dLocation) => {
  const locations: TDLocation[] = [];
  for (let i = 0; i < datapoints.length; i++) {
    const isLastIndex = i === datapoints.length - 1;
    const { x, y } = getVector(datapoints[i]);

    if (!isLastIndex) {
      const clipIndex = i + 1 > datapoints.length - 1 ? i : i + 1;
      if (datapoints[clipIndex].x < startClip) {
        continue;
      }
      if (datapoints[i].x > endClip) {
        break;
      }
      const curData = datapoints[i + 1];
      const { x: x2, y: y2 } = getVector(curData);

      if (i === datapoints.length - 2) {
        ctx.beginPath();
        ctx.arc(x2, y2, DATAPOINT_CURSOR / 2, 0, 2 * Math.PI);
        ctx.fillStyle = '#5C5A61';
        ctx.fill();
        ctx.closePath();
        locations.push({
          xPos: x2,
          yPos: y2,
          xValue: format(new Date(curData.x), 'dd/MM/yy hh:mm a'),
          yValue: curData.yOriginal,
        });
      }
    }
    ctx.beginPath();
    ctx.arc(x, y, DATAPOINT_CURSOR / 2, 0, 2 * Math.PI);
    ctx.fillStyle = '#5C5A61';
    ctx.fill();
    ctx.closePath();
    locations.push({
      xPos: x,
      yPos: y,
      xValue: format(new Date(datapoints[i].x), 'dd/MM/yy hh:mm a'),
      yValue: datapoints[i].yOriginal,
    });
  }
  dLocation.current = locations;
  // ctx.stroke();
};

export const drawGraph = (
  ctx: CanvasRenderingContext2D,
  getLinesFn: drawFun,
  datapoints: TDataPointN[],
  minValue: number,
  maxValue: number,
  dLocation: MutableRefObject<TDLocation[]>
) => {
  const diffDate = maxValue - minValue;
  const diffDays = diffDate / (1000 * 60 * 60 * 24);

  const singleDayWidth = CANVAS_WIDTH / diffDays;

  const getCorrectedX = (x: number) => {
    const day = (x - minValue) / (1000 * 60 * 60 * 24);
    const resX = day * singleDayWidth;
    return resX;
  };

  const getVector: vectorFun = (point) => {
    const x = getCorrectedX(point.x);
    const y = (1 - point.y) * CANVAS_HEIGHT;
    return { x, y };
  };

  const startClip = minValue;
  const endClip = maxValue;

  getLinesFn(ctx, datapoints, getVector, startClip, endClip, dLocation);
};

export const getYPosition = (xValue: number, viewMinDate: number, viewMaxDate: number, datapoints: TDataPointN[]): number => {
  const onePixelTime = (viewMaxDate - viewMinDate) / CANVAS_WIDTH;

  const xMin = datapoints.at(0).x - onePixelTime * (DATAPOINT_CURSOR / 2);
  const xMax = datapoints.at(-1).x + onePixelTime * (DATAPOINT_CURSOR / 2);

  let foundY: number | null = null;
  if (xValue < xMin || xValue > xMax) {
    return null;
  }
  for (let i = datapoints.length - 1; i >= 0; i--) {
    const dataPoint = datapoints[i];

    if (dataPoint.x <= xValue + onePixelTime * (DATAPOINT_CURSOR / 2)) {
      foundY = dataPoint.y;
      break;
    }
  }
  return foundY;
};

export const getYValue = (yPosition: number, yMin: number, yMax: number) => {
  if (yPosition === null) {
    return '';
  }

  const correctedY = remapRange(yPosition, 0, 1, yMin, yMax);

  return `${round(correctedY, 2)}`;
};

export const remapRange = (value: number, fromMin: number, fromMax: number, toMin: number, toMax: number) => {
  const fromRange = fromMax - fromMin;
  const toRange = toMax - toMin;
  const valueScaled = (value - fromMin) / fromRange;

  return toMin + valueScaled * toRange;
};

export const getGripperLabel = (xValue: number, selectedFilter: IFilterObject) => {
  const timeToShow = new Date(xValue);

  switch (selectedFilter.shortKey) {
    case '25y':
      return format(timeToShow, 'yyyy');
    case '5y':
    case '2y':
    case '1y':
      return format(timeToShow, 'MMM');
    case '6m':
    case '3m':
    case '1m':
    case '2w':
      return format(timeToShow, 'dd');
    case '1w':
      return format(timeToShow, 'hh:mm a');
    case '1d':
      return format(timeToShow, 'hh:mm a');
    case '1h':
      return format(timeToShow, 'hh:mm a');
    default:
      return '';
  }
};

export const seDPI = (
  canvas: React.MutableRefObject<HTMLCanvasElement>,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.imageSmoothingEnabled = true;

  // Get the device pixel ratio
  const dpr = Math.max(window.devicePixelRatio || 1, 2);

  // Set the canvas dimensions accounting for the device pixel ratio
  canvas.current.width = width * dpr;
  canvas.current.height = height * dpr;
  canvas.current.style.width = width + 'px';
  canvas.current.style.height = height + 'px';

  // Scale the context to match the device pixel ratio
  ctx.scale(dpr, dpr);
};
