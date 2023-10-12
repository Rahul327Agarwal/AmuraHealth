export interface IProps {
  onChange: Function;
  options: Array<IOption>;
  value: Array<IOption>;
  disabled: boolean;
  idParameter: string;
  labelParameter: string;
  placeHolder: string;
  showTokens: boolean;
  label?: string;
  showBorder?: boolean;
  showError?: boolean;
  errorText?: string;
  ListboxComponent?: any;
  newTheme?: boolean;
  PopperComponent?: any;
  onChangeInput?: Function;
  disableCloseOnSelect?: boolean;
  freeSolo?: boolean;
  eventData?: boolean;
  isDisableBackSpace?: boolean;
}

export interface IOption {
  id: string | number;
  label: string;
}
