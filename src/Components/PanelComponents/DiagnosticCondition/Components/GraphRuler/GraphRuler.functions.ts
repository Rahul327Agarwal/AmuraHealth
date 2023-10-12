import { subHours } from 'date-fns';
import { rulerLineHeights } from '../../DiagnosticCondition.utils';
import { GetRulerLinesFn, IDrawLinesProps, RulerLine, TLineObject, TStickyLabel } from './GraphRuler.types';
import { GraphRulerUtils } from './GraphRuler.utils';

export const getMinutes: GetRulerLinesFn = (minValue, maxValue, width) => {
  const diff = maxValue - minValue;
  const diffMinutes = diff / (1000 * 60);

  const shouldRender = diffMinutes <= 60 * 2;
  const shouldRenderText = diffMinutes <= 60 * 2;

  const offsetLeft = 5;
  const diffPixels = width - offsetLeft;
  const diffSecondsPerPixel = diff / diffPixels;
  const paddingLeftSeconds = offsetLeft * diffSecondsPerPixel;
  const offsetMinValue = maxValue + paddingLeftSeconds;

  if (!shouldRender) {
    return [];
  }

  const res: RulerLine[] = [];
  const singleMilliSecondWidth = width / diff;

  const stickyDate = subHours(new Date(offsetMinValue), 1);
  let stickyhour = stickyDate.getHours();
  let stickyMinute = stickyDate.getMinutes();
  stickyhour = stickyhour % 24;
  const minutes5Interval = Math.floor(stickyMinute / 5) * 5;

  const startDate = new Date(minValue);
  let minute = startDate.getMinutes();
  let hour = startDate.getHours();

  for (let i = 0; i < diffMinutes + 1; i++) {
    if (minute % 5 !== 0) {
      minute = (minute + 1) % 60;
      continue;
    }

    hour = (hour + 1) % 24;
    let x = i * singleMilliSecondWidth * 1000 * 60;
    let startDateZero = new Date(startDate);
    startDateZero.setMinutes(0, 0, 0);
    const currentSecond = ((minValue - startDateZero.getTime()) / 1000) % 60;
    const secondsOffset = currentSecond * singleMilliSecondWidth * 1000;
    x -= secondsOffset;

    let hour12 = stickyhour % 12;
    hour12 = hour12 === 0 ? 12 : hour12;

    const minutesStr = minutes5Interval < 10 ? `0${minutes5Interval}` : minutes5Interval.toString();
    const ampm = stickyhour < 12 ? 'AM' : 'PM';

    const renderText = minute % 15 === 0 && shouldRenderText && minute !== 0;

    const stickyText = `${hour12}${minutes5Interval ? `:${minutesStr}` : ''} ${ampm}`;

    const text = renderText ? `${minute}'` : undefined;

    res.push({ x, text, stickyText, renderText: minute === 0 });

    minute = (minute + 1) % 60;
  }

  return res;
};

export const getHours: GetRulerLinesFn = (minValue, maxValue, width) => {
  const diff = maxValue - minValue;
  const diffHours = diff / (1000 * 60 * 60);
  const diffMinutes = diff / (1000 * 60);
  const diffSeconds = diff / 1000;

  // const singleHourWidth = width / diffHours;
  // const singleMinuteWidth = width / diffMinutes;
  // const singleSecondWidth = width / diffSeconds;
  const singleMilliSecondWidth = width / diff;

  const shouldRender = diffHours <= 24 * 10;
  const shouldRender6Interval = diffHours >= 24 * 2;
  const shouldRenderText = diffHours <= 24 * 2;
  const shouldRenderText6Interval = diffHours >= 12;

  if (!shouldRender) {
    return [];
  }

  const res: RulerLine[] = [];

  const startDate = new Date(minValue);
  let hour = startDate.getHours();

  for (let i = 0; i < diffHours + 1; i++) {
    if (shouldRender6Interval && (hour % 6 !== 0 || hour == 0)) {
      hour = (hour + 1) % 24;
      continue;
    }

    let x = i * singleMilliSecondWidth * 1000 * 60 * 60;
    let startDateZero = new Date(startDate);
    startDateZero.setHours(0, 0, 0, 0);
    const currentMinute = ((minValue - startDateZero.getTime()) / (1000 * 60)) % 60;
    const minutesOffset = currentMinute * singleMilliSecondWidth * 1000 * 60;
    x -= minutesOffset;

    let renderText = (shouldRenderText6Interval ? hour % 6 === 0 : true) && shouldRenderText;

    const textSuffix = hour < 12 ? 'AM' : 'PM';
    let correctedHour = hour % 12;
    correctedHour = correctedHour === 0 ? 12 : correctedHour;
    const stickyText = `${correctedHour} ${textSuffix}`;
    const text = renderText ? stickyText : undefined;

    res.push({ x, text, stickyText, renderText });

    hour = (hour + 1) % 24;
  }

  return res;
};

