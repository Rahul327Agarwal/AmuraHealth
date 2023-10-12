import { LinearProgress } from '@mui/material';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { InitLoadingImage } from '../ErrorBoundary.svg';
import { useStyles } from './ErrorScreen.styles';
import { DeepLinkState } from '../../../../DisplayFramework/DeepLink/DeepLinkManager.state';

export default function LoadingScreen() {
  const { loadingText } = DeepLinkState.useDeepLinkLoading();

  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <section className={classes.rootContainer}>
      <div className={classes.loaderContainer}>
        <div className={classes.imageBox}>
          <InitLoadingImage />
        </div>
        <div className={classes.loaderBox}>
          <LinearProgress />
        </div>
        <div className={`${commonClasses.body20Regular} ${classes.loaderMessageBox}`}>
          {loadingText ?? 'Application is loading...'}
        </div>
      </div>
    </section>
  );
}
