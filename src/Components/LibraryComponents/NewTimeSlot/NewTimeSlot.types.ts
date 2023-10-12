export interface IProps {
  slotDetails: any;
  timeSlot: Date | string;
  participants: Array<IParticipant>;
  isSelected: boolean;
  handleClick: (timeSlot: Date) => void;
  istimeZoneConvert?: boolean;
  isDot?: boolean;
}

export interface IParticipant {
  name: string;
  color: string;
  id: string;
}
