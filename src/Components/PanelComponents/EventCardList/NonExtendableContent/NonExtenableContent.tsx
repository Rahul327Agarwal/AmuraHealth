import React from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { EventCalendarIcon, EventClock } from '../EventCardList.svg';
import { useStyles } from './NonExtenableContent.styles';
import { IProps } from './NonExtenableContent.types';

const NonExtendableContent = (props: IProps) => {
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  return (
    <div className={`${classes.eventDateTimeContainer} ${commonClasses.caption12Regular}`}>
      <div className={`${classes.eventSchedule} `}>
        <div>{<EventCalendarIcon />}</div>
        <div>{props.date}</div>
      </div>
      <div className={classes.eventSchedule}>
        <div>{<EventClock />}</div>
        {props.time}
      </div>
    </div>
  );
};

export default NonExtendableContent;
