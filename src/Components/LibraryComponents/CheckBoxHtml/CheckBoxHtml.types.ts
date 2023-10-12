export interface IProps {
  label: string;
  sublabel?: string;
  value?: any;
  handleCheck?: Function;
  disabled?: boolean | undefined;
  isChecked?: boolean;
  labelposition?: 'end' | 'start';
  handleAnswer: Function;
}
