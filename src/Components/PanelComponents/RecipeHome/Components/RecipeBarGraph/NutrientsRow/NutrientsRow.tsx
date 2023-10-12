import { useCommonStyles } from '../../../../../../Common/Theme/CommonStyles';
import CaloriesRange  from '../CaloriesRange/CaloriesRange';
import { useStyles } from './NutrientsRow.styles';
import { INutrientsRowProps } from './NutrientsRow.types';

export default function NutrientsRow(props: INutrientsRowProps) {
  const { calories, title, value, totalKcal, noGraph, customStyle } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  return (
    <div className={`${classes.mainContainer} ${customStyle}`}>
      <div className={`${commonClasses.caption12Medium} ${classes.textStyle}`}>{title}</div>
      {!noGraph && <CaloriesRange width="149px" variant={'inner'} calories={calories} totalKcal={totalKcal} unit={value} />}
      {noGraph && <div className={`${commonClasses.caption12Medium} ${classes.unitTextStyle}`}>{value}</div>}
    </div>
  );
}
