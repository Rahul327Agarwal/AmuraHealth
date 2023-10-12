import moment from 'moment';
import { PMS_S3 } from '../../../../Utils';
import { setPrescriptionList } from './../../../../DisplayFramework/State/Slices/DashboardSlice';

export const fetchPrescription = async (
  sessions: { id_token: any },
  selectedClient: { tenant_id: any },
  patientId: any,
  dispatch: any,
  setFilteredPrescriptionList: any,
  setLoadingFlag: any
) => {
  setLoadingFlag(true);
  const prescriptionsList: any = await PMS_S3.listS3Files(
    `pms-ql-prescription/${patientId}`,
    import.meta.env.VITE_PLATFORM_BUCKET!,
    {
      TenantId: selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_LISTS3_FILES_API,
      token: sessions.id_token,
      headers: {},
    },
    'error'
  );
  if (prescriptionsList && Array.isArray(prescriptionsList) && prescriptionsList.length > 0) {
    const listOfPrescriptions = prescriptionsList.reverse().filter((item) => item.Key.indexOf('.json') >= 0);
    dispatch(setPrescriptionList(listOfPrescriptions));
    setFilteredPrescriptionList(listOfPrescriptions);
  }
  setLoadingFlag(false);
};

export const downloadPrescription = async (patientId: any, sessions: { id_token: any }, selectedClient: any, keyName: string) => {
  let prescriptionName = keyName?.substring(keyName?.lastIndexOf('/') + 1, keyName?.indexOf('.'));
  let prescriptionNameArray = prescriptionName.split('_');
  let prescriptionDate = moment(parseInt(prescriptionNameArray[0])).format('YYMMDD');
  let prescriptionId = prescriptionNameArray.length >= 2 ? prescriptionNameArray[1] : '';
  let prescriptionTitle = `${selectedClient.client_name}-${prescriptionDate}-${prescriptionId || ''}-prescription`;
  let reqBody = {
    isDownloadRequired: true,
    url: `${import.meta.env.VITE_S3_DOWNLOAD_API}?key=pms-ql-prescription/${patientId}/prescription/${prescriptionName}.pdf`,
    fileName: prescriptionTitle,
    token: sessions.id_token,
    headers: {
      'Content-Type': 'application/pdf',
    },
  };
  PMS_S3.previewObject(reqBody);
};

export const handlePrescriptionFilter = (filterValue: any, setSearchValue: any, data: any, setDisplayData: any) => {
  setSearchValue(filterValue);
  let filteredData: any = [];
  data.map((value: any) => {
    let prescriptionName = value?.Key?.substring(value?.Key?.lastIndexOf('/') + 1, value?.Key?.indexOf('.')).split('_');
    let prescriptionDate = moment(parseInt(prescriptionName[0])).format('YYYY-MM-DD');
    let prescriptionNumber = prescriptionName[1];
    let displayName = `${
      prescriptionDate !== 'Invalid date' ? prescriptionDate : moment(value?.LastModified).format('YYYY-MM-DD')
    }} - ${prescriptionNumber}`;

    if (displayName && displayName.toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) > -1) {
      filteredData.push(value);
    }
  });
  setDisplayData(JSON.parse(JSON.stringify(filteredData)));
};
