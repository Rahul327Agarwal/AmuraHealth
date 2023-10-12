import React from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { PMS_LOCALE } from '../../../Utils';
import { formatAMPM } from './NewTimeSlot.functions';
import { useStyles } from './NewTimeSlot.styles';
import { IProps } from './NewTimeSlot.types';

export default function NewTimeSlot(props: IProps) {
  const { timeSlot, participants, isSelected, handleClick, istimeZoneConvert, isDot, slotDetails } = props;
  const { classes } = useStyles(props);
  const commonClass = useCommonStyles();
  return (
    <div
      className={classes.timeSlotContainer}
      onClick={() => {
        handleClick(new Date(timeSlot));
      }}
    >
      <div className={classes.timeContainer}>
        {!istimeZoneConvert && (
          <span className={`${classes.timeSpan} ${commonClass.caption12Medium}`} title={formatAMPM(new Date(timeSlot))}>
            {PMS_LOCALE.translate(formatAMPM(new Date(timeSlot)))}
          </span>
        )}
        {istimeZoneConvert && (
          <span className={`${classes.timeSpan} ${commonClass.caption12Medium}`} title={`${timeSlot}`}>
            {`${timeSlot}`}
          </span>
        )}
      </div>
      <div className={classes.circlesContainer}>
        {participants.map((participant) => (
          <div className={classes.circle} style={{ background: isDot ? participant?.color : '#FFFFFF' }}></div>
        ))}
      </div>
    </div>
  );
}
