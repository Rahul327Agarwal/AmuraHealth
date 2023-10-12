import React from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useStyles } from '../TimeManagement.style';
import { WithIconContainerProps } from '../TimeManagement.types';

const WithIconContainer = (props: WithIconContainerProps) => {
  const { isHidden, Icon, children, Label, iconStyle } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  return !isHidden ? (
    <section className={classes.iconContainerBox}>
      <aside className={`${classes.iconWrapper} ${iconStyle}`}>{Icon || ''}</aside>
      {Label ? <aside className={`${commonClasses.body17Regular} ${classes.primaryText}`}>{Label}</aside> : null}
      {children ? <aside className={classes.iconChildrenBox}>{children}</aside> : null}
    </section>
  ) : null;
};

export default WithIconContainer;
