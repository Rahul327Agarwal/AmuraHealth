import { useDFGoBack } from '../../../../../DisplayFramework/Events/DFEvents';
import { ApproveIcon, ConditionsIcon, DownloadIcon } from '../../Prescription.svg';
import { useStyles } from './PrescriptionFooter.styles';
import { IProps } from './PrescriptionFooter.types';

export default function PrescriptionFooter(props: IProps) {
  const { classes } = useStyles(props);
  const { previewService, addConditions, approvePrescription, disablePreview, disableApprove, disableConditions } = props;

  const goBack = useDFGoBack();
  return (
    <div className={`${classes.panelFooter} ${classes.footer}`}>
      <div
        onClick={() => {
          if (!disableConditions) {
            // addConditions();
            goBack('S');
          }
        }}
        className={disableConditions ? classes.disabledPreview : classes.iconStyles}
      >
        <ConditionsIcon />
      </div>
      <div
        onClick={() => {
          if (!disableApprove) {
            approvePrescription();
          }
        }}
        className={`${disableApprove ? classes.disableApprove : classes.iconStyles} ${classes.textCenter}`}
      >
        <ApproveIcon />
      </div>
      <div
        onClick={
          disablePreview
            ? () => {}
            : (e) => {
                previewService(e);
              }
        }
        className={`${disablePreview ? classes.disabledPreview : classes.iconStyles} ${classes.textRight}`}
      >
        <DownloadIcon />
      </div>
    </div>
  );
}
