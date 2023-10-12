export const changePlaybackSpeed = (currentSpeed: number) => {
  switch (currentSpeed) {
    case 0.8:
      return 1;
    case 1:
      return 1.25;
    case 1.25:
      return 1.5;
    case 1.5:
      return 2;
    case 2:
      return 0.8;
    default:
      return 1;
  }
};
