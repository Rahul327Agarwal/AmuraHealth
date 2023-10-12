import { MouseEventHandler } from "react";

export interface IProps {
  actionOption?: Array<actionConfig>;
  injectComponent?: any;
  size?: "large" | "small";
  className?: string;
  paddingX?: string;
  padding?: string;
  startAdornment?: any;
  endAdornment?: any;
  hideAmuraIcon?: boolean;
  showGroups?: boolean;
  setShowGroups?: any;
  myListGroups?: any;
  activeGroup?: any;
}
export interface actionConfig {
  id: string;
  title?: string;
  icon: any;
  onClick: MouseEventHandler;
}
