import React from 'react';

export interface IProps {
  tenantIcon?: React.ReactElement;
  displayName?: string;
  id: string;
  subLabel?: string;
  profileURL?: string;
  profileIcon?: React.ReactElement;
  onSelect: Function;
  isSelected?: boolean;
  selectType?: 'card' | 'checkbox';
  isSmallCard?: boolean;
  roundVariant?: boolean;
  isInlineSubLabel?: boolean;
  errorMessage?: string;
  userIsTA: boolean;
}
