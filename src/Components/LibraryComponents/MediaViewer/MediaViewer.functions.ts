export const THREE_DOT_OPTIONS = [
  { label: 'Reply', value: 'REPLY' },
  { label: 'Download', value: 'DOWNLOAD' },
];

export const DOWNLOAD = 'DOWNLOAD';

export const formatTime = (time) => {
  let seconds = Math.floor(time % 60);
  let minutes = Math.floor(time / 60) % 60;
  let hours = Math.floor(time / 3600);
  //   seconds = Number(seconds < 10 ? `0${seconds}` : seconds);

  if (hours == 0) {
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
  return `${hours}:${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};
