export interface DateInfo {
  year?: number;
  month?: number;
  date?: number;
  day?: number;
}

export namespace GraphRulerUtils {
  export const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  export const MONTH_DAYS = [
    31,
    28, // 29 in leap years
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  export function getDateInfo(
    cachedDate: Date,
    timestamp: number,
    options: {
      getYear?: number | boolean;
      getMonth?: number | boolean;
      getDate?: number | boolean;
      getDay?: number | boolean;
    }
  ): DateInfo {
    cachedDate.setTime(timestamp);
    const resObj: DateInfo = {};

    if (options.getYear) {
      resObj.year = cachedDate.getFullYear();
    }
    if (options.getMonth) {
      resObj.month = cachedDate.getMonth();
    }
    if (options.getDate) {
      resObj.date = cachedDate.getDate();
    }
    if (options.getDay) {
      resObj.day = cachedDate.getDay();
    }
    return resObj;
  }

  export function getDayOfWeek(timestamp: number): number {
    return (Math.floor(timestamp / (86400 * 1000)) + 4) % 7;
  }

  export function isLeapYear(year: number): boolean {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  export function getDaysInMonth(month: number, year: number): number {
    return month === 1 && isLeapYear(year) ? 29 : MONTH_DAYS[month];
  }

  export function getDaysInYear(year: number): number {
    return isLeapYear(year) ? 366 : 365;
  }

  export function getDaysUntilMonthInYear(month: number, year: number): number {
    let days = 0;
    for (let i = 0; i < month; i++) {
      days += getDaysInMonth(i, year);
    }
    return days;
  }
}
