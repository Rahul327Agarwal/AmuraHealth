import React, { forwardRef, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { PDFGeneratorProps } from '../ReportView.types';
import BiomarkerCard from '../../Components/BiomarkerCard/BiomarkerCard';
import { useStyles } from './ReportPDFGenerator.styles';
import { IRootState } from './../../../../../DisplayFramework/State/store';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import ProfileCard from '../../../SummaryPanel/ProfileCard';
// import ProfileCard from '../../../SummaryPanel/ProfileCard';

const ReportPDFGenerator = (props: PDFGeneratorProps, ref: React.LegacyRef<HTMLDivElement>) => {
  const { classes } = useStyles();
  const commonClass = useCommonStyles();
  const { isGrouped, sampleDate, reportDate, biomarkerData, labName } = props;
  const [summary, setSummary] = useState({});

  let summaryData = useSelector((state: IRootState) => {
    return state.dashboard.myCustomer;
  });

  useEffect(() => {
    setSummary(JSON.parse(JSON.stringify(summaryData)));
  }, [summaryData]);

  return (
    <div ref={ref}>
      <div className={classes.profileCardSpacing}>
        <ProfileCard userId={summaryData?.ID || ''} data={summary} />
      </div>
      <div className={classes.header}>
        <div className={classes.detailsWrapper}>
          <p className={`${commonClass.caption12Regular} ${classes.styledPTag}`}>Reports</p>
          <p className={`${commonClass.body17Medium} ${classes.styledPTag}`}>{labName || ''}</p>
        </div>
        <div>
          <p className={`${commonClass.caption12Regular} ${classes.styledPTag}`}>
            Sample: {format(new Date(sampleDate), 'dd/MM/yyyy')}
          </p>
          <p className={`${commonClass.caption12Regular} ${classes.styledPTag}`}>
            Report: {format(new Date(reportDate), 'dd/MM/yyyy')}
          </p>
        </div>
      </div>
      <div className={classes.spacing}>
        {biomarkerData?.map((data: any) => {
          const groupName = isGrouped ? data?.groupName : '';
          const groupData = isGrouped ? data?.groupData : [data];
          return <BiomarkerCard groupName={groupName} groupData={groupData} />;
        })}
      </div>
    </div>
  );
};
export default forwardRef(ReportPDFGenerator);
