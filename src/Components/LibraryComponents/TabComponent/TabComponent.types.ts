import { MouseEventHandler } from "react";

export interface IProps {
  isActive: boolean;
  title: String;
  onClick: MouseEventHandler;
  isError?: boolean;
}
export interface IProp {
  tabs: Array<string>;
  paddingX?: string;
  handleClick?: Function;
  handleActiveTab?: Function;
  activeTab?: string
}
