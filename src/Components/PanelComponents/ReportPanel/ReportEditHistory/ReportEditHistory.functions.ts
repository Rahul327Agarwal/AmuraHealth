import { PMS_S3 } from '../../../../Utils';
import ErrorToaster from './../../../../Common/ErrorToaster';
import { IReportViewHome } from '../ReportView/ReportView.types';

export const getReportHistoryLists = async (panelId: string, props: IReportViewHome) => {
  try {
    const response = await PMS_S3.getObject(
      `pms-ql-biomarker-reports/${props.selectedClient.client_id}/${props.reportId}/reportHistory.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: '',
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: props.sessions.id_token,
      }
    );
    if (!response.Error) {
      return response.reportHistory;
    }
    return [];
  } catch (error) {
    ErrorToaster((error as any).message, panelId, 'error');
    return [];
  }
};
