export interface IProps {
  label?: string;
  options: Array<any>;
  handleCheck?: Function;
  disabled?: boolean | undefined;
  isChecked?: boolean;
  handleAnswer?: Function;
}
