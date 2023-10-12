import { CommonThreeDotModalProps } from '../ThreeDotModal/ThreeDotModal.types';

export interface ThreeDotMenuProps extends CommonThreeDotModalProps {
  options: Array<ThreeDotOptions>;
  handleClick: Function;
  isAvatarIcon?: boolean;
  isDivider?: boolean;
  selectedOption?: string | null;
  setIsOpen?: Function
}

export interface ThreeDotOptions {
  label: any;
  value: string;
  icon?: any;
  avatarUrl?: string;
  disabled?: boolean;
}

export interface RenderButtonProps {
  icon: React.ReactElement;
  label: string;
}
