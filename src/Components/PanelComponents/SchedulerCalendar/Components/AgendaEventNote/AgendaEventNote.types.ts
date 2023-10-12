import { MouseEventHandler } from 'react';

export interface IProps {
  title: string;
  description: string;
  time: string;
  isRsvpAccept?: boolean;
  isRsvpDecline?: boolean;
  onClick: MouseEventHandler;
  isAFB?:boolean;
  roleName?: string;
}
