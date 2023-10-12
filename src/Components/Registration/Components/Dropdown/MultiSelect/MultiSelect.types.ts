export interface IProps {
  onChange: Function;
  options: Array<IOption>;
  value: Array<string | number>;
  disabled: boolean;
  placeHolder: string;
  idParameter: string;
  labelParameter: string;
  showTokens: boolean;
  label?: string;
  showBorder?: boolean;
  showError?: boolean;
  errorText?: string;
}

export interface IOption {
  id: string | number;
  label: string;
}
