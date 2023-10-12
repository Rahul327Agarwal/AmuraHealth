import { PMS_LOCALE } from '../../../../../Utils';
import { useStyles } from './PrescriptionDietProtocol.styles';

export default function PrescriptionDietProtocol(props) {
  const { classes } = useStyles();
  return (
    <div className={classes.prescriptioncmpsection}>
      <div className={classes.prescriptionCard}>
        <div>
          <h3 className={classes.conditionHeader}>{PMS_LOCALE.translate('Diet Protocols')}</h3>
        </div>

        <div className={classes.noData}>
          <span>{PMS_LOCALE.translate('No Protocols assigned.')}</span>
        </div>
      </div>
    </div>
  );
}
