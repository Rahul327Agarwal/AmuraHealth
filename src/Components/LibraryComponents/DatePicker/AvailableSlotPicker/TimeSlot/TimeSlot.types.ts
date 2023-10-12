export interface IProps {
  timeSlot: Date | string;
  participants: Array<IParticipant>;
  isSelected: boolean;
  handleClick: (timeSlot: Date) => void;
}

export interface IParticipant {
  name: string;
  color: string;
  id: string;
}
