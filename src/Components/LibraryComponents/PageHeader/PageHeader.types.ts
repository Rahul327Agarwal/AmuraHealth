import { MouseEventHandler } from 'react';

export interface IProps {
  handleBack?: MouseEventHandler;
  isClearAll?: boolean;
  headerContent: any;
  handleClearAll?: MouseEventHandler;
  clearAllText?: any;
  endAdornment?: any;
  startAdornment?: any;
  bottomContainer?: any;
  customStyle?: string;
  paddingX?: string;
  titleAlignment?: any;
  bottomContainerStyle?: string;
  injectComponent?: any;
}
