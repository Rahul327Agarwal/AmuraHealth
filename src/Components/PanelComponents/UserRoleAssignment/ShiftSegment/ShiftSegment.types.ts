import { get12HourTime } from '../../Chat/ChatUtils/chatUtils';
import { IShiftSegmentError } from '../UserRoleAssignment.types';

export interface IProps {
  segmentId: string;
  segmentName: string;
  weekDays: Array<number>;
  startDate: Date | string;
  endDate: Date | string;
  startTime: Date | string;
  endTime: Date | string;
  neverEnds: boolean;
  is_active: boolean;
  handleDelete: (segmentId: string) => void;
  handleReset: (segmentId: string) => void;
  handleChange: (segmentId: string, key: string, value: string | Date | Array<number> | boolean) => void;
  error: IShiftSegmentError;
  panel?: any;
}

export const createTimeDropdown = (startDate: any) => {
  const timeDropdown = [];
  const startTime = new Date(startDate);
  startTime.setHours(0, 0, 0, 0);
  const endTime = new Date(startDate);
  endTime.setHours(0, 0, 0, 0);
  endTime.setDate(endTime.getDate() + 1);

  while (startTime.getDate() < endTime.getDate()) {
    timeDropdown.push({
      id: startTime.toISOString(),
      label: get12HourTime(startTime),
    });
    startTime.setMinutes(startTime.getMinutes() + 15);
  }
  timeDropdown.push({
    id: startTime.toISOString(),
    label: '24:00',
  });
  return timeDropdown;
};
export const getTimeAMPMFormat = (date: any) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours < 10 ? '0' + hours : hours;
  // appending zero in the start if hours less than 10
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
};
export const createTimeDropdownNew = (startDate: any) => {
  const timeDropdown = [];
  const startTime = new Date(startDate || new Date());
  startTime.setHours(0, 0, 0, 0);
  const endTime = new Date(startDate || new Date());
  endTime.setHours(0, 0, 0, 0);
  endTime.setDate(endTime.getDate() + 1);

  while (startTime.getDate() < endTime.getDate()) {
    timeDropdown.push({
      value: startTime.toISOString(),
      label: getTimeAMPMFormat(startTime),
    });
    startTime.setMinutes(startTime.getMinutes() + 15);
  }
  // timeDropdown.push({
  //   value: startTime.toISOString(),
  //   label: "24:00",
  // });
  // console.log("timeDropdown", timeDropdown)
  return timeDropdown;
};
