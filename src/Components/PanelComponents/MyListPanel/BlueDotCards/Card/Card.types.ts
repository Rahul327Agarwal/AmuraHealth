import React from 'react';

export interface ICardProps {
  cardData?: CardInfo;
  setSelectedCard?: React.Dispatch<React.SetStateAction<string>>;
  isSelected?: boolean;
}
export interface CardInfoOld {
  description?: string;
  createdOn?: string;
  endTime?: string;
  createdBy?: string;
  createdByName?: string;
  userId?: string;
  userName?: string;
  bluedotId?: string;
}
export interface CardInfo {
  Owner?: string;
  Resolved?: boolean;
  bluedotId?: string;
  typeOfTask?: string;
  endTime?: string;
  description?: string;
  transactionId?: string;
  createdBy?: string;
  createdOn?: string;
  updatedBy?: string;
  updatedOn?: string;
  action?: string;
  hierarchyId?: string;
  ownerId?: string;
  ownerRoleId?: string;
  notifiedUsers?: string[];
  reasonToClose?: string;
  reasonToTransfer?: string;
  partKey?: string;
  sortKey?: string;
  madeForName?: string;
  createdByName?: string;
  isTransferred?: boolean;
}
