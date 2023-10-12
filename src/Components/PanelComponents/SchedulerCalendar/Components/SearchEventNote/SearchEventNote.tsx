import React from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { useStyles } from './SearchEventNote.styles';
import { IProps } from './SearchEventNote.types';
import { AmuraIcon } from '../../SchedularCalendar.svg';

export default function SearchEventNote(props: IProps) {
  const { time, title, onClick, roleName } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  return (
    <div className={classes.eventContainer} onClick={onClick}>
      <div className={classes.beforeBox} />
      <div className={classes.eventBodyDiv}>
        <div className={classes.eventContentBox}>
          <span className={`${commonClasses.body15Medium} ${classes.title}`}>{title}</span>
          <span className={`${commonClasses.body14Regular} ${classes.time}`}>{time} </span>
        </div>
        {roleName && (
          <div className={`${classes.roleDiv} ${commonClasses.sm8Medium}`}>
            <AmuraIcon />
            <span>{roleName}</span>
          </div>
        )}
      </div>
      <div className={classes.afterBox} />
    </div>
  );
}
