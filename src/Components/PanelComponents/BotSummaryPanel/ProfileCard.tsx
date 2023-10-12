import { Avatar } from '@mui/material';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useStyles } from './BotSummaryPanel.styles';

const ProfileCard = (props: any) => {
  const { data } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();

  return (
    <div className={classes.profileCardWrap}>
      <Avatar className={`${classes.profilePic}`}>{data?.acronym || data?.tableName.slice(0, 1) || ''}</Avatar>
      <strong className={`${commonClass.body17Medium} ${classes.profileName}`}>{data?.tableName || ''}</strong>
    </div>
  );
};

export default ProfileCard;
