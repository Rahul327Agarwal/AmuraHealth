import React from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import MUIButton from '../../../LibraryComponents/MUIButton/MUIButton';
import { SomethingWentWrongImage } from '../ErrorBoundary.svg';
import { useStyles } from './ErrorScreen.styles';
import { IProps } from './ErrorScreen.types';

export default function ErrorScreen(props: IProps) {
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <section className={classes.rootContainer1}>
      <div className={classes.errorContainer}>
        <div className={classes.imageBox}>
          <SomethingWentWrongImage />
        </div>
        <div className={classes.errorContent}>
          <div className={`${commonClasses.body20Regular} ${classes.errorHeader}`}>Something went wrong.</div>
          <div className={`${commonClasses.body17Regular} ${classes.errorSubHeader}`}>
            Our engineers have been notified and are working to resolve the issue. Please close the application and reopen, or
            click on retry. Retry
          </div>
          <div className={`${commonClasses.body20Regular} ${classes.errorMessage2}`}>
            Please close the application and reopen, or click on retry. Retry
          </div>
          <MUIButton
            variant="contained"
            onClick={() => {
              window.location.reload();
            }}
          >
            Retry
          </MUIButton>
        </div>
      </div>
    </section>
  );
}
