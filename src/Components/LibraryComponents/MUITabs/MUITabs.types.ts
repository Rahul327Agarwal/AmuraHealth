import { MouseEventHandler } from "react";

export interface IProps {
  paddingX?: string;
  customStyle?: string;
  tabOptions: Array<string>;
  activeTab: string;
  handleEditTab?: MouseEventHandler;
  onTabChange: Function;
}
