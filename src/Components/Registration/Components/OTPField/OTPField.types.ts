export interface IProps {
  shouldAutoFocus?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  numInputs?: number;
  handleSubmit?: Function;
}
