import moment from 'moment';

export const NO_OF_RENDER_FILTER = 12;
export const MIN_YEAR = 1900;

export const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export const isDisabled = (date: Date, disablePast?: boolean, filter?: string, value?: any) => {
  if (!disablePast) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (filter === 'months' && Number(today.getMonth()) === Number(value)) return false;
  if (filter === 'years' && Number(today.getFullYear()) === Number(value)) return false;
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate.getTime() < today.getTime();
};
export const disableMinDate = (date: Date, minDate: Date, filter?: string) => {
  if (filter === 'months') {
    return Number(date.getMonth()) === Number(minDate) && Number(date.getFullYear()) === Number(minDate);
  }
  return minDate && new Date(date).getTime() <= new Date(minDate).getTime();
};

export const disableMaxDate = (date: Date, maxDate: Date) => {
  return maxDate && new Date(date).getTime() >= new Date(maxDate).getTime();
};

export const getDateObject = (
  date: Date,
  { isdate, ismonth, isyear, isall }: { isdate?: any; ismonth?: any; isyear?: any; isall?: any }
) => {
  return {
    ...((isdate || isall) && { date }),
    ...((ismonth || isall) && { month: moment(date).format('MMM').toUpperCase() }),
    ...((isyear || isall) && { year: moment(date).format('YYYY') }),
  };
};

export const getYearsArray = (year: any) => {
  let years = [];
  if (year) {
    for (let i = 0; i < NO_OF_RENDER_FILTER; i++) {
      years.push(Number(year) + i);
    }
  }
  return years;
};

export const checkMinDate = (date: Date, minDate: Date) => {
  if (!minDate) {
    return false;
  }
  return date.getTime() < minDate.getTime();
};

export const checkMaxDate = (date: Date, maxDate: Date) => {
  if (!maxDate) {
    return false;
  }
  return date.getTime() > maxDate.getTime();
};
