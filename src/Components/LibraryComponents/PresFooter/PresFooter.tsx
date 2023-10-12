import React from 'react';
import { useStyles } from './PresHeader.styles';
import { IProps } from './PresHeader.types';

const MedicineRow = (props: IProps) => {
  const { classes } = useStyles();
  return (
    <div>
      <div className={classes.headerWrap}>
        <p>Prescription</p>
      </div>
      <div className={classes.description}>
        <p>20 Jan 2022 | Prescription no: DWE344</p>
      </div>
      <div className={classes.flex}>
        <div className={classes.Date}>
          <p className={classes.pmargin}>Date</p>
          <h5 className={classes.pmargin}>Thu 17, Jun 2022</h5>
        </div>
        <div className={classes.Date}>
          <p className={classes.pmargin}>Time</p>
          <h5 className={classes.pmargin}>Whole Day</h5>
        </div>
      </div>
    </div>
  );
};

export default MedicineRow;
