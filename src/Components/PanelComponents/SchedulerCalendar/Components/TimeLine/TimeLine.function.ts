import { add, format } from 'date-fns';
import { MAGNIFY_MAP, VIEW_COUNT_MAP } from '../../SchedulerCalendar.function';

export const getIndexposition = (props: any) => {
  let countis = VIEW_COUNT_MAP[props.viewType];
  let indexvalues = -1;
  for (let i = 0; i < countis; i++) {
    let rawdate = add(new Date(props.date), { days: i });
    let convertdate = format(new Date(rawdate), 'MM/dd/yyyy');
    let viewdateis = format(new Date(), 'MM/dd/yyyy');
    if (convertdate === viewdateis) {
      indexvalues = i;
    }
  }
  return indexvalues;
};

export const getTimeLineHeight = (minutesElapsed: number, magnifyCounter: number) => {
  return {
    top: `${10 + ((MAGNIFY_MAP[magnifyCounter] * 24) / (24 * 60)) * minutesElapsed}px`,
  };
};

export const getTimeElaspedFrom12 = (): any => {
  let _12Time = new Date();
  _12Time.setHours(0, 0, 0, 0);
  let currentTime = new Date();
  let timeElasped = Math.floor((currentTime.getTime() - _12Time.getTime()) / 60000);
  return timeElasped;
};
