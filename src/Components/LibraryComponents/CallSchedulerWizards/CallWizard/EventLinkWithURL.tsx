import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { useStyles } from './CallWizard.styles';
import { LinkIcon } from '../SvgImages/LinkIcon';

export default function EventLinkWithURL(props: any) {
  const { urlLinkData } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  return (
    <div className={classes.linkContainer}>
      <div className={`${classes.timeContainer} ${commonClasses.body17Regular} marginB4`}>
        <span>{LinkIcon}</span>
        <span className={`${classes.textStyle} ${commonClasses.body17Regular} marginL12`}>Event Link</span>
      </div>
      <span className={`${classes.textStyle} ${commonClasses.body15Regular} marginL36`}>{urlLinkData || ''}</span>
    </div>
  );
}
