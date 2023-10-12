import { MouseEventHandler } from 'react';

export interface ISearchWithPopUp {
  placeholder?: string;
  label?: string;
  helperText?: string;
  onInputChange: Function;
  onSearchAPICall: Function;
  onDropDownOptionClick?: Function;
  values?: string;
  listRenderer: any;
}

export interface ISearchPopUp {
  searchedData?: IOptions[];
  setshowPopup: Function;
  onDropDownOptionClick: Function;
  suggestionIndex?: number;
}
export interface IRowProps {
  searchData?: any;
  onDropDownOptionClick: MouseEventHandler;
}
export interface IOptions {
  label: string;
  value: string;
}
