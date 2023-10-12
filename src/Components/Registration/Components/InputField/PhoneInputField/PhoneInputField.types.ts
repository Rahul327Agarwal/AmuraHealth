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
  onKeyPress?: Function;
  hoverBorder?: string;
  normalBorder?: string;
  focusBorder?: string;
  fontColor?: string;
}
