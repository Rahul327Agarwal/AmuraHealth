import { MouseEventHandler } from 'react';

export interface IProps {
  headerTitle: any;
  options: Array<options>;
  values: string | Array<string>;
  setValues: Function;
  optionsType: 'label' | 'checkbox' | 'radio' | 'profileToken';
  isTokenDeletable?: boolean;
  isToken?: boolean;
  isDivider?: boolean;
  isSearch?: boolean;
  position: 'top' | 'bottom';
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
  disabled?: boolean;
  renderValueAsToken?: boolean;
  isReturnSelectedOption?: boolean;
  extendTokenHeight?: boolean;
  isEdit?: boolean;
  setIsEdit?: any;
  onSearchAPICall?: (value?: string) => any;
  renderValueAsTokenDeletable?: boolean;
  showMenu?: boolean;
  noUnderline?: boolean;
  // isCardType?: boolean;
  defaultEmptyValue?: string | Array<string>;
  listAutoHeight?: boolean;
  drawerPadding?: string;
  popOverCustomHeight?: string;
  // the optional isLoading prop can be used to show loaded if optionsa are being loaded
  isLoading?: boolean;
  maxHeight?: string;
  handleCloseRef?: (handleCloseFn: () => void) => void;
}

interface options {
  label: any;
  subLabel?: any;
  userId?: string;
  value: string;
  icon?: any;
  customType?: any;
  profileLabel?: string;
  hidden?: boolean;
}

// Wrapper Exported Type
export interface ISelectOption extends options {}
