export interface IProps {
  onChange: Function;
  options: Array<IOption>;
  value: any;
  disabled?: boolean;
  idParameter: string;
  labelParameter: string;
  placeHolder?: string;
  freeSolo: boolean;
  label?: string;
  showBorder?: boolean;
  showError?: boolean;
  errorText?: string;
  ListboxComponent?: any;
  PopperComponent?:any;
  onChangeInput?: Function;
}

export interface IOption {
  id: string;
  label: string;
}
