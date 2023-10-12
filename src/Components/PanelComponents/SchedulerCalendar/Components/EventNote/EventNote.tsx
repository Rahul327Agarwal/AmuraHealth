import React from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { TenantIconV1 } from '../../../../SVGs/Common';
import { useStyles } from './EventNote.styles';
import { IProps } from './EventNote.types';

const EventNote = (props: IProps) => {
  const { title, time, tenantIcon, elementProps } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  return (
    <div {...elementProps} className={classes.eventContainer}>
      <div className={classes.eventContentWrapper}>
        <div className={classes.beforeBox} />
        <div className={classes.eventContentBox}>
          <span className={`${commonClasses.sm10Regular} ${classes.eventContent}`}>{`${title}${time ? `, ${time}` : ''}`}</span>
        </div>
        <div className={classes.afterBox} />
        {tenantIcon && (
          <div className={classes.iconDiv}>
            <TenantIconV1 />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventNote;
