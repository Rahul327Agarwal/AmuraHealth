import React, { useEffect, useState } from 'react';
import { useStyles } from './NewVersion.styles';
import { IProps } from './NewVersion.types';
import MUIButton from '../../../LibraryComponents/MUIButton/MUIButton';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { NewVersionIcon } from '../ErrorBoundary.svg';

const NewVersion = (props: IProps) => {
  const { onReload } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();
  const handleRefresh = () => {
    onReload();
  };
  return (
    <div className={classes.rootContainer} data-display={props.reloadRequired}>
      <div className={classes.cardWrap}>
        <div className={classes.dflex}>
          <div>
            <NewVersionIcon />
          </div>
          <div className={classes.contentWrap}>
            <span className={`${commonClass.heading3} ${classes.mainHeading}`}>Update available!</span>
            <span className={`${commonClass.body17Regular} ${classes.mainHeading}`}>
              An update is available. Please hit "Update Now" to update.
            </span>
            <MUIButton variant="contained" className={classes.btnStyle} onClick={handleRefresh}>
              Update Now
            </MUIButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVersion;
