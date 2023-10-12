export interface IProps {
  placeholder?: string;
  label?: string;
  value: string;
  handleOnChange: Function;
  onBlur?: Function;
  validate?: Function;
  showError?: boolean | undefined | null;
  disabled?: boolean | undefined | null;
  rows?: number;
  isPassword?: boolean;
  errorText?: string;
  onFocus?: any;
  autoFocus?: boolean;
  addAdditional8px?: boolean;
  onKeyPress?: Function;
  hoverBorder?: string;
  normalBorder?: string;
  focusBorder?: string;
  fontColor?: string;
  customStyle?: string;
  endAdornmentIcon?: any;
  inputProps?:any;
  title?: any;
}
