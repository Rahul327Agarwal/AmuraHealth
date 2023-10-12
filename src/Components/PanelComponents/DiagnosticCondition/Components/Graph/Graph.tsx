import { useEffect, useRef } from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { CANVAS_HEIGHT, CANVAS_WIDTH, GRAPH_TIME_LINE } from '../../DiagnosticCondition.utils';
import { drawLines, getDays, getGraphYears, getHours, getMinutes, getMonths, getWeeks } from '../GraphRuler/GraphRuler.functions';
import { IDrawLinesProps } from '../GraphRuler/GraphRuler.types';
import { drawGraph, drawGraphCircle, drawGraphLine, seDPI } from './Graph.functions';
import { useGraphPan } from './Graph.hook';
import { useStyles } from './Graph.styles';
import { IGraphProps } from './Graph.types';

export function Graph(props: IGraphProps) {
  const { datapoints, dateRange, tooltipRef } = props;
  const { viewMaxDate, viewMinDate, selectedFilter } = dateRange || {};
  const graphRef = useRef<HTMLCanvasElement>();
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  const { dataTooltipRef, datapointLocation, onMouseEnter, onMouseHover, onMouseLeave } = useGraphPan();

  useEffect(() => {
    if (!graphRef.current) return;

    const theme = GRAPH_TIME_LINE[selectedFilter];
    const commonProps: IDrawLinesProps = {
      maxHeight: CANVAS_HEIGHT,
      width: CANVAS_WIDTH,
      minValue: viewMinDate,
      maxValue: viewMaxDate,
      selectedFilter,
      isGraph: true,
    };

    const ctx = graphRef.current.getContext('2d');

    // canvas set new dot per inch from device pixel ratio
    seDPI(graphRef, ctx, CANVAS_WIDTH, CANVAS_HEIGHT);

    // clear canvas
    ctx.clearRect(0, 0, graphRef.current.width, graphRef.current.height);

    // start draw minor and major graduation
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

    // draw graph line
    drawGraph(ctx, drawGraphLine, datapoints, viewMinDate, viewMaxDate, datapointLocation);
    // draw graph datapoint circle
    drawGraph(ctx, drawGraphCircle, datapoints, viewMinDate, viewMaxDate, datapointLocation);
  }, [viewMinDate, viewMaxDate, datapoints]);

  return (
    <section className={classes.graphSection}>
      <canvas
        onMouseEnter={onMouseEnter}
        onClick={onMouseHover}
        onMouseLeave={onMouseLeave}
        ref={graphRef}
        className={classes.graphCanvas}
        height={CANVAS_HEIGHT}
        width={CANVAS_WIDTH}
      />
      <div ref={tooltipRef} className={classes.tooltipBox}>
        <span data-y-data className={`${commonClasses.sm10Medium} ${classes.tooltipYText}`} />
      </div>
      <div ref={dataTooltipRef} data-datapoint className={classes.tooltipBox}>
        <span data-y-data className={`${commonClasses.sm10Medium} ${classes.tooltipYText}`} />
        <span data-x-data className={`${commonClasses.sm10Regular} ${classes.tooltipXText}`} />
      </div>
    </section>
  );
}
