export const getWeekDaysString = (weekDays: Array<number>): string => {
  let weekDaysString = '';
  weekDays.forEach((weekDay) => {
    switch (weekDay) {
      case 1:
        weekDaysString += 'M, ';
        break;
      case 2:
        weekDaysString += 'Tu, ';
        break;
      case 3:
        weekDaysString += 'W, ';
        break;
      case 4:
        weekDaysString += 'Th, ';
        break;
      case 5:
        weekDaysString += 'F, ';
        break;
      case 6:
        weekDaysString += 'Sa, ';
        break;
      case 0:
        weekDaysString += 'Su, ';
        break;
    }
  });
  return weekDaysString.slice(0, -2);
};
