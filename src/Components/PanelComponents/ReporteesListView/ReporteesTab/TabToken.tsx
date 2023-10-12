import React from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useStyles } from './ReporteesTab.styles';
import { ITabTokenProps } from './ReporteesTab.types';

const TabToken = (props: ITabTokenProps) => {
  const { label, active, progress, isLoading } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  return (
    <section className={`${commonClasses.body15Regular} ${classes.tokenSection}`} data-active={active}>
      {label}
      {active ? <div className={classes.progressBar} style={{ width: `${isLoading ? progress : 100}%` }} /> : null}
    </section>
  );
};

export default TabToken;
