import React from 'react';
import ReportEditHistory from '../ReportEditHistory/ReportEditHistory';
import ReportView from './ReportView';
import { IReportViewHome } from './ReportView.types';

export default function ReportViewHome(props: IReportViewHome) {
  switch (props.rendarScreen) {
    case 'REPORT_VIEW':
      return <ReportView {...props} />;
    case 'REPORT_HISTORY':
      return <ReportEditHistory {...props} />;
    default:
      return <></>;
  }
}
