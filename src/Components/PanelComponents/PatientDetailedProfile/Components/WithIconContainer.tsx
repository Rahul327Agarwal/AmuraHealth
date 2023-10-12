import React from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { IWithIconContainerProps } from './WithIconContainer.types';
import { useStyles } from './WithIconContainer.styles';

const WithIconContainer = (props: IWithIconContainerProps) => {
  const { isHidden, Icon, children, Label, iconStyle } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  return !isHidden ? (
    <section className={classes.iconContainerBox}>
      <aside className={`${classes.iconWrapper} ${iconStyle}`}>{Icon || ''}</aside>
      {Label ? <aside className={`${commonClasses.body15Regular} ${classes.primaryText}`}>{Label}</aside> : null}
      {children ? <aside className={classes.iconChildrenBox}>{children}</aside> : null}
    </section>
  ) : null;
};

export default WithIconContainer;
