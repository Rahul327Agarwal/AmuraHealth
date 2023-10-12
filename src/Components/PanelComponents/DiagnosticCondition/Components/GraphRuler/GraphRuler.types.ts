import { Dispatch, SetStateAction } from 'react';
import { IDateRangeState, TLineRange, TRange } from '../../DiagnosticCondition.types';

export interface RulerLine {
  x: number;
  text?: string;
  stickyText?: string;
  height?: number;
  renderText?: boolean;
}

export type GetRulerLinesFn = (minValue: number, maxVaue: number, width: number) => RulerLine[];

export type TLineObject = {
  strokeColor: string;
  strokeWidth: number;
  height: number;
  fontSize?: string;
  fontColor?: string;
  lineDash?: [number, number];
  yStickyLabel?: number;
  stickyLabelHeight?: number;
  stickyLabelWidth?: number;
  type?: TLineRange;
};

export interface IGraphRulerProps {
  width: number;
  height: number;
  dateRange: IDateRangeState;
  setDateRange: Dispatch<SetStateAction<IDateRangeState>>;
}

export type TStickyLabel = {
  stickyLabel: string;
  xRect: number;
  yRect: number;
  widthRect: number;
  heightRect: number;
  xText: number;
  yText: number;
  fontSize: string;
  fontColor: string;
};

export type THiddenLabels = Partial<Record<TLineRange, RulerLine[]>>;

export type IDrawLinesProps = {
  maxHeight: number;
  width: number;
  minValue: number;
  maxValue: number;
  xPadding?: number;
  selectedFilter?: TRange;
  isGraph?: boolean;
};
