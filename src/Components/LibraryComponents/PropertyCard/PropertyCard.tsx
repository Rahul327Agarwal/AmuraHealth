import React, { useEffect, useState } from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { InfoIcon } from '../../SVGs/Common';
import MUISlider  from '../MUISlider/MUISlider';
import MUITooltip  from '../MUITooltip/MUITooltip';
import ProgressBar from '../ProfileCardGroup/ProgressBar';
import { marks } from './PropertyCard.function';
import { useStyles } from './PropertyCard.styles';
import { IProps } from './PropertyCard.types';

const PropertyCard = (props: IProps) => {
  const {
    onRangeChange,
    id,
    isResetFilter,
    defaultRangeValue,
    customStyle,
    headerTitle,
    tooltipText,
    rangeHeader,
    profileProgress,
  } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();
  const [range, setRange] = useState(defaultRangeValue);

  useEffect(() => {
    if (isResetFilter) setRange(defaultRangeValue);
  }, [isResetFilter]);

  const handleRange = (_: unknown, value: any) => {
    onRangeChange({ [id]: value });
    setRange(value);
  };

  return (
    <div className={`${classes.PropertyCardWrap} ${customStyle}`}>
      <div className={classes.cardHeader}>
        <div className={classes.contentWrap}>
          <div className={classes.contentText}>
            <span className={commonClass.caption12Regular}> {headerTitle}</span>
            <MUITooltip title={tooltipText} arrow>
              {<InfoIcon />}
            </MUITooltip>
          </div>
          <strong className={`${classes.contentDetails} ${commonClass.body15Medium}`} title={rangeHeader}>
            {rangeHeader}
          </strong>
        </div>
        <div className={classes.graphWrap}>
          {profileProgress?.map((item: any, index: any) => {
            return <ProgressBar key={index} progressValue={(item[id] || 0) * 100} progreesColor={item?.progreesColor} />;
          })}
        </div>
      </div>
      {/* @ts-ignore */}
      <MUISlider value={range} min={0} max={10} onChange={handleRange} marks={marks} />
    </div>
  );
};

export default PropertyCard;
