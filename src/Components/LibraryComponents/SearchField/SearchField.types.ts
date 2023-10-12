import { searchIcon } from './../../Registration/assets/Svgs';
export interface IProps {
  handleSearch: Function;
  maxHeight?: string;
  placeholder?: string;
  customStyle?: string;
  autoFocus?: boolean;
  value?: string;
  disabled?: boolean;
  onKeyDown?: Function;
  isInputVariant?: boolean;
  setSearchResult?: Function;
  setSearchString?: Function;
  isReadOnly?: boolean;
  onFocus?: React.FocusEventHandler;
  onClick?: React.MouseEventHandler;
  disableAutoFocus?: boolean;
  searchIcon?: JSX.Element;
  onPaste?: Function;
  isValidEmail?: boolean;
  onAddEmail?: Function;
}