export const getDays: GetRulerLinesFn = (minValue, maxValue, width) => {
  const diff = maxValue - minValue;
  const diffDays = diff / (1000 * 60 * 60 * 24);
  const diffMonths = diffDays / 30;

  if (diffMonths >= 3) {
    return [];
  }

  const shouldRenderText = diffDays <= 7;

  const singleMilliSecondWidth = width / diff;
  const date = new Date(minValue);

  const res: RulerLine[] = [];
  for (let i = 0; i < diffDays + 1; i++) {
    const day = i;
    const numDate = minValue + day * (1000 * 60 * 60 * 24);

    const dateInfo = GraphRulerUtils.getDateInfo(date, numDate, {
      getDay: true,
      getDate: true,
    });
    // if (dateInfo.day === 0) {
    //   continue;
    // }
    let startDateZero = new Date(minValue);
    startDateZero.setHours(0, 0, 0, 0);

    const currentHour = ((numDate - startDateZero.getTime()) / (1000 * 60 * 60)) % 24;
    const hoursOffset = currentHour * singleMilliSecondWidth * 1000 * 60 * 60;

    let relativeX = i * (singleMilliSecondWidth * 1000 * 60 * 60 * 24) - hoursOffset;
    const renderText = shouldRenderText && dateInfo.day !== 0;

    const dateText = dateInfo.date;

    const stickyText = dateText < 10 ? `0${dateText}` : `${dateText}`;
    const text = renderText ? stickyText : undefined;

    res.push({ x: relativeX, text, stickyText, renderText });
  }
  return res;
};

export const getWeeks: GetRulerLinesFn = (minValue, maxValue, width) => {
  const diff = maxValue - minValue;
  const diffMonth = diff / (1000 * 60 * 60 * 24 * 30);

  if (diffMonth >= 12) return [];

  const diffWeeks = diff / (1000 * 60 * 60 * 24 * 7);
  const diffDays = diff / (1000 * 60 * 60 * 24);

  const res: RulerLine[] = [];

  const singleMilliSecondWidth = width / diff;

  // Line Height
  let lineHeight: undefined | number;
  if (diffDays <= 2) {
    lineHeight = rulerLineHeights.HOUR;
  }

  const shouldRenderText = diffDays < 45;

  const cachedDate = new Date(minValue);

  for (let i = 0; i < diffWeeks + 1; i++) {
    const week = i;

    const weekTime = week * (1000 * 60 * 60 * 24 * 7);
    const numDate = minValue + weekTime;

    const dateInfo = GraphRulerUtils.getDateInfo(cachedDate, numDate, {
      getDay: true,
      getDate: true,
    });

    const dayOffset = dateInfo.day! * (singleMilliSecondWidth * 1000 * 60 * 60 * 24);
    let startDateZero = new Date(minValue);
    startDateZero.setHours(0, 0, 0, 0);
    const hour = ((minValue - startDateZero.getTime()) / (1000 * 60 * 60)) % 24;
    const hoursOffset = hour * singleMilliSecondWidth * 1000 * 60 * 60;
    let text: string | undefined;
    cachedDate.setDate(dateInfo.date! - dateInfo.day!);
    const dateText = cachedDate.getDate();
    const stickyText = dateText < 10 ? `0${dateText}` : `${dateText}`;
    if (shouldRenderText) {
      text = stickyText;
    }

    let relativeX = i * (singleMilliSecondWidth * 1000 * 60 * 60 * 24 * 7) - dayOffset - hoursOffset;
    res.push({ x: relativeX, text, stickyText, height: lineHeight, renderText: shouldRenderText });
  }

  return res;
};

