import { useEffect, useRef, useState } from 'react';
import { IDateRangeState } from '../../DiagnosticCondition.types';
import { RULER_DOCK_LABEL, RULER_XPADDING, THEME } from '../../DiagnosticCondition.utils';
import { drawLines, drawStickylabel, getDays, getHours, getMinutes, getMonths, getWeeks, getYears } from './GraphRuler.functions';
import { useGraphRulerPanZoom } from './GraphRuler.hooks';
import { useStyles } from './GraphRuler.styles';
import { IDrawLinesProps, IGraphRulerProps, THiddenLabels, TStickyLabel } from './GraphRuler.types';
import { seDPI } from '../Graph/Graph.functions';

export function GraphRuler(props: IGraphRulerProps) {
  const { height, width, dateRange, setDateRange } = props;
  const [localDateRange, setLocalDateRange] = useState<IDateRangeState>(dateRange);
  const { viewMaxDate, viewMinDate, selectedFilter } = localDateRange || {};
  const canvas = useRef<HTMLCanvasElement>();
  const { classes } = useStyles(props);

  const canvasWidth = width + RULER_XPADDING * 2;

  useEffect(() => {
    setLocalDateRange(dateRange);
  }, [dateRange]);

  useEffect(() => {
    if (!canvas.current) return;

    const dock = RULER_DOCK_LABEL[selectedFilter];
    const stickyLabels: TStickyLabel[] = [];
    const commonProps: IDrawLinesProps = {
      maxHeight: height,
      width,
      minValue: viewMinDate,
      maxValue: viewMaxDate,
      xPadding: RULER_XPADDING,
      selectedFilter,
    };

    // clear canvas
    const ctx = canvas.current.getContext('2d');

    // canvas set new dot per inch from device pixel ratio
    seDPI(canvas, ctx, canvasWidth, height);

    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

    // start draw minor and major graduation
    drawLines(commonProps, ctx, getMinutes, THEME.minutes, stickyLabels, dock.minutes);
    drawLines(commonProps, ctx, getHours, THEME.hours, stickyLabels, dock.hours);
    drawLines(commonProps, ctx, getDays, THEME.days, stickyLabels, dock.days);
    drawLines(commonProps, ctx, getWeeks, THEME.weeks, stickyLabels, dock.weeks);
    drawLines(commonProps, ctx, getMonths, THEME.months, stickyLabels, dock.months);
    drawLines(commonProps, ctx, getYears, THEME.years, stickyLabels, dock.years);

    drawStickylabel(ctx, stickyLabels);
  }, [viewMinDate, viewMaxDate, width, canvasWidth, height]);

  const { onPanStart, onPanChange, onPanEnd } = useGraphRulerPanZoom({
    canvas,
    localDateRange,
    setLocalDateRange,
    setDateRange,
    width,
  });

  return (
    <section className={classes.rulerSection}>
      <canvas
        className={classes.rulerCanvas}
        onPointerDown={onPanStart}
        onPointerMove={onPanChange}
        onPointerLeave={onPanEnd}
        onPointerUp={onPanEnd}
        height={height}
        width={canvasWidth}
        ref={canvas}
      />
    </section>
  );
}
