import { useStyles } from './BotSummaryPanel.styles';
import { IProps } from './BotSummaryPanel.types';
import ProfileCard from './ProfileCard';

const BotSummaryPanel = (props: IProps) => {
  const { injectComponent, botData } = props;

  const { classes } = useStyles();

  return (
    <div className={classes.summaryPanelWrap}>
      <div className={classes.threeDotWrap}>
        <i className={classes.inject}>{injectComponent}</i>
      </div>
      <ProfileCard userId={''} data={botData} />
    </div>
  );
};

export default BotSummaryPanel;
