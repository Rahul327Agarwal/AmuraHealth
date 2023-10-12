import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { useStyles } from './AvailabilitySlot.styles';
import { IProps } from './AvailabilitySlot.types';

const AvailabilitySlot = (props: IProps) => {
  const { title, time, viewType, tenantIcon, elementProps } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();

  return (
    <div {...elementProps} className={classes.slotContainer}>
      <div className={classes.slotContentWrapper}>
        {tenantIcon && viewType === 'OneDay' ? <div className={classes.iconDiv}>{tenantIcon}</div> : null}
        <span className={`${commonClasses.sm10Regular} ${classes.slotContent}`}>{`${title} ${time}`}</span>
      </div>
    </div>
  );
};

export default AvailabilitySlot;
