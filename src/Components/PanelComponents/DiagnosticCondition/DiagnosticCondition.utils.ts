import moment from 'moment';
import { getFixedMaxWidgetWidth } from '../../../DisplayFramework/DisplayFramework.functions';
import { TLineObject } from './Components/GraphRuler/GraphRuler.types';
import { GraphTimeLine, IDateRangeState, IFilterObject, RulerTimeLine, TLineRange } from './DiagnosticCondition.types';

const PANEL_WIDTH = getFixedMaxWidgetWidth();

export const STYLES = {
  scrollXPadding: 20,
  accorXPadding: 12,
  accorIconWidth: 16,
  accorGap: 4,
};

export const CANVAS_XOFFSET = STYLES.scrollXPadding + STYLES.accorXPadding + STYLES.accorIconWidth + STYLES.accorGap;
export const CANVAS_WIDTH = PANEL_WIDTH - CANVAS_XOFFSET * 2;
export const CANVAS_HEIGHT = (CANVAS_WIDTH * 2) / 4.5;
export const RULER_XPADDING = 10;
export const DATAPOINT_CURSOR = 6;
export const CURSOR = DATAPOINT_CURSOR * 5;
export const DRAGGABLE_BAR_WIDTH = 4;
export const DRAGGABLE_BAR_MAX = CANVAS_WIDTH - DRAGGABLE_BAR_WIDTH / 2;
export const DRAGGABLE_BAR_MIN = 0 - DRAGGABLE_BAR_WIDTH / 2;
export const TOOLTIP_OFFSET = 8;
export const RULER_HEIGHT = 60;

export const getMillisecondsFromTimeString = (timeString: string): number => {
  const regex = /^(\d+)([hdwmy])$/;
  const matches = timeString.match(regex);

  if (matches === null) {
    return 0;
  }

  const value = parseInt(matches[1]);
  const unit = matches[2];

  switch (unit) {
    case 'h':
      return value * 60 * 60 * 1000;
    case 'd':
      return value * 24 * 60 * 60 * 1000;
    case 'w':
      return value * 7 * 24 * 60 * 60 * 1000;
    case 'm':
      return value * 30 * 24 * 60 * 60 * 1000;
    case 'y':
      return value * 365 * 24 * 60 * 60 * 1000;
  }
};

export const getFirstOfNextMonth = (n: number) => {
  return new Date(moment().add(n, 'month').toDate().setHours(0, 0, 0, 0)).setDate(1);
};

const firstOfNextMonth = getFirstOfNextMonth(1);

export const getNthPreMonth = (n: number) => {
  return new Date(moment(firstOfNextMonth).subtract(n, 'month').toDate()).setDate(1);
};

export const FILTER_BUTTONS: IFilterObject[] = [
  { shortKey: '1h', label: '1 hour', time: getMillisecondsFromTimeString('1h') },
  { shortKey: '1d', label: '1 day', time: getMillisecondsFromTimeString('1d') },
  { shortKey: '1w', label: '1 week', time: getMillisecondsFromTimeString('1w') },
  { shortKey: '2w', label: '2 week', time: getMillisecondsFromTimeString('2w') },
  { shortKey: '1m', label: '1 month', time: getMillisecondsFromTimeString('1m') },
  { shortKey: '3m', label: '3 month', time: getMillisecondsFromTimeString('3m') },
  { shortKey: '6m', label: '6 months', time: getMillisecondsFromTimeString('6m') },
  { shortKey: '1y', label: '1 year', time: getMillisecondsFromTimeString('1y') },
  { shortKey: '2y', label: '2 year', time: getMillisecondsFromTimeString('2y') },
  { shortKey: '5y', label: '5 year', time: getMillisecondsFromTimeString('5y') },
  { shortKey: '25y', label: '25 year', time: getMillisecondsFromTimeString('25y') },
];

export const DEFAULT_FILTER: IFilterObject = FILTER_BUTTONS[6];

export const DEFAULT_DATE_RANGE: IDateRangeState = {
  viewMinDate: getNthPreMonth(6),
  viewMaxDate: firstOfNextMonth,
  minDate: getNthPreMonth(6),
  maxDate: firstOfNextMonth,
  selectedFilter: DEFAULT_FILTER.shortKey,
  tempMinDate: getNthPreMonth(6),
  tempMaxDate: firstOfNextMonth,
};