export const getMonths: GetRulerLinesFn = (minValue, maxValue, width) => {
  const diff = maxValue - minValue;
  const diffYear = diff / (1000 * 60 * 60 * 24 * 30 * 12);
  const diffMonth = diff / (1000 * 60 * 60 * 24 * 31);
  const diffDays = diff / (1000 * 60 * 60 * 24);
  const diffHours = diff / (1000 * 60 * 60);

  if (diffYear > 6) return [];

  const res: RulerLine[] = [];

  const singleMilliSecondWidth = width / diff;

  const renderAlternatively = diffYear > 1.5;
  const renderTextAlternatively = diffMonth > 8;

  const startDate = new Date(minValue);

  let month = startDate.getMonth();
  let year = startDate.getFullYear();
  let currentDateFromStart = -(startDate.getDate() - 1);

  // Line Height
  let lineHeight: undefined | number;
  if (diffDays <= 31) {
    lineHeight = 0;
  }

  const maxIter = diffMonth + 3;
  let index = 0;
  while (index < maxIter) {
    const shouldRender = renderAlternatively ? month % 3 === 0 : true;
    if (shouldRender) {
      let x = currentDateFromStart * (singleMilliSecondWidth * 1000 * 60 * 60 * 24);

      let startDateZero = new Date(minValue);
      startDateZero.setHours(0, 0, 0, 0);

      const hour = ((minValue - startDateZero.getTime()) / (1000 * 60 * 60)) % 24;
      const hoursOffset = hour * singleMilliSecondWidth * 1000 * 60 * 60;

      x -= hoursOffset;

      let shouldRenderText = (renderTextAlternatively ? month % 3 === 0 : true) && diffYear <= 3;
      const stickyText = GraphRulerUtils.MONTH_NAMES[month];
      const text = shouldRenderText ? stickyText : undefined;
      res.push({
        x,
        text,
        height: lineHeight,
        stickyText,
        renderText: shouldRenderText,
      });
    }

    currentDateFromStart += GraphRulerUtils.getDaysInMonth(month, year);

    month = (month + 1) % 12;
    year = year + Math.floor(month / 12);

    index++;
  }

  return res;
};

export const getYears: GetRulerLinesFn = (minValue, maxValue, width) => {
  const diff = maxValue - minValue;
  const diffYear = diff / (1000 * 60 * 60 * 24 * 30 * 12);
  const diffDays = diff / (1000 * 60 * 60 * 24);
  const diffHours = diff / (1000 * 60 * 60);

  const res: RulerLine[] = [];

  const singleMilliSecondWidth = width / diff;

  const renderTextAlternatively = diffYear > 10;

  const startDate = new Date(minValue);

  let month = startDate.getMonth();
  let year = startDate.getFullYear();

  let currentDateFromStart = -(GraphRulerUtils.getDaysUntilMonthInYear(month, year) + (startDate.getDate() - 1));

  // Line Height
  let lineHeight: undefined | number;
  if (diffDays < 30) {
    lineHeight = 0;
  }
  if (diffYear <= 1) {
    lineHeight = 0;
  }
  if (diffYear > 1) {
    lineHeight = rulerLineHeights.MONTH;
  }
  if (diffYear > 3) {
    lineHeight = rulerLineHeights.YEAR;
  }

  const maxIter = diffYear + 3;
  let index = 0;
  while (index < maxIter) {
    const shouldRender = true;

    if (shouldRender) {
      let x = currentDateFromStart * (singleMilliSecondWidth * 1000 * 60 * 60 * 24);

      let startDateZero = new Date(minValue);
      startDateZero.setHours(0, 0, 0, 0);

      const hour = ((minValue - startDateZero.getTime()) / (1000 * 60 * 60)) % 24;
      const hoursOffset = hour * singleMilliSecondWidth * 1000 * 60 * 60;

      x -= hoursOffset;

      const shouldRenderText = renderTextAlternatively ? year % 5 === 0 : true;

      const stickyText = `'${year.toString().slice(2)}`;
      const text = shouldRenderText ? stickyText : undefined;

      res.push({ x, text, stickyText, height: lineHeight, renderText: shouldRenderText });
    }

    currentDateFromStart += GraphRulerUtils.getDaysInYear(year);

    month = (month + 1) % 12;
    year = year + Math.floor(month / 12) + 1;

    index++;
  }

  return res;
};

export const getGraphYears: GetRulerLinesFn = (minValue, maxValue, width) => {
  const diff = maxValue - minValue;
  const diffYear = diff / (1000 * 60 * 60 * 24 * 30 * 12);

  const yearOffset = Math.round(diffYear) === 25 ? 5 : Math.round(diffYear) === 5 ? 1 : 0;

  const res: RulerLine[] = [];

  const singleMilliSecondWidth = width / diff;

  const startDate = new Date(minValue);

  let month = startDate.getMonth();
  let year = startDate.getFullYear();

  let currentDateFromStart = -(GraphRulerUtils.getDaysUntilMonthInYear(month, year) + (startDate.getDate() - 1));

  const maxIter = diffYear + 3;
  let index = 0;
  while (index < maxIter) {
    const shouldRender = true;

    if (shouldRender) {
      let x = currentDateFromStart * (singleMilliSecondWidth * 1000 * 60 * 60 * 24);
      let startDateZero = new Date(minValue);
      startDateZero.setHours(0, 0, 0, 0);

      const hour = ((minValue - startDateZero.getTime()) / (1000 * 60 * 60)) % 24;
      const hoursOffset = hour * singleMilliSecondWidth * 1000 * 60 * 60;

      x -= hoursOffset;
      if (year % yearOffset === 0) {
        res.push({ x });
      }
    }

    currentDateFromStart += GraphRulerUtils.getDaysInYear(year);

    month = (month + 1) % 12;
    year = year + Math.floor(month / 12) + 1;

    index++;
  }

  return res;
};

