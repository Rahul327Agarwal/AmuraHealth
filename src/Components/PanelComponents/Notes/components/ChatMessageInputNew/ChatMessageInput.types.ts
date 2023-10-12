import { ChangeEventHandler } from "react";

export interface IProps {
  customStyle?: string;
  startAdornment?: React.ReactElement | JSX.Element;
  endAdornment?: React.ReactElement | JSX.Element;
  inputComponent?: React.ReactElement | JSX.Element;
  placeholder?: string;
  inputType?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: any;
  onKeyDown?: any;
  handleSend: () => void;
  isRadius?:any;
}
