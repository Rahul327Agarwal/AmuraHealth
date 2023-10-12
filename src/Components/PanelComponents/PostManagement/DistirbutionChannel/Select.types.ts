import { MouseEventHandler } from "react";

export interface IProps {
  headerTitle?: any;
  options: Array<options>;
  values: string | Array<string>;
  setValues: Function;
  optionsType: "label" | "checkbox" | "radio";
  isTokenDeletable?: boolean;
  isToken: boolean;
  isDivider?: boolean;
  isSearch?: boolean;
  position?: "top" | "bottom";
  placeholder?: string;
  optionsTypeReverse?: boolean;
  isWithIcon?: boolean;
  isReadOnly?: boolean;
  isAutoOk?: boolean;
  isCalender?: boolean;
  handleCustomType?: Function;
  handleEndAdornment?: MouseEventHandler;
  helperText?: any;
  parameter?: string;
  showSelectAll?: boolean;
  parentProps?:any;
  rawPostData?:any;
  noSendAPI?:boolean;
  onSelectClose?:Function;
  Icontype?:any;
}

interface options {
  label: any;
  value: string;
  icon?: any;
  customType?: any;
}
