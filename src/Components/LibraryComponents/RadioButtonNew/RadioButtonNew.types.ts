export interface IProps {
  label: string;
  value: string;
  handleCheck?: Function;
  disabled?: boolean | undefined;
  isChecked: boolean;
}
