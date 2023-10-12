import moment from 'moment';
import SuccessToast from '../../../Common/SuccessToaster';
import { PMS_S3 } from '../../../Utils';
import {
  CalendarIcon,
  CapsuleIcon,
  DropIcon,
  EffervescentIcon,
  GelIcon,
  LozengesIcon,
  ScoopIcon,
  SolutionIcon,
  SprayIcon,
  SyrupIcon,
  TableSpoonIcon,
  TabletIcon,
} from './Prescription.svg';
import { IProps } from './Prescription.types';
import { IDose, IRampingUP, IRampingDown, IPartOfDay } from './Medicine/Medicine.types';

export const timeOptions = [
  { label: 'Whole Day', value: 'W' },
  { label: 'Morning', value: 'M' },
  { label: 'Noon', value: 'A' },
  { label: 'Evening', value: 'E' },
  { label: 'Night', value: 'N' },
];
export const dayOptions = [
  { label: 'All', value: 'all' },
  { label: 'Today', value: 'today' },
  { label: 'Tomorrow', value: 'tomorrow' },
  { label: 'Select a date', value: 'custom', customType: <CalendarIcon /> },
];

export const initTimeFilterfalse = { M: false, A: false, E: false, N: false };
export const initTimeFilterTrue = { M: true, A: true, E: true, N: true };

const today = new Date(moment().format('YYYY-MM-DD'));
const tomorrow = new Date(moment().add(1, 'day').format('YYYY-MM-DD'));
export const initCustomDate = { today, tomorrow, custom: today };

export const getDose = (dose: IDose[] = [], part_of_the_day: IPartOfDay, nthDay: number, productStartDate: string) => {
  try {
    const count: IDose = dose.find((v: any) => v.part_of_the_day === part_of_the_day);
    if (nthDay === -1 || count?.ramping?.length === 0) {
      return count?.dosage || 0;
    }
    let ramping: any = nthDayDoseWhenRamping(count?.ramping || []);
    var startDate = moment(productStartDate, 'YYYY-MM-DD');
    var endDate = moment(count.start_date, 'YYYY-MM-DD');
    let productStartDay = endDate.diff(startDate, 'days');
    let currentViewDay = nthDay - productStartDay;
    if (ramping[currentViewDay]) {
      return ramping[currentViewDay];
    }
    if (currentViewDay <= 0) {
      return 0;
    }
    return count?.dosage || 0;
  } catch (e) {
    console.error(e);
    return 0;
  }
};

export const nthDayDoseWhenRamping = (ramping: (IRampingUP | IRampingDown)[]) => {
  let result = {};
  let rampUp = ramping.find((value: IRampingUP) => value?.is_ramp_up);
  let rampDown = ramping.find((value: IRampingDown) => value?.is_ramp_down);
  if (rampUp) {
    result = { ...getRampUpDoseForNthDay(rampUp.ramp_id) };
  }
  if (rampDown) {
    result = { ...getRampDownDoseForNthDay(rampDown.ramp_id) };
  }
  return result;
};

export const getRampUpDoseForNthDay = (ramp_id: string) => {
  try {
    let ramp = ramp_id.split(',').map((value) => value.trim());
    let rampingWithDose: any = {};
    let nthDay = 1;
    ramp.forEach((value) => {
      let [dose, rampingDays] = value.split('/').map((value) => Number(value));
      let ramp = 0;
      while (ramp < rampingDays) {
        rampingWithDose[nthDay] = dose;
        ramp++;
        nthDay++;
      }
    });
    return rampingWithDose;
  } catch (e) {
    console.error('Error while getting ramp up dose', e);
    return {};
  }
};

export const getRampDownDoseForNthDay = (ramp_id: string) => {
  try {
    let ramp = ramp_id.split(',').map((value) => value.trim());
    let rampingWithDose: any = {};
    let nthDay = 90;
    let totalRampDownDays = 0;
    ramp.forEach((value) => {
      let [dose, rampingDays] = value.split('/').map((value) => Number(value));
      totalRampDownDays += rampingDays;
    });
    nthDay -= totalRampDownDays;
    ramp.forEach((value) => {
      let [dose, rampingDays] = value.split('/').map((value) => Number(value));
      let ramp = 0;
      while (ramp < rampingDays) {
        rampingWithDose[nthDay + 1] = dose;
        ramp++;
        nthDay++;
      }
    });
    return rampingWithDose;
  } catch (e) {
    console.error('Error while getting ramp down dose', e);
    return {};
  }
};

export const getCapsuleIcon = (tab: any) => {
  switch (tab) {
    case 'Tab.':
      return <TabletIcon />;
    case 'Cap.':
      return <CapsuleIcon />;
    case 'Gel.':
      return <GelIcon />;
    case 'Syp.':
      return <SyrupIcon />;
    case 'Scp.':
      return <ScoopIcon />;
    case 'TSP':
      return <TableSpoonIcon />;
    case 'Sol.':
      return <SolutionIcon />;
    case 'Eff.':
      return <EffervescentIcon />;
    case 'Loz':
      return <LozengesIcon />;
    case 'Drop.':
      return <DropIcon />;
    case 'Spry.':
      return <SprayIcon />;
    default:
      return <GelIcon />;
  }
};