export const drawLines = (
  props: IDrawLinesProps,
  ctx: CanvasRenderingContext2D,
  getLinesFn: GetRulerLinesFn,
  theme: TLineObject,
  stickyLabels?: TStickyLabel[],
  allowSticky?: boolean
) => {
  const { maxHeight, width, minValue, maxValue, selectedFilter, xPadding = 0, isGraph } = props;

  const lines = getLinesFn(minValue, maxValue, width);
  const { strokeColor, height, strokeWidth, fontSize, fontColor, lineDash, yStickyLabel, stickyLabelHeight, type } = theme;
  const isRemoveSticky = !isGraph && (type === 'minutes' || type === 'hours');
  // start draw
  ctx.beginPath();
  const yText = maxHeight - height - 4;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // LINE
    if ((selectedFilter === '1d' || selectedFilter === '1h') && isGraph && !line.text) continue;

    const newHeight = stickyLabels ? line.height ?? height : height;
    const xCurrLine = line.x + xPadding;
    ctx.moveTo(xCurrLine, maxHeight - newHeight);
    ctx.lineTo(xCurrLine, maxHeight);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    lineDash && ctx.setLineDash(lineDash);
    // TEXT
    if (!line.text) continue;

    if (!fontSize) continue;

    ctx.font = `${fontSize} "Graphik"`;
    const curTextWidth = ctx.measureText(line.text).width;
    const xCurrText = xCurrLine - curTextWidth / 2;

    ctx.fillStyle = fontColor;

    if ((i === 1 && xCurrText <= 0) || (lines.length === 1 && xCurrText <= 0)) {
      ctx.fillText(line.text, 0, yText);
      continue;
    }

    ctx.fillText(line.text, xCurrText, yText);
  }
  ctx.stroke();
  if (allowSticky && stickyLabels) {
    // start draw sticky label
    const currStickyLabel = lines[0];
    const nextStickyLabel = lines[1] ?? currStickyLabel;

    if (!currStickyLabel) return;

    const stickyLabel = currStickyLabel?.stickyText || '';

    const currTextWidth = ctx.measureText(stickyLabel).width;
    const nWidth = selectedFilter === '1d' || selectedFilter === '1h' ? currTextWidth : currTextWidth / 2;

    const _xText = nextStickyLabel.x - xPadding - nWidth - 5;
    let xText = isRemoveSticky ? 0 : Math.min(_xText, 0);

    // console.log('!!_xText', xText, _xText);
    // console.log('!!_xText', stickyLabel, xText);

    if (!nextStickyLabel.renderText) {
      xText = 0;
    }

    const heightRect = stickyLabelHeight;
    const yRect = yStickyLabel;

    stickyLabels.push({
      xRect: xText,
      yRect,
      widthRect: currTextWidth + 5,
      heightRect,
      stickyLabel,
      xText,
      yText,
      fontSize,
      fontColor,
    });
  }
};

export const drawStickylabel = (ctx: CanvasRenderingContext2D, stickyLabels: TStickyLabel[]) => {
  stickyLabels.forEach((data) => {
    const { xText, heightRect, stickyLabel, widthRect, xRect, yRect, yText, fontSize, fontColor } = data;

    ctx.beginPath();
    // create gradient
    const grd = ctx.createLinearGradient(0, 0, widthRect, 0);
    grd.addColorStop(0.8, '#F8F8F8');
    grd.addColorStop(1, '#f8f8f800');
    ctx.fillStyle = grd;
    // ctx.fillStyle = 'lightgreen';
    ctx.fillRect(xRect, yRect, widthRect, heightRect);

    // sticky label
    ctx.font = `${fontSize} "Graphik"`;
    ctx.fillStyle = fontColor;
    ctx.fillText(stickyLabel, xText, yText);

    ctx.closePath();
    ctx.stroke();
  });
};
