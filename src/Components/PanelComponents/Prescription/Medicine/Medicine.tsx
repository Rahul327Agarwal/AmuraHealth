import React from 'react';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import {
  AfternoonIcon,
  AfternoonIconDark,
  EveningIcon,
  EveningIconDark,
  MorningIcon,
  MorningIconDark,
  NightIcon,
  NightIconDark,
} from '../Prescription.svg';
import { PrescriptionLargeIcon } from '../Prescription.svg';
import { MedicineTableProps } from '../Prescription.types';
import { useStyles } from './Medicine.styles';
import MedicineRow from './MedicineRow';

const Medicine = (props: MedicineTableProps) => {
  const { timeFilter, products, time, today, prescriptionStarted, nthDay, ...rest } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  if (!products.length)
    return (
      <section className={classes.noResultFound}>
        <PrescriptionLargeIcon />
        <div className={`${commonClasses.body20Regular} ${classes.sorryText}`}>Sorry... No result found</div>
        <div className={`${commonClasses.body17Regular} ${classes.sorrySubText}`}>
          No result match the filter criteria. Change filter to show results.
        </div>
      </section>
    );
  return (
    <div className={classes.rowWrap}>
      <div className={`${classes.headerWrap} ${!prescriptionStarted ? classes.sticky : classes.sticky40px}`}>
        <div className={`${classes.headerTitle} ${commonClasses.body17Medium}`}>Medicine</div>
        <div className={`${commonClasses.caption12Regular} ${classes.shiftIcon}`}>
          {timeFilter?.M ? <MorningIconDark /> : <MorningIcon />}
        </div>
        <div className={`${commonClasses.caption12Regular} ${classes.shiftIcon}`}>
          {timeFilter?.A ? <AfternoonIconDark /> : <AfternoonIcon />}
        </div>
        <div className={`${commonClasses.caption12Regular} ${classes.shiftIcon}`}>
          {timeFilter?.E ? <EveningIconDark /> : <EveningIcon />}
        </div>
        <div className={`${commonClasses.caption12Regular} ${classes.shiftIcon}`}>
          {timeFilter?.N ? <NightIconDark /> : <NightIcon />}
        </div>
      </div>
      <div className={classes.productsWrap}>
        {products.map((data: any, index) => (
          <MedicineRow
            key={index}
            {...data}
            {...rest}
            selectedTime={time}
            disabled={props.prescriptionStarted && Date.parse(today) < Date.parse(data.preStartDate)}
            nthDay={nthDay}
            prescriptionStarted={prescriptionStarted}
          />
        ))}
      </div>
    </div>
  );
};

export default Medicine;
