import React from 'react';
import { IPanelId } from '../../../Core/DFCore.types';

import { useStyles } from './EmptyPanelWrapper.styles';
import { EmptyChatPanelIcon, EmptyDPanelIcon, EmptyRecipePanelIcon, EmptySummaryPanelIcon } from './EmptyPanelWrapper.svg';

export interface IProps {
  id: IPanelId;
}

const EmptyPanelWrapper = (props: IProps) => {
  const { id } = props;
  const { classes } = useStyles();

  return (
    <div className={classes.emptyPanelWrapper}>
      <div></div>
      {id === 'S' && <EmptySummaryPanelIcon />}
      {id === 'D' && <EmptyDPanelIcon />}
      {id === 'R' && <EmptyRecipePanelIcon />}
      {id === 'C' && <EmptyChatPanelIcon />}
    </div>
  );
};

export default EmptyPanelWrapper;