export const getPrescriptionData = async (props: IProps) => {
  let prescriptionKey = removingLocaleInfoFromKey(props.prescriptionKey!);
  if (!prescriptionKey) {
    console.error('Prescription key is not present');
    return null;
  }
  let response = await PMS_S3.getObject(
    prescriptionKey,
    import.meta.env.VITE_CLIENT_BUCKET,
    {
      TenantId: props.selectedClient.tenant_id,
      Locale: sessionStorage.getItem('locale'),
      url: import.meta.env.VITE_S3_FETCH_API,
      token: props.sessions.id_token,
      headers: {},
    },
    {}
  );
  if (!response?.Error) {
    return response;
  }
  return null;
};

export const startPrescriptionAPI = async (props: IProps) => {
  let response = await PMS_S3.postData({
    PrescriptionKey: props.prescriptionKey,
    UserName: props.sessions.userId,
    PatientId: props.selectedClient.client_id,
    EventName: 'start_prescription',
    TenantId: props.selectedClient.tenant_id,
    Locale: sessionStorage.getItem('locale'),
    url: import.meta.env.VITE_START_PRESCRIPTION,
    token: props.sessions.id_token,
    method: 'POST',
    headers: {},
  });
  if (!response?.Error) {
    return response;
  }
  return null;
};

const removingLocaleInfoFromKey = (prescriptionKey: string) => {
  try {
    return prescriptionKey.split('/').splice(1).join('/') || '';
  } catch (e) {
    return '';
  }
};

export const openPrescriptionInNewTab = (prescriptionURL: string) => {
  let urlToOpen = `${prescriptionURL}`;
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = urlToOpen;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const previewPrescription = async (props: IProps, generatedPrescriptionFileName: string, typeOfDownload: any) => {
  const { sessions, patientId, selectedClient } = props;
  let prescriptionNumber = generatedPrescriptionFileName.substring(0, generatedPrescriptionFileName.indexOf('.')).split('_');
  let prescriptionTitle = `${selectedClient.client_name}-${moment(parseInt(prescriptionNumber[0])).format('YYMMDD')}-${
    prescriptionNumber[1]
  }`;
  if (typeOfDownload === 'prescription' || typeOfDownload === 'downloadAll') {
    let reqBody = {
      isDownloadRequired: true,
      fileName: `${prescriptionTitle}-prescription`,
      url: `${
        import.meta.env.VITE_S3_DOWNLOAD_API
      }?key=pms-ql-prescription/${patientId}/prescription/${generatedPrescriptionFileName}`,
      token: sessions.id_token,
      headers: {
        'Content-Type': 'application/pdf',
      },
    };
    PMS_S3.previewObject(reqBody);
  }
  if (typeOfDownload === 'shoppingList' || typeOfDownload === 'downloadAll') {
    let reqBody = {
      isDownloadRequired: true,
      url: `${
        import.meta.env.VITE_S3_DOWNLOAD_API
      }?key=pms-ql-prescription/${patientId}/shoppingList/${generatedPrescriptionFileName}`,
      token: sessions.id_token,
      fileName: `${prescriptionTitle}-shoppinglist`,
      headers: {
        'Content-Type': 'application/pdf',
      },
    };
    PMS_S3.previewObject(reqBody);
  }
  if (typeOfDownload === 'consumption 1-7d' || typeOfDownload === 'downloadAll') {
    let reqBody = {
      isDownloadRequired: true,
      url: `${
        import.meta.env.VITE_S3_DOWNLOAD_API
      }?key=pms-ql-prescription/${patientId}/consumptionSheet/firstWeekConsumptionSheet/${generatedPrescriptionFileName}`,
      token: sessions.id_token,
      fileName: `${prescriptionTitle}-consumption sheet 1-7d`,
      headers: {
        'Content-Type': 'application/pdf',
      },
    };
    PMS_S3.previewObject(reqBody);
  }
  if (typeOfDownload === 'consumption 8d+' || typeOfDownload === 'downloadAll') {
    let reqBody = {
      isDownloadRequired: true,
      url: `${
        import.meta.env.VITE_S3_DOWNLOAD_API
      }?key=pms-ql-prescription/${patientId}/consumptionSheet/${generatedPrescriptionFileName}`,
      token: sessions.id_token,
      fileName: `${prescriptionTitle}-consumption sheet 8d+`,
      headers: {
        'Content-Type': 'application/pdf',
      },
    };
    PMS_S3.previewObject(reqBody);
  }
  return true;
};

export const copyToClipboard = (prescriptionURL: string, panelId: string) => {
  let urlToOpen = `${window.location.protocol}//${window.location.host}${prescriptionURL}`;
  navigator.clipboard.writeText(urlToOpen);
  SuccessToast('Link copied to clipboard', panelId, 'success');
};

export const getNthDayOfPrescription = (filter: string, selectedDate: Date, prescriptionStartDate: Date): number => {
  if (filter === 'all') {
    return -1;
  }
  selectedDate.setHours(0, 0, 0, 0);
  prescriptionStartDate.setHours(0, 0, 0, 0);
  let prescriptionEndDate = new Date(moment(new Date(prescriptionStartDate)).add(90, 'd').format());
  let day = 0;
  if (selectedDate.getTime() >= prescriptionStartDate.getTime() && selectedDate.getTime() < prescriptionEndDate.getTime()) {
    day = moment(selectedDate).diff(moment(prescriptionStartDate), 'days');
    return day + 1;
  }
  return -1;
};
