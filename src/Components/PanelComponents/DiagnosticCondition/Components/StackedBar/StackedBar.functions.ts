import { TLineRange } from '../../DiagnosticCondition.types';
import { DATAPOINT_CURSOR } from '../../DiagnosticCondition.utils';
import { drawLines, getDays, getGraphYears, getHours, getMinutes, getMonths, getWeeks } from '../GraphRuler/GraphRuler.functions';
import { IDrawLinesProps, TLineObject } from '../GraphRuler/GraphRuler.types';
import { TConfigPayload, TStackedDataPoint } from './StackedBar.types';

type xCorrFun = (x: number) => number;

type drawFun = (ctx: CanvasRenderingContext2D, getCorrectedX: xCorrFun, config: TConfigPayload) => void;

/**
 * The function is used to draw a bar chart using the provided data points on a canvas.
 */
export const drawBar: drawFun = (ctx, getCorrectedX, config) => {
  const { datapoints, width, height, barHeight, minValue: startClip, maxValue: endClip, quesColorMap } = config;
  const y = barHeight === height ? 0 : (height - barHeight) / 2;
  const x_today = getCorrectedX(new Date().getTime());
  for (let i = 0; i < datapoints.length; i++) {
    const datapoint = datapoints[i];

    const next_i = i + 1;
    const last_i = datapoints.length - 1;

    const isLastIndex = i === last_i;
    const x = getCorrectedX(datapoint.x);
    const color = quesColorMap[datapoint.xLabel];

    if (isLastIndex) {
      const x_width = x_today - x;

      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.fillRect(x, y, x_width, barHeight);
      ctx.closePath();
      ctx.stroke();
      break;
    }

    const clipIndex = next_i > last_i ? i : next_i;
    if (datapoints[clipIndex].x < startClip) {
      continue;
    }
    if (datapoint.x > endClip) {
      break;
    }

    const x2 = getCorrectedX(datapoints[next_i].x);
    const x_width = x2 - x;

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, x_width, barHeight);
    ctx.closePath();
    ctx.stroke();
  }
};

/**
 * The function is used to draw a bar chart using the provided data points on a canvas.
 */
export const drawCircle: drawFun = (ctx, getCorrectedX, config) => {
  const { datapoints, width, barHeight, height, minValue: startClip, maxValue: endClip } = config;
  const y = height / 2;

  for (let i = 0; i < datapoints.length; i++) {
    const datapoint = datapoints[i];

    const next_i = i + 1;
    const last_i = datapoints.length - 1;

    const isLastIndex = i === last_i;
    const x = getCorrectedX(datapoint.x);

    if (!isLastIndex) {
      const clipIndex = i + 1 > datapoints.length - 1 ? i : i + 1;
      if (datapoints[clipIndex].x < startClip) {
        continue;
      }
      if (datapoints[i].x > endClip) {
        break;
      }

      const x2 = getCorrectedX(datapoints[next_i].x);

      if (i === datapoints.length - 2) {
        ctx.beginPath();
        ctx.arc(x2, y, DATAPOINT_CURSOR / 2, 0, 2 * Math.PI);
        ctx.fillStyle = '#5C5A61';
        ctx.fill();
        ctx.closePath();
      }
    }

    ctx.beginPath();
    ctx.arc(x, y, DATAPOINT_CURSOR / 2, 0, 2 * Math.PI);
    ctx.fillStyle = '#5C5A61';
    ctx.fill();
    ctx.closePath();
  }
};
/**
 * The function takes in a canvas context, an array of data points, minimum and
 * maximum values, height and width, and draws a stacked bar chart on the canvas.
 */
export const drawStackedGraph = (ctx: CanvasRenderingContext2D, drawFun: drawFun, config: TConfigPayload) => {
  const { minValue, maxValue, width } = config;
  const diffDate = maxValue - minValue;
  const diffDays = diffDate / (1000 * 60 * 60 * 24);

  const singleDayWidth = width / diffDays;

  const getCorrectedX: xCorrFun = (x) => {
    const day = (x - minValue) / (1000 * 60 * 60 * 24);
    const resX = day * singleDayWidth;
    return resX;
  };

  drawFun(ctx, getCorrectedX, config);
};

/**
 * The function sets the device pixel ratio for a canvas element to ensure proper rendering on
 * high-resolution screens.
 */
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

/**
 * The function draws lines on a canvas based on a given theme and common properties.
 * drawing lines on the canvas. It could include properties such as line color, line width, line style,
 * etc.
 */
export const drawTimeLine = (
  ctx: CanvasRenderingContext2D,
  theme: Partial<Record<TLineRange, TLineObject>>,
  commonProps: IDrawLinesProps
) => {
  ctx.beginPath();
  if (theme?.minutes) {
    drawLines(commonProps, ctx, getMinutes, theme.minutes);
  }
  if (theme?.hours) {
    drawLines(commonProps, ctx, getHours, theme.hours);
  }
  if (theme?.days) {
    drawLines(commonProps, ctx, getDays, theme.days);
  }
  if (theme?.weeks) {
    drawLines(commonProps, ctx, getWeeks, theme.weeks);
  }
  if (theme?.months) {
    drawLines(commonProps, ctx, getMonths, theme.months);
  }
  if (theme?.years) {
    drawLines(commonProps, ctx, getGraphYears, theme.years);
  }
  ctx.stroke();
  ctx.closePath();
};

/**
 * The function takes in a value `xValue` and a range of dates, and returns the
 * corresponding xLabel from a list of datapoints if it falls within the range.
 */
export const getQuesXLabelFromX = (xValue: number, datapoints: TStackedDataPoint[], xMin: number, xMax: number): string => {
  if (xValue < xMin || xValue > xMax) return null;

  let foundX: string | null = null;
  for (let i = datapoints.length - 1; i >= 0; i--) {
    const dataPoint = datapoints[i];
    if (dataPoint.x <= xValue) {
      foundX = dataPoint.xLabel;
      break;
    }
  }

  return foundX;
};
