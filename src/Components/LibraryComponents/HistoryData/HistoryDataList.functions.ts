import moment from 'moment';

export const getFormattedDateString = (updatedDate: Date) => {
  const today = new Date();
  const dateToCheck = new Date(updatedDate);
  // Create the date you want to check
  //   const dateToCheck = new Date('2023-06-28');

  // Set the time of both dates to 00:00:00 to ignore the time component
  today.setHours(0, 0, 0, 0);
  dateToCheck.setHours(0, 0, 0, 0);

  // Get the previous day's date
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Compare the dates
  if (dateToCheck.getTime() === today.getTime()) {
    return `Today, ${moment(updatedDate).format('h:mm A')}`;
  }
  if (dateToCheck.getTime() === yesterday.getTime()) {
    return `Yesterday, ${moment(updatedDate).format('h:mm A')}`;
  }

  return `${moment(updatedDate).format('YYYY-MM-DD')}, ${moment(updatedDate).format('h:mm A')}`;
};

export const numberUnitlFirstDecimalPoint = (value, unitChange) => {
  if (Number.isInteger(value)) {
    return value;
  } else {
    let digitsShows = unitChange === 'lbs' ? 2 : 1;
    let decimalValue = value.toFixed(digitsShows);
    return decimalValue;
  }
};
