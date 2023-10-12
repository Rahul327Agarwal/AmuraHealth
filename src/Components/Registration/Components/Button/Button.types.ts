import { ButtonProps } from '@mui/material';

export interface IProps extends ButtonProps {
  label: string | React.ReactElement;
  // variant?: "primary" | "secondary" | "tertiary" | "custom";
  disabled?: boolean;
  handleClick: Function;
  // title?: string;
  // textColor?: string;
  // focusColor?: string;
  // hoverColor?: string;
  // bgColor?: string;
}
