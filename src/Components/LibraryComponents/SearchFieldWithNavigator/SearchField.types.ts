export interface IProps {
  handleSearch: (data: string) => void;
  maxHeight?: string;
  placeholder?: string;
  customStyle?: string;
  autoFocus?: boolean;
  value: string;
  disabled?: boolean;
  handleNavClick: (data: 'UP' | 'DOWN') => void;
  isUpNavDisabled?: boolean;
  isDownNavDisabled?: boolean;
}
