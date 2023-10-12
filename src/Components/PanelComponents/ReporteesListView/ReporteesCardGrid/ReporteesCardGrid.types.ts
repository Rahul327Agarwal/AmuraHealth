import { MouseEventHandler } from 'react';

export interface IProps {
  active?: boolean;
  staffId: string;
  staffName: string;
  roleId: string;
  firstChild: boolean;
  lastChild: boolean;
  hasChildren: boolean;
  parentIsLastChild: boolean;
  parentLastChildIndex: Array<number>;
  level: number;
  onClick: Function;
  isOpen?: boolean;
  onDescriptionClick: MouseEventHandler;
  blueDot: number;
  inDirectBlueDot: number;
  isLoading: boolean;
  allowSelect: boolean;
  selected: boolean;
  handleSelect: (data: boolean) => void;
  onReporteeCardClick: (event: React.MouseEvent<HTMLElement>) => void;

  onCalenderClick?: MouseEventHandler;
  onMyPageClick?: MouseEventHandler;
}
