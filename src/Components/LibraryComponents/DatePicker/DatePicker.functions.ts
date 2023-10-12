export function getMonthText(date: Date) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return monthNames[date.getMonth()];
}
export function getFullMonthWithYear(date: Date, characters?: number) {
  return `${getMonthText(date).substring(0, characters)} ${date.getFullYear()}`;
}

export const getMinutesDifference = (fromTime: string, toTime: string): number => {
  const fromDate = new Date(fromTime);
  const toDate = new Date(toTime);
  const diff = toDate.getTime() - fromDate.getTime();
  return diff / 60000;
};

export const checkDateIsAvailable = (date: Date, availableDates: Array<Date>): boolean => {
  return availableDates.some((availableDate) => {
    let availableDateObj = new Date(availableDate);
    return (
      availableDateObj.getDate() === date.getDate() &&
      availableDateObj.getMonth() === date.getMonth() &&
      availableDateObj.getFullYear() === date.getFullYear()
    );
  });
};

export const formatAMPM = (date: Date): string => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  let hoursStr = hours < 10 ? '0' + `${hours}` : `${hours}`;
  let minutesStr = minutes < 10 ? '0' + `${minutes}` : `${minutes}`;
  let strTime = `${hoursStr}:${minutesStr} ${ampm}`;
  return strTime;
};

export const checkWhetherSameDay = (day1: Date | string | number, day2: Date | string | number) => {
  return (
    new Date(day1).getDate() === new Date(day2).getDate() &&
    new Date(day1).getMonth() === new Date(day2).getMonth() &&
    new Date(day1).getFullYear() === new Date(day2).getFullYear()
  );
};
