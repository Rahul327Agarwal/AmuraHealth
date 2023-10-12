import React from 'react';
import { IProps } from './TimeSlot.types';
import { useStyles } from './TimeSlot.styles';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { formatAMPM } from '../../../NewTimeSlot/NewTimeSlot.functions';
import { PMS_LOCALE } from '../../../../../Utils';

export default function TimeSlot(props: IProps) {
  const { timeSlot, participants, isSelected, handleClick } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  return (
    <div
      className={classes.timeSlotContainer}
      onClick={() => {
        handleClick(new Date(timeSlot));
      }}
    >
      <div className={classes.timeContainer}>
        <span className={`${classes.timeSpan} ${commonClasses.caption12Medium}`} title={formatAMPM(new Date(timeSlot))}>
          {PMS_LOCALE.translate(formatAMPM(new Date(timeSlot)))}
        </span>
      </div>
      <div className={classes.circlesContainer}>
        {participants.map((participant) => (
          <div className={classes.circle} style={{ background: participant.color }}></div>
        ))}
      </div>
    </div>
  );
}
