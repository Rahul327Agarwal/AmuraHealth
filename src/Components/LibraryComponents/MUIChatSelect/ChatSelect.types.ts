export interface IProps {
  sessions?: any;
  headerTitle: any;
  options: Array<options>;
  values: string | Array<string>;
  setValues: Function;
  optionsType?: "label" | "checkbox" | "radio";
  isTokenDeletable?: boolean;
  isToken?: boolean;
  isDivider?: boolean;
  isSearch?: boolean;
  position: "top" | "bottom";
  optionsTypeReverse?: boolean;
  isAutoOk?: boolean;
  parameter?: string;
  showSelectAll?: boolean;
  onSearchAPICall?: (value?: string) => any;
  snippetId?: any;
  noSendAPI?: boolean;
  open: boolean;
  setOpen?: Function;
  onSelectClose?: Function;
  maxHeight?: number;
  extendTokenHeight?:boolean;
}

interface options {
  label: any;
  value: string;
  icon?: any;
}
