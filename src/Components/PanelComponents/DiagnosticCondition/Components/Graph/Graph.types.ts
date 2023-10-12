import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { IDateRangeState } from '../../DiagnosticCondition.types';

export interface IGraphProps {
  datapoints: TDataPointN[];
  dateRange: IDateRangeState;
  tooltipRef: MutableRefObject<HTMLDivElement>;
}

export type TDataPointN = {
  x: number;
  y: number;
  yOriginal: string;
};

export type TDLocation = {
  xPos: number;
  yPos: number;
  xValue: string;
  yValue: string;
};
