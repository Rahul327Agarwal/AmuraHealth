import { MouseEventHandler } from 'react';

export interface IProps {
  labName: string;
  reportDate: string;
  createdBy: string;
  createdByName: string;
  createdOn: string;
  isSelected: boolean;
  isActive: boolean;
  reasonForDeactivation: string;
  onClick: MouseEventHandler;
  onThreeDotAction: (data: TReportMenuTypes) => void;
}

export type TReportMenuTypes = 'DOWNLOAD' | 'EDIT' | 'VIEW_EDIT_HISTORY' | 'DEACTIVATE' | 'ACTIVATE';
