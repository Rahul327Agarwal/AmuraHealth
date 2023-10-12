import { MouseEventHandler } from 'react';

export interface IBiomarkerCardProps {
  onClick: MouseEventHandler;
  isSelected: boolean;
  biomarkerName: string;
}
