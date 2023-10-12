import React from 'react';
import { useStyles } from './Medicine.styles';
import { getCapsuleIcon, getDose, nthDayDoseWhenRamping } from '../Prescription.function';
import { MedicineRowProps } from '../Prescription.types';
import moment from 'moment';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { OrderLink } from '../Prescription.svg';
import { IDose, IPartOfDay, IProduct } from './Medicine.types';

const MedicineRow = (props: MedicineRowProps) => {
  const {
    selectedTime,
    disabled,
    startDay,
    type,
    name,
    productWithFood,
    endDay,
    quantity,
    sources,
    dose,
    prescriptionStarted,
    preStartDate,
    preEndDate,
    measurement,
    nthDay,
  } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  function getQuantity(product: IProduct) {
    try {
      let quantity = 0;
      let totalDosage = 0;
      let quantityPerUnit = parseInt(product?.quantityPerUnit);
      let dosages = product.dose;
      let prescriptionLength = product.endDay - product.startDay + 1;
      if (quantityPerUnit > 0 && dosages && dosages.length > 0) {
        for (let x in dosages) {
          // perDayDosage = perDayDosage + dosages[x]?.dosage;
          let ramping = nthDayDoseWhenRamping(dosages[x]?.ramping || []);
          Object.keys(ramping).forEach((value: any) => {
            totalDosage += (ramping as any)[value];
          });
          prescriptionLength = prescriptionLength - Object.keys(ramping).length;
          totalDosage += prescriptionLength * dosages[x]?.dosage;
        }
        let requiredDosageForPrescriptionLength = totalDosage;
        quantity = Math.ceil(requiredDosageForPrescriptionLength / quantityPerUnit);
      }
      return quantity;
    } catch (e) {
      return 0;
    }
  }
  return (
    <div className={classes.contentWrap}>
      <div className={`${classes.medicineBlock} ${classes.tabletBlock} ${disabled ? 'disabled' : ''}`}>
        <div className={classes.medicineWrap}>
          <div className={classes.medicineIcon}>{getCapsuleIcon(type)}</div>
          <div className={classes.infoWrapper}>
            <h5 className={`${classes.tabletTitle} ${commonClasses.body17Regular}`}> {name}</h5>
            <div className={`${classes.dflex} ${classes.flexWrap}`}>
              <p className={`${commonClasses.caption12Regular} ${classes.SubText} ${classes.tabletTime}`}>{productWithFood}</p>
              <p className={`${commonClasses.caption12Regular} ${classes.SubText}`}>
                {prescriptionStarted
                  ? `${moment(preStartDate).format('MMM DD')} - ${moment(preEndDate).format('MMM DD')}`
                  : `Day ${startDay} to ${endDay}`}
              </p>
            </div>
            <div className={`${classes.contentWrap} ${classes.mt}`}>
              <p className={`${commonClasses.sm10Regular} ${classes.tags}`}>
                {`${getQuantity(props)} ${measurement}${Number(getQuantity(props)) > 1 ? 's' : ''}`}
              </p>
              {sources.length > 0 && sources[0]?.url ? (
                <a href={sources.length > 0 && sources[0]?.url} target={'_blank'} className={classes.orderLink}>
                  {<OrderLink />}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {['M', 'A', 'E', 'N'].map((data: IPartOfDay, index, arr) => {
        const count = getDose(dose as IDose[], data, nthDay!, props.startDate);
        const disabledClass = selectedTime === data ? '' : !count || arr.includes(selectedTime!) ? 'colorLight' : '';
        return (
          <div
            className={`${count > 0 ? commonClasses.caption12Medium : commonClasses.caption12Regular} ${
              classes.dayBlock
            } ${disabledClass} ${disabled ? 'disabled' : ''}`}
            key={index}
          >
            {count}
          </div>
        );
      })}
    </div>
  );
};

export default MedicineRow;
