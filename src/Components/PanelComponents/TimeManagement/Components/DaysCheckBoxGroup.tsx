import React from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { DAYS_OPTIONS } from '../TimeManagement.function';
import { useStyles } from '../TimeManagement.style';
import { DaysCheckBoxGroupProps } from '../TimeManagement.types';

export default function DaysCheckBoxGroup(props: DaysCheckBoxGroupProps) {
  const { onChange, values } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  return (
    <section className={classes.daysBox}>
      {DAYS_OPTIONS?.map(({ label, value }: any) => (
        <div className={classes.daysButton} key={value}>
          <input id={`${value}-id`} type="checkbox" checked={values.includes(value)} onChange={onChange} value={value} />
          <label className={commonClasses.body17Regular} htmlFor={`${value}-id`}>
            {label}
          </label>
        </div>
      ))}
    </section>
  );
}
