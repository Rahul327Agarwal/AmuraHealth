export interface IProps {
  onChange: Function;
  options: Array<IOption>;
  value: string | number;
  disabled?: boolean;
  labelParameter: string;
  label?: string;
  showBorder?: boolean;
  placeHolder?: string;
  showError?: boolean;
  errorText?: string;
  displayLabel?: string;
  panelWidth?: string;
}

export interface IOption {
  id: string;
  label: string;
}
export interface IOptionNew {
  value: string;
  label: string;
}