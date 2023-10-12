import React from 'react';
import { useCommonStyles } from '../../../../../../Common/Theme/CommonStyles';
import CaloriesRange  from '../CaloriesRange/CaloriesRange';
import { useStyles } from './CaloriesCard.styles';
import { IProps } from './CaloriesCard.types';

export default function CaloriesCard(props: IProps) {
  const { headerTitle, variant, calories, totalKcal, totalKcalTitle, customStyle, total } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  return (
    <div className={`${classes.cardContainer} ${customStyle}`}>
      <div className={`${commonClasses.body17Medium} ${classes.headerTitleStyle}`}>{headerTitle}</div>
      {variant === 'outerBottom' && (
        <div className={classes.caloriesHline}>
          <span className={`${commonClasses.sm10Regular} ${classes.aboutContent}`}>{totalKcalTitle}</span>
          <span className={`${commonClasses.sm10Medium} ${classes.aboutContent}`}>{total ? total : totalKcal}</span>
          <div className={`${classes.VLine}`} />
        </div>
      )}
      <CaloriesRange variant={variant} calories={calories} totalKcal={totalKcal} />
    </div>
  );
}
