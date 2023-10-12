export interface IProps {
  children: any;
  isOpen: boolean;
  disableAutoClose?: boolean;
  handleClose?: Function;
  variant?: "top" | "bottom";
  customStyle?: string;
}
