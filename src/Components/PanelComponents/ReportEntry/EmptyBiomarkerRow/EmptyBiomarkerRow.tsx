import * as React from 'react';
import { PMS_LOCALE } from '../../../../Utils';
import { IProps } from './EmptyBiomarkerRow.types';
import { useStyles } from './EmptyBiomarkerRow.styles';
import { subDeleteIcon } from '../../../Registration/assets/Svgs';

export const EmptyBiomarkerRow = (props: IProps) => {
  const { BiomarkerLongName, BiomarkerType, UnitShortName, BiomarkerReportValue, BiomarkerId } = props.patientBiomarker;
  const { classes } = useStyles();
  const titleToDisplay = (BiomarkerId ? BiomarkerId : `~~~~`).split('~');
  return (
    <div className="report-detail-biomarker-cmp">
      <div
        className="report-biomarker-data patient-biomarker-reportInfo-value my-text-overflow"
        onClick={() => props.editPatientBiomarker(props.index)}
        title={`${titleToDisplay[1]}${titleToDisplay[2].length >= 1 ? '-' : ''}${titleToDisplay[2]}-${titleToDisplay[3]}`}
        style={{ textAlign: 'initial' }}
      >
        {`${PMS_LOCALE.translate(BiomarkerLongName)} - ${PMS_LOCALE.translate(BiomarkerType)}`}
      </div>
      <div>
        <div className={classes.reportValue} onClick={() => props.editPatientBiomarker(props.index)} title={BiomarkerReportValue}>
          <span className={classes.reportValue}>{BiomarkerReportValue}</span>
        </div>
      </div>
      <div className={classes.biomarkerValue} onClick={() => props.editPatientBiomarker(props.index)} title={UnitShortName}>
        <span className={classes.biomarkerValue}>{PMS_LOCALE.translate(UnitShortName)}</span>
      </div>
      <div
        className={classes.deleteButton}
        onClick={() => props.deletePatientBiomarker(props.index)}
        style={{ display: props.editReport ? '' : 'none' }}
      >
        {subDeleteIcon}
      </div>
    </div>
  );
};
