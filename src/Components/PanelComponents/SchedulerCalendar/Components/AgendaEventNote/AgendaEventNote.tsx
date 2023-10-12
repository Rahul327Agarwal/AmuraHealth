import React from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { UnionIcon } from '../../../../SVGs/Common';
import { useStyles } from './AgendaEventNote.styles';
import { IProps } from './AgendaEventNote.types';
import { AmuraIcon } from '../../SchedularCalendar.svg';

export default function AgendaEventNote(props: IProps) {
  const { title, description, time, onClick, roleName } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  return (
    <div className={classes.EventsCards} onClick={onClick}>
      <div className={`${commonClasses.caption12Medium} ${classes.titleStyle}`}>{title}</div>
      <div className={`${commonClasses.caption12Regular} ${classes.desStyle}`}>{description}</div>
      <div className={classes.timeRoleDiv}>
        <div className={classes.timeDiv}>
          <UnionIcon />
          <span className={`${classes.eventTime} ${commonClasses.sm10Medium}`}>{time}</span>
        </div>
        {roleName && (
          <div className={`${classes.roleDiv} ${commonClasses.sm8Medium}`}>
            <AmuraIcon />
            <span>{roleName}</span>
          </div>
        )}
      </div>
    </div>
  );
}
