import React from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useStyles } from './SummaryPanel.styles';
import { synopsisItemProps } from './SummaryPanel.types';

const SynopsisItem = (props: synopsisItemProps) => {
  const { classes } = useStyles();
  const commonClass = useCommonStyles();
  const { icon, heading }: any = props;
  if (heading?.length > 0) {
    return (
      <li className={`${commonClass.body15Regular} ${classes.listItem}`}>
        <i className={classes.listIcon}>{icon}</i> {heading}
      </li>
    );
  } else {
    return null;
  }
};

export default SynopsisItem;
