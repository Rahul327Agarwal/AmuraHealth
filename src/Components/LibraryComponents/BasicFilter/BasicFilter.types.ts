import { MouseEventHandler } from 'react';

export interface IProps {
  filterOptions: Array<filtersConfig>;
  handleClear: MouseEventHandler;
  isExtend?: boolean;
  setIsExtend?: Function;
  paddingX?: string;
  diableClear?: boolean;
  handleExportData?: MouseEventHandler;
  isClearIcon?: boolean;
  noActionOptions?: boolean;
  startAdornment?: any;
  endAdornment?: any;
  customStyle?: string;
  keepOnlyExpandBtn?: boolean;
  showGroups?: boolean;
  setShowGroups?: Function;
  activeGroup?: any;
  myListGroups?: any;
  showGCDashBoard?: boolean;
}
interface filtersConfig {
  id: string;
  title?: string;
  color: string;
  onClick: MouseEventHandler;
  isSelected: boolean;
}
