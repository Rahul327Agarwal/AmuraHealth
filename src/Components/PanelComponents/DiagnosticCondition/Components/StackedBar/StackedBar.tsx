import { memo, useEffect, useRef } from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { STACKED_BAR_TIME_LINE } from '../../DiagnosticCondition.utils';
import { IDrawLinesProps } from '../GraphRuler/GraphRuler.types';
import { drawBar, drawCircle, drawStackedGraph, drawTimeLine, seDPI } from './StackedBar.functions';
import { useStyles } from './StackedBar.styles';
import { IStackedBarProps, TConfigPayload } from './StackedBar.types';

function StackedBar(props: IStackedBarProps) {
  const { datapoints, dateRange, height, width, configOption, tooltipRef, quesColorMap } = props;
  const { viewMaxDate, viewMinDate, selectedFilter } = dateRange || {};
  const barRef = useRef<HTMLCanvasElement>();
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  const barHeight = configOption?.barHeigh ?? height;

  useEffect(() => {
    if (!barRef.current) return;

    const ctx = barRef.current.getContext('2d');

    /* The function sets the device pixel ratio for a canvas element to ensure proper rendering on high-resolution screens. */
    seDPI(barRef, ctx, width, height);

    // clear canvas
    ctx.clearRect(0, 0, barRef.current.width, barRef.current.height);

    const configs: TConfigPayload = {
      datapoints,
      minValue: viewMinDate,
      maxValue: viewMaxDate,
      height,
      width,
      barHeight,
      quesColorMap,
    };

    /* The function is responsible for drawing the stacked bar graph on the canvas. */
    drawStackedGraph(ctx, drawBar, configs);

    /* The code block is responsible for drawing the minor and major graduation lines on the canvas for the stacked bar graph. */
    if (configOption?.showTimeLine) {
      const theme = STACKED_BAR_TIME_LINE[selectedFilter];
      const commonProps: IDrawLinesProps = {
        ...configs,
        maxHeight: barHeight,
        selectedFilter,
        isGraph: true,
      };
      drawTimeLine(ctx, theme, commonProps);
    }

    if (configOption?.showDatapoints) {
      /* The function is responsible for drawing the stacked bar datapoints on the canvas. */
      drawStackedGraph(ctx, drawCircle, configs);
    }
  }, [viewMinDate, viewMaxDate, datapoints, height, barHeight, width, configOption, quesColorMap]);

  return (
    <section className={classes.barSection}>
      <canvas ref={barRef} className={classes.barCanvas} height={height} width={width} />

      <div ref={tooltipRef} className={classes.tooltipBox}>
        <span data-y-data className={`${commonClasses.sm10Medium} ${classes.tooltipYText}`} />
      </div>
    </section>
  );
}

export default memo(StackedBar);
