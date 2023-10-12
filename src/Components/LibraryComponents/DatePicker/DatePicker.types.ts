export interface IProps {
  placeholder?: string;
  startDate: string | Date | null;
  endDate?: string | Date;
  handleDateChange: Function;
  disabled?: boolean | undefined | null;
  disableFuture?: boolean | undefined | null;
  disabledPast?: boolean | undefined | null;
  variant?: "range" | "date" | "keyboard" | "time";
  showCalenderWithOutText?: boolean;
  showAvailableDatesOnly?: boolean;
  availableDates?: Array<Date>;
  minDate?: Date | null;
  maxDate?: Date | null;
  label?: string;
  customStyle?: string;
}
