import { IconWithDotProps } from './ListDropdownHeader.types';
import { useStyles } from './ListDropdownHeader.styles';
import { RefreshBadgeIcon } from './ListDropdownHeader.svg';

const IconWithDot = (props: IconWithDotProps) => {
  const { Icon, isNotifyIcon, NotifyIcon, customStyle } = props;
  const { classes } = useStyles();

  return (
    <span className={`${classes.iconWithDotWrapper} ${customStyle}`}>
      {isNotifyIcon && <span className={`${classes.notifyIconWrapper}`}>{NotifyIcon ?? <RefreshBadgeIcon />}</span>}
      {Icon}
    </span>
  );
};

export default IconWithDot;
