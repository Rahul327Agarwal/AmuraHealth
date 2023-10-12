import { format } from 'date-fns';
import React from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { calendarIocn } from '../SvgImages/calendarIocn';
import { useStyles } from './CallWizard.styles';

export default function DateWithTimeView(props: any) {
  const { toTime, fromTime, timezone } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  return (
    <div className={`${classes.timeContainer} ${commonClasses.body17Regular}`}>
      <span>{calendarIocn}</span>
      <span className={`${classes.textStyle} ${commonClasses.body17Regular} marginL12`}>
        {format(new Date(fromTime || new Date()), 'eee dd, MMM yyyy ')}  |  {format(new Date(fromTime || new Date()), ' hh:mm a')}
        {/* -
        {format(new Date(toTime || new Date()), ' hh:mm a ')} */}
        {timezone ? ` (${timezone})` : ``}
      </span>
    </div>
  );
}
