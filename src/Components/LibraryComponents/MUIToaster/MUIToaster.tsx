import { IconButton } from '@mui/material';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useStyles } from './MUIToaster.styles';
import { CrossToasterIcon, ErrorIcon, InformativeIcon, SuccessToasterIcon, WarningIcon } from './MUIToaster.svg';
import { IProps } from './MUIToaster.types';
import { useState } from 'react';

export const TOASTER_OBJECT = {
  success: { icon: <SuccessToasterIcon />, message: 'Successful !' },
  error: { icon: <ErrorIcon />, message: 'Error !' },
  warning: { icon: <WarningIcon />, message: 'Something is not right !' },
  info: { icon: <InformativeIcon />, message: 'Something is not right !' },
};
export default function MUIToaster(props: IProps) {
  const { message, variant } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const [showFullMessage, setShowFullMessage] = useState<boolean>(message && message.length > 80 ? false : true);

  let messageTrunc;
  if (message.length > 80) {
    messageTrunc = message.slice(0, 80);
  }

  const fullMessageHandler = (event) => {
    event.stopPropagation();
    setShowFullMessage(true);
  };

  return (
    <div className={classes.toasterContainer} data-testid="toaster">
      <div className={classes.whiteText}>{TOASTER_OBJECT[variant]?.icon}</div>
      <div className={`${commonClasses.body14Regular} ${classes.whiteText}`}>
        {message ? (!showFullMessage ? messageTrunc : message) : TOASTER_OBJECT[variant]?.message}
        {!showFullMessage ? (
          <span style={{ cursor: 'default' }} onClick={fullMessageHandler}>
            .....
          </span>
        ) : null}
      </div>
      <IconButton>{<CrossToasterIcon />}</IconButton>
    </div>
  );
}
