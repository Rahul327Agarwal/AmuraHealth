import React from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { callIcon } from '../SvgImages/callIcon';
import { clockIcon } from '../SvgImages/clockIcon';
import { videoIcon } from '../SvgImages/videoIcon';
import { useStyles } from './CallWizard.styles';

export default function ChannalWIthDuration(props: any) {
  const { callType, duration, units } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  return (
    <div className={`${classes.channelWithdurationCon}`}>
      <span className={`${classes.iconStyle}`}>{callType === 'voice' ? callIcon : videoIcon}</span>
      <span className={`${classes.textStyle} marginL8 marginStyle ${commonClasses.body17Regular}`}>{callType || ''}</span>
      <span className={`${classes.iconStyle}`}>{clockIcon}</span>
      <span className={`${classes.textStyle} marginL8 ${commonClasses.body17Regular}`}>
        {duration || ''} {units || ''}
      </span>
    </div>
  );
}
