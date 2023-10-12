import { MouseEventHandler } from "react";
import { ThreeDotOptions } from "../ThreeDotMenu/ThreeDotMenu.types";

export interface IProps {
  customStyle?: string;
  tabOptions: Array<ITabOptions>;
  activeTab: any;
  threeDotOption?: Array<ThreeDotOptions>;
  handleThreeDot?: (data: string) => void;
  onTabChange: Function;
  onTabClick: any;
}

export interface TabContentProps extends Partial<ITabOptions> {
  classes: any;
  commonClasses: any;
  tabName: any;
}

export interface ITabOptions {
  isBlueDot?: boolean;
  isRedDot?: boolean;
  isBlackDot?: boolean;
  tabName: string;
  tabId: string;
}
