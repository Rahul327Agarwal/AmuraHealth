import { MouseEventHandler } from 'react';

export interface ProfileCardProps {
  id: string;
  handleSelect: MouseEventHandler;
  profileName: string;
  ratingValue: String;
  progressValue: number;
  progreesColor: String;
  profileURL?: string;
  isSelected?: boolean;
}

export interface ProfileCardGroupProps {
  profileLists: Array<ProfileCardProps>;
  selectedProfile: string;
  setSelectedProfile: Function;
  bottomComponent?: any;
}

export interface ProgressProps {
  progressValue: number;
  progreesColor: String;
}

export const barColors = ['#0096C7', '#F3752B', '#DA5552', '#52B788'];
