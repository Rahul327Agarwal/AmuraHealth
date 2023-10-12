import React from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { SelectedTick } from '../../../../SVGs/Common';
import { useStyles } from './BiomarkerCard.styles';
import { IBiomarkerCardProps } from './BiomarkerCard.types';

export default function BiomarkerCard(props: IBiomarkerCardProps) {
  const { isSelected, biomarkerName, onClick } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  return (
    <div className={classes.cardDiv} onClick={onClick}>
      {isSelected && <div className={classes.backgroundActiveBg}></div>}
      {isSelected && <span className={classes.tick}>{<SelectedTick />}</span>}
      <div className={`${commonClasses.body15Medium} ${classes.grigDiv}`}>{biomarkerName}</div>
    </div>
  );
}
