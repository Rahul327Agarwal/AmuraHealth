export interface IProps {
  className?: string;
  userId?: string;
  userName: string;
  subLabel?: string;
  onDelete?: React.MouseEventHandler;
  isDefaultAvatarDark?: boolean;
  minWidth?: string;
}
