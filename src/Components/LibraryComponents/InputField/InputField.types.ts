import { StandardTextFieldProps } from '@mui/material';

export interface IProps extends StandardTextFieldProps {
  isReadOnly?: boolean;
  renderValueAsToken?: boolean;
  renderValueAsTokenDeletable?: boolean;
  handleDeleteToken?: Function;
  solidVariant?: boolean;
  placeholder?: string;
  isSearchInput?: boolean;
  isProfileToken?: boolean;
  profileTokenList?: options[];
  onFocus?: any;
  errorText?: string;
  showError?: boolean;
  customStyle?: string;
  onBlur?: any;
  name?: string;
  characterLimit?:number
}

interface options {
  label: any;
  subLabel?: any;
  userId?: string;
  value: string;
  icon?: any;
  customType?: any;
  profileLabel?: string;
}
