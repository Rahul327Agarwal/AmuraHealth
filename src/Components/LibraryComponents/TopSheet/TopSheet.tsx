import React from 'react';
import { useStyles } from './TopSheet.styles';
import { IProps } from './TopSheet.types';

export default function TopSheet(props: IProps) {
  const { isOpen, children, handleClose, variant, disableAutoClose, customStyle } = props;
  const { classes } = useStyles();
  const ref = React.useRef(null);
  const [isActive, setIsActive] = React.useState(false);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target) && !disableAutoClose) {
      setIsActive(false);
      handleClose();
    }
  };
  React.useEffect(() => {
    setIsActive(isOpen);
  }, [isOpen]);

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div
      style={{
        visibility: isActive ? 'visible' : 'hidden',
        zIndex: isActive ? 1000 : -1,
      }}
    >
      <div
        className={classes.tab}
        style={{
          transition: 'all 0.1s ease-out',
          height: '100%',
          transformOrigin: variant === 'bottom' ? 'bottom center' : 'top center',
          transform: isActive ? 'scaleY(1)' : 'scaleY(0)',
        }}
      ></div>
      <div className={`${variant === 'bottom' ? classes.tabContentBottom : classes.tabContent} ${customStyle}`} ref={ref}>
        <div className={`${classes.dropdownWrap} ${isActive ? 'active' : ''} `}>{children}</div>
      </div>
    </div>
  );
}
