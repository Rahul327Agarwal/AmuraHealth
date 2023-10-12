import { IconProps } from "@mui/material";

export interface IProps {
  plusIcon?: IconProps;
  onPlusIconClick?: Function;
  searchIcon?: IconProps;
  onSearchIconClick?: Function;
  titleToBeDisplayed?: string;
  centerButton?: any;
  centerButtonLabel?: string;
  onButtonClick?: Function;
  disablePlus?: boolean;
  isButtonDisabled?: boolean;
  panelWidth?: any;
}
