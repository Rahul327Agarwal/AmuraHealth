export interface IProps {
  open: boolean;
  headerText?: string;
  handleClose?: () => void;
  options: Array<{ label: string; value: string }>;
  btnDisabled?: boolean;
  buttonText: string;
  handleNext: () => void;
  handleSelection: (selection: string) => void;
  currentSelection: string;
}
