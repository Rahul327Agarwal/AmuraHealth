import React from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { useStyles } from './BiomarkerCard.styles';
import { IProps } from './BiomarkerCard.types';

const BiomarkerCard = (props: IProps) => {
  const { groupData, groupName } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  return (
    <div className={classes.wrapper}>
      {groupName && <span className={`${classes.biomarkerName} ${commonClasses.body17Medium}`}>{groupName}</span>}
      {groupData?.map((data) => {
        return (
          <div className={classes.dflex}>
            <div className={classes.unitName}>
              <span className={commonClasses.body15Regular}>{data?.biomarkerId}</span>
            </div>
            <div className={classes.unit}>
              <span className={commonClasses.body15Regular}>{data?.unitId}</span>
            </div>
            <div className={classes.unitValue}>
              <span className={commonClasses.body15Regular}>{data?.value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BiomarkerCard;
