export interface StaticCalendarProps {
  date: Date | null;
  disablePast?: boolean;
  setDate: Function;
  minDate?: Date;
  maxDate?: Date;
  readOnly?: boolean;
  customStyle?: string;
  changeBgColor?: boolean;
  disabledKeyboardControl?: boolean;
  changeDayBGWhite?: boolean;
  openDialogBox?: boolean;
}

export interface IProps extends StaticCalendarProps {
  borderBottom?: boolean;
  format?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  helperText?: string;
  dontOpenCalander?: boolean;
  clickedOnCalender?: Function;
  headerTitle?: string;
  changeBgColor?: boolean;
  onDrawerStateChange?: (isOpen: boolean) => void;
}
export interface MUICalendarProps extends StaticCalendarProps {
  isOpen: boolean;
  setIsOpen: Function;
  headerTitle?: string;
  changeBgColor?: boolean;
  noDrawer?: boolean;
}
