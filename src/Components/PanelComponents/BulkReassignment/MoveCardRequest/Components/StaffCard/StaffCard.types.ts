import React, { ReactElement } from 'react';
export interface IProps {
  tenantIcon?: React.ReactElement;
  displayName: string;
  subLabel?: string;
  profileURL?: string;
  profileIcon?: ReactElement;
  onSelect: Function;
  isSelected?: boolean;
  errorMessage?: string;
}
