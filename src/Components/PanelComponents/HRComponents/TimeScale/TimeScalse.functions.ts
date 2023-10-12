export const differenceInMilliseconds = (startTime: Date, endTime: Date): number => {
  return endTime.getTime() - startTime.getTime();
};

export const differenceFrom12AM = (startTime: Date): number => {
  return startTime.getHours() * 60 * 60 * 1000 + startTime.getMinutes() * 60 * 1000;
};
