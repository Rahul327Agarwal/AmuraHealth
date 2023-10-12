import { getTimeIn12HrFormat } from '../../../../LibraryComponents/ChatComponent/ChatComponent.functions';

export const getUserTime = (timeZone: string) => {
  let time = '';
  try {
    if (!timeZone) {
      return '';
    }
    let date = new Date().toLocaleString('en-US', {
      hour12: false,
      timeZone: timeZone,
    });
    let time = getTimeIn12HrFormat(date);
    return `${' '}${time}`;
  } catch (e) {
    return `${''}${time}`;
  }
};