export const rulerLineHeights = {
  MINUTE: 4,
  HOUR: 4,
  DAY: 14,
  WEEK: 14,
  MONTH: 26,
  YEAR: 39,
};

export const THEME: Record<TLineRange, TLineObject> = {
  minutes: {
    strokeColor: '#A6A6A6',
    strokeWidth: 1,
    height: rulerLineHeights.MINUTE,
    fontSize: '10px',
    fontColor: '#252427',
    yStickyLabel: 44,
    stickyLabelHeight: 9,
    stickyLabelWidth: 50,
    type: 'minutes',
  },
  hours: {
    strokeColor: '#252427',
    strokeWidth: 2,
    height: rulerLineHeights.HOUR,
    fontSize: '10px',
    fontColor: '#252427',
    yStickyLabel: 44,
    stickyLabelHeight: 9,
    stickyLabelWidth: 50,
    type: 'hours',
  },
  days: {
    strokeColor: '#A6A6A6',
    strokeWidth: 1,
    height: rulerLineHeights.DAY,
    fontSize: '10px',
    fontColor: '#252427',
    yStickyLabel: 34,
    stickyLabelHeight: 10,
    stickyLabelWidth: 40,
  },
  weeks: {
    strokeColor: '#9C096E',
    strokeWidth: 1,
    height: rulerLineHeights.WEEK,
    fontSize: '10px',
    fontColor: '#9C096E',
    yStickyLabel: 34,
    stickyLabelHeight: 10,
    stickyLabelWidth: 40,
  },
  months: {
    strokeColor: '#A6A6A6',
    strokeWidth: 1,
    height: rulerLineHeights.MONTH,
    fontSize: '10px',
    fontColor: '#252427',
    yStickyLabel: 20,
    stickyLabelHeight: 12,
    stickyLabelWidth: 40,
  },
  years: {
    strokeColor: '#252427',
    strokeWidth: 2,
    height: rulerLineHeights.YEAR,
    fontSize: '10px',
    fontColor: '#252427',
    yStickyLabel: 4,
    stickyLabelHeight: 14,
    stickyLabelWidth: 40,
  },
  graph: {
    strokeColor: '#E1E1E1',
    strokeWidth: 1,
    lineDash: [4, 4],
    height: CANVAS_WIDTH,
  },
  stackedBar: {
    strokeColor: '#E1E1E1',
    strokeWidth: 1,
    lineDash: [2, 2],
    height: CANVAS_WIDTH,
  },
};

export const RULER_DOCK_LABEL: RulerTimeLine = {
  '1h': { years: true, months: true, days: true, minutes: true },
  '1d': { years: true, months: true, days: true, hours: true },
  '1w': { years: true, months: true, days: true },
  '2w': { years: true, months: true, days: true },
  '1m': { years: true, months: true, days: true },
  '3m': { years: true, months: true },
  '6m': { years: true, months: true },
  '1y': { years: true, months: true },
  '2y': { years: true },
  '5y': { years: true },
  '25y': { years: true },
};

export const GRAPH_TIME_LINE: GraphTimeLine = {
  '1h': { minutes: THEME.graph, hours: THEME.graph },
  '1d': { hours: THEME.graph },
  '1w': { days: THEME.graph, weeks: THEME.graph },
  '2w': { weeks: THEME.graph },
  '1m': { weeks: THEME.graph },
  '3m': { months: THEME.graph },
  '6m': { months: THEME.graph },
  '1y': { months: THEME.graph },
  '2y': { months: THEME.graph },
  '5y': { years: THEME.graph },
  '25y': { years: THEME.graph },
};

export const STACKED_BAR_TIME_LINE: GraphTimeLine = {
  '1h': { minutes: THEME.stackedBar, hours: THEME.stackedBar },
  '1d': { hours: THEME.stackedBar },
  '1w': { days: THEME.stackedBar, weeks: THEME.stackedBar },
  '2w': { weeks: THEME.stackedBar },
  '1m': { weeks: THEME.stackedBar },
  '3m': { months: THEME.stackedBar },
  '6m': { months: THEME.stackedBar },
  '1y': { months: THEME.stackedBar },
  '2y': { months: THEME.stackedBar },
  '5y': { years: THEME.stackedBar },
  '25y': { years: THEME.stackedBar },
};
