import { MutableRefObject } from 'react';
import { IDateRangeState, TQuesColorMap } from '../../DiagnosticCondition.types';

export interface IStackedBarProps {
  datapoints: TStackedDataPoint[];
  dateRange: IDateRangeState;
  height: number;
  width: number;
  tooltipRef: MutableRefObject<HTMLDivElement>;
  configOption?: {
    showTimeLine?: boolean;
    showDatapoints?: boolean;
    barHeigh?: number;
  };
  quesColorMap: TQuesColorMap;
}

export type TStackedDataPoint = {
  id: string;
  x: number;
  xLabel: string;
};

export type TConfigPayload = {
  datapoints: TStackedDataPoint[];
  minValue: number;
  maxValue: number;
  height: number;
  width: number;
  barHeight: number;
  quesColorMap: TQuesColorMap;
};
