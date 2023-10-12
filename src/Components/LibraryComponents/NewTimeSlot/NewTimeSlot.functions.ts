export const formatAMPM = (date: Date): string => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  let hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
  let minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  let strTime = `${hoursStr}:${minutesStr} ${ampm}`;
  return strTime;
};
