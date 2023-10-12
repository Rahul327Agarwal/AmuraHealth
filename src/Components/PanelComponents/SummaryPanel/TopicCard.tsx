import React from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import ReadMoreReadLess from './../../LibraryComponents/ReadMoreReadLess/ReadMoreReadLess';
import ReadMore from './ReadMore';
import { useStyles } from './SummaryPanel.styles';
import { TopicCardProps } from './SummaryPanel.types';

const TopicCard = (props: TopicCardProps) => {
  const { classes } = useStyles();
  const commonClass = useCommonStyles();
  const { icon, heading, description, handleClick, selected, withoutIcon } = props;
  return (
    <div
      className={`${heading === 'Tenant' ? classes.featureCardWithNoCursor : classes.featureCard} ${
        selected ? classes.selectedSnippet : ''
      }`}
      onClick={handleClick}
    >
      {!withoutIcon && <i className={classes.featureIcon}>{icon}</i>}
      <div className={classes.contentWrap}>
        <strong className={`${commonClass.body15Medium} ${classes.featureTitle}`}>{heading}</strong>
        {/* <ReadMoreReadLess charLimit={65}>{description}</ReadMoreReadLess> */}
        <div key={description}>
          <ReadMore text={description} />
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
