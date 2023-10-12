import moment from 'moment';
import React from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { useStyles } from './PresHeader.styles';
import { IProps } from './PresHeader.types';

const PresHeader = (props: IProps) => {
  const { prescriptionNumber, prescriptionStartDate } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();

  const prescriptionStartedFormat = moment(prescriptionStartDate).format('DD MMM YYYY');
  const startDate = moment(prescriptionStartDate).format('ddd DD, MMM YYYY');
  return (
    <div>
      <div className={`${commonClasses.body20Medium} ${classes.headerWrap}`}>Prescription</div>
      <div className={`${commonClasses.body15Regular} ${classes.description}`}>
        {prescriptionStartedFormat} | Prescription no: {prescriptionNumber}
      </div>
      <div className={classes.flex}>
        <div className={classes.Date}>
          <p className={classes.pmargin}>Date</p>
          <h5 className={classes.pmargin}>{startDate}</h5>
        </div>
        <div className={classes.Date}>
          <p className={classes.pmargin}>Time</p>
          <h5 className={classes.pmargin}>Whole Day</h5>
        </div>
      </div>
    </div>
  );
};

export default PresHeader;
