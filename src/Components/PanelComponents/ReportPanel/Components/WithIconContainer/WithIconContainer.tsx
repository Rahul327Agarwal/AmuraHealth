import React from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { useStyles } from './WithIconContainer.styles';
import { IProps } from './WithIconContainer.types';

const WithIconContainer = (props: IProps) => {
  const { Icon, children, Label } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  return (
    <section className={classes.iconContainerBox}>
      <aside>{Icon || ''}</aside>
      {Label ? <aside className={`${commonClasses.body17Regular} ${classes.primaryText}`}>{Label}</aside> : null}
      {children ? <aside className={classes.iconChildrenBox}>{children}</aside> : null}
    </section>
  );
};

export default WithIconContainer;
