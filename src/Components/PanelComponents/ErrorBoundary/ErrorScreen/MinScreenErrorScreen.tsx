import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import MUIButton from '../../../LibraryComponents/MUIButton/MUIButton';
import { SmallScreenSizeImage } from '../ErrorBoundary.svg';
import { useStyles } from './ErrorScreen.styles';
import { IProps } from './ErrorScreen.types';

export default function MinScreenErrorScreen(props: IProps) {
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <section className={classes.rootContainer1} data-min-screen="true">
      <div className={classes.errorContainerScreen}>
        <div className={classes.imageBox}>
          <SmallScreenSizeImage />
        </div>
        <div className={classes.errorContentScreen}>
          <div className={`${commonClasses.body20Regular} ${classes.errorHeader}`}>Small Screen Size!</div>
          <div className={`${commonClasses.body17Regular} ${classes.errorSubHeader}`}>
            This device is too small to display our application properly. Please rotate the device or use a larger device.
          </div>
          <MUIButton variant="contained" onClick={() => {}}>
            Okay
          </MUIButton>
        </div>
      </div>
    </section>
  );
}
