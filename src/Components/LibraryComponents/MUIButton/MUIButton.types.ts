import { ButtonProps } from "@mui/material";

export interface IProps extends ButtonProps {
  fontSize?: string;
  showSingleLine?: boolean;
  background?: string;
  padding?: string;
  clickEffect?: boolean;
}
