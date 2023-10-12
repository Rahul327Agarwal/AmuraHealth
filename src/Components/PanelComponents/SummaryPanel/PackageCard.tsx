import React from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { Fragile, VipIcon } from '../../SVGs/Common';
import { useStyles } from './SummaryPanel.styles';
import { PackageProps } from './SummaryPanel.types';
const PackageCard = (props: PackageProps) => {
  const { versionNumber, versionText, numberOfDayLeft, batchTextOne, batchTextTwo } = props;
  const { classes } = useStyles();
  const commonClass = useCommonStyles();

  return (
    <div className={classes.packageCardWrap}>
      <div className={classes.versionCardWrap}>
        <span className={`${commonClass.sm10Regular} ${classes.versionWrap}`}>{versionNumber}</span>
        <div className={classes.versionTextWrap}>
          <span className={`${commonClass.caption12Regular} ${classes.versionText}`}>{versionText}</span>
          <small className={`${commonClass.sm10Regular} ${classes.versionCaption}`}>
            {numberOfDayLeft} <span className={`${commonClass.sm10Regular} ${classes.versionSubCaption}`}>days left</span>
          </small>
        </div>
      </div>
      <div className={classes.batchWrap}>
        <span className={`${commonClass.caption12Regular} ${classes.batchText}`}>
          <i className={classes.batchIcon}>{<VipIcon />}</i>
          {batchTextOne}
        </span>
        <span className={`${commonClass.caption12Regular} ${classes.batchText}`}>
          <i className={classes.batchIcon}>{<Fragile />}</i>
          {batchTextTwo}
        </span>
      </div>
    </div>
  );
};

export default PackageCard;
