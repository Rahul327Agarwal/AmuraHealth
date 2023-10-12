import { useCommonStyles } from '../../../../../../Common/Theme/CommonStyles';
import MUITooltip  from '../../../../../LibraryComponents/MUITooltip/MUITooltip';
import { useStyles } from './CaloriesRange.styles';
import { ICaloriesRangeProps } from './CaloriesRange.types';

const COLORS = ['GREY500', 'GREY400', 'GREY50'];

export default function CaloriesRange(props: ICaloriesRangeProps) {
  const { variant, calories, customStyle, unit } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  return (
    <div className={`${classes.rangeContainer} ${customStyle}`}>
      {calories.map(
        (data, index) =>
          data?.kcal !== 0 &&
          data?.kcal !== '0' && (
            <MUITooltip title={variant === 'inner' ? `${data?.kcal} ${unit || ''}` : ''} placement={'top'} arrow>
              <div key={index} className={`${commonClasses.sm10Medium} ${classes.kaclStyle} ${COLORS[index]}`}>
                {variant === 'inner' ? (
                  <></>
                ) : (
                  <div className={classes.aboutCaloriesBox}>
                    {variant === 'outerBottom' && <div className={`${classes.VLine} ${COLORS[index]}`} />}
                    {data?.kcal && (
                      <>
                        {' '}
                        <span className={`${commonClasses.sm10Regular} ${classes.aboutContent}`}>{data.title || ''}</span>
                        <span className={`${commonClasses.sm10Medium} ${classes.aboutContent}`}>{data.value || ''}</span>
                      </>
                    )}
                    {variant === 'outerTop' && data?.kcal && <div className={`${classes.VLine} ${COLORS[index]}`} />}
                  </div>
                )}
              </div>
            </MUITooltip>
          )
      )}
    </div>
  );
}
