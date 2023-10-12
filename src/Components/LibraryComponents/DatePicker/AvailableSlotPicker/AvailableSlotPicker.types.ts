import { IParticipant } from "./TimeSlot/TimeSlot.types";

export interface IProps {
  selectedDate: Date;
  availableTimeSlots: Array<IAvailbleTimeSlot>;
  onTimeSlotSelected: (slot: Date) => void;
  availableDates: Date[];
  handleDateChange: (date: Date) => void;
}

export interface IAvailbleTimeSlot {
  timeSlot: Date | string;
  participants: Array<IParticipant>;
}
