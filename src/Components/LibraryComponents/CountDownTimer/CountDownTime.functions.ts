export const getCompletedTimeInPercent = (startTime: Date, endTime: Date): number => {
  let currentTimeInMS = new Date().getTime();
  let startTimeInMS = startTime.getTime();
  let endTimeInMS = endTime.getTime();
  if (currentTimeInMS > endTimeInMS) return 100;
  if (currentTimeInMS < startTimeInMS || endTimeInMS < startTimeInMS) return 0;
  return ((currentTimeInMS - startTimeInMS) / (endTimeInMS - startTimeInMS)) * 100;
};
function secondsToDhms(seconds) {
  seconds = Number(seconds);
  // var days = Math.floor(seconds / (3600 * 24))
  // var hours = Math.floor((seconds % (3600 * 24)) / 3600)
  // var minutes = Math.floor((seconds % 3600) / 60)
  // var s = Math.floor(seconds % 60)
  let days = Math.floor(seconds / (1000 * 60 * 60 * 24));
  let hours = Math.floor((seconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((seconds % (1000 * 60 * 60)) / (1000 * 60));
  let second = Math.floor((seconds % (1000 * 60)) / 1000);
  if (days > 0 && hours > 0) return `+${days}d ${hours}h`;
  if (hours > 0 && minutes > 0) return ` +${hours}h ${minutes}m`;
  if (minutes > 0 && second >= 0) return `+${minutes}m ${second}s`;
  if (second >= 0) return `+${second}s`;

  return '';
}

interface IGetRemainingTimeForamt {
  timeString: string;
}

// TODO: the function should recive a trigger time in ms/sec/min and shuld return hasTriggerTimePassed key in the obj
export const getRemainingTimeFormat = (endTime: Date): IGetRemainingTimeForamt | null => {
  let infoObject = {
    timeString: '',
  };
  if (!endTime) return infoObject;

  let currentTimeInMS = new Date().getTime();
  let endTimeInMS = endTime.getTime();
  let difference = endTimeInMS - currentTimeInMS;

  if (difference <= 0) return { ...infoObject, timeString: secondsToDhms(Math.abs(difference)) };
  let days = Math.floor(difference / (1000 * 60 * 60 * 24));
  let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);
  if (days > 0) return { ...infoObject, timeString: `${days}d` };
  if (hours > 0) return { ...infoObject, timeString: `${hours}h` };
  if (minutes > 0) return { ...infoObject, timeString: `${minutes}m` };
  if (seconds >= 0) return { ...infoObject, timeString: `${seconds}s` };
  return infoObject;
};
// export const getTimeDifference = (endTime: Date): string | null => {
//   if (!endTime) return;
//    let currentTimeInMS = new Date().getTime();
//    let endTimeInMS = endTime.getTime();
//    let difference = endTimeInMS - currentTimeInMS;

// };
// const getdate = (datetime) => {
//   var dateformat = moment(new Date(datetime)).format('DD/MM/YYYY');
//   var date = new Date(datetime);
//   var hours = parseInt((date.getHours() < 10 ? '0' : '') + date.getHours());
//   var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
//   var newformat = hours >= 12 ? 'PM' : 'AM';
//   hours = hours % 12;
//   hours = hours ? hours : 12;
//   return dateformat + ' ' + hours + ':' + minutes + ' ' + newformat;
// };
export const getCounterColor = (startTime: Date, endTime: Date): string => {
  let percent = getCompletedTimeInPercent(startTime, endTime);
  if (percent >= 0 && percent <= 25) return '#14B706';
  if (percent >= 25.1 && percent <= 50) return '#FBAC18';
  if (percent >= 50.1 && percent <= 75) return '#FF7032';
  if (percent >= 75.1) return '#E93232';
  return 'none';
};

export const showFloodBar = (startTime: Date) => {
  let currentTime = new Date().getTime();
  let startTimeMs = new Date(startTime).getTime();
  if (currentTime < startTimeMs) return false;
  return true;
};

export const belowOneDayTimeCheck = (time: Date): boolean => {
  if (!time) return false;
  let currentTimeinMS = new Date().getTime();
  let givenTimeinMS = new Date(time).getTime();
  let timeDifference = givenTimeinMS - currentTimeinMS;
  let seconds = Math.floor(timeDifference / 1000);
  if (seconds < 86400) return true;
  return false;
};
