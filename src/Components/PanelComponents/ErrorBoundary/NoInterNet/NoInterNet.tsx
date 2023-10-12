import React, { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import MUIButton from '../../../LibraryComponents/MUIButton/MUIButton';
import { NoInternetIcon } from '../ErrorBoundary.svg';
import { useStyles } from './NoInterNet.styles';
import { IProps } from './NoInterNet.types';

const NoInterNet = (props: IProps) => {
  const { classes } = useStyles();
  const commonClass = useCommonStyles();
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      window.location.reload();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return (
    <div className={classes.rootContainer} data-display={!isOnline}>
      <div className={classes.cardWrap}>
        <div className={classes.dflex}>
          <div>
            <NoInternetIcon />
          </div>
          <div className={classes.contentWrap}>
            <span className={`${commonClass.heading3} ${classes.mainHeading}`}>Could not connect</span>
            <span className={`${commonClass.body17Regular} ${classes.mainHeading}`}>
              Check your internet connection and try again.
            </span>

            <MUIButton variant="contained" className={classes.btnStyle} onClick={handleRefresh}>
              Refresh
            </MUIButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoInterNet;
