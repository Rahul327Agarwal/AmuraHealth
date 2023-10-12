import ErrorToaster from '../../../Common/ErrorToaster';
import SuccessToaster from '../../../Common/SuccessToaster';
import { setMyCustomerDetails } from '../../../DisplayFramework/State/Slices/DashboardSlice';
import { abortablePromise } from '../../../Utilities/AbortablePromise';
import { PMS_S3 } from '../../../Utils';
import {
  AllergensIcon,
  CloudCalling,
  ConfigurationIcon,
  DiabeticIcon,
  GenderIcon,
  GlobeIcon,
  HeightIcon,
  HistoryIcon,
  IntolrentIcon,
  LocationIcon,
  NotePadIcon,
  Protocol,
  Sensitivity,
  SettingIcon,
  SummaryIcon,
  Symtombs,
  VegIcon,
  WeightIcon,
  Whatsapp,
} from '../../SVGs/Common';
import { IProps } from './SummaryPanel.types';

export const threeDotOption = [
  // { label: 'View client profile', value: 'ViewClientProfile', icon: <ConfigurationIcon /> },
  { label: 'Cloud calling', value: 'cloudCalling', icon: <CloudCalling /> },
  { label: 'Chat on whatsapp', value: 'chatOnWhatsapp', icon: <Whatsapp /> },
  // { label: 'Export DP', value: 'ExportDP', icon: <ExportFileIcon /> },
];
export const threeDotOptionForLoggedInUser = [
  // { label: 'View profile', value: 'ViewClientProfile', icon: <ConfigurationIcon /> },
  // { label: 'Export DP', value: 'ExportDP', icon: <ExportFileIcon /> },
];
export const threeDotOptionForBasicUser = [
  // { label: 'View Client profile', value: 'ViewClientProfile', icon: <ConfigurationIcon /> },
  // { label: 'Export DP', value: 'ExportDP', icon: <ExportFileIcon /> },
];

export const REPORTEES_THREEDOT_OP = [{ label: 'View staff profile', value: 'VIEW_STAFF_PROFILE', icon: <ConfigurationIcon /> }];

export const listDettails = [
  { label: 'Male/24', icon: <GenderIcon /> },
  { label: '174 cm', icon: <HeightIcon /> },
  { label: '84 kg', icon: <WeightIcon /> },
  { label: 'Mediterranean', icon: <SummaryIcon /> },
  { label: 'Veg', icon: <VegIcon /> },
  { label: 'Indian', icon: <GlobeIcon /> },
  { label: 'Diabetes', icon: <DiabeticIcon /> },
  { label: 'Cancer', icon: <SettingIcon /> },
];

export const featureData = [
  {
    label: 'Conditions',
    icon: <GenderIcon />,
    description:
      'Type-2 dibetes S1, Asthma, Chronic Kidney disease S2, Hypertension S3, Acne... Type-2 dibetes S1, Asthma, Chronic Kidney disease S2, Hypertension S3, Acne... Type-2 dibetes S1, Asthma, Chronic Kidney disease S2, Hypertension S3, Acne...',
  },
  {
    label: 'Patients ask',
    icon: <NotePadIcon />,
    description: 'Type-2 dibetes S1, Asthma, Chronic Kidney disease S2, Hypertension S3, Acne...',
  },
  {
    label: 'Intolerent to',
    icon: <IntolrentIcon />,
    description: 'Type-2 dibetes S1, Asthma, Chronic Kidney disease S2, Hypertension S3, Acne...',
  },
  {
    label: 'Allergens',
    icon: <AllergensIcon />,
    description: 'Type-2 dibetes S1, Asthma, Chronic Kidney disease S2, Hypertension S3, Acne...',
  },
  {
    label: 'Sensitivity',
    icon: <Sensitivity />,
    description: 'Type-2 dibetes S1, Asthma, Chronic Kidney disease S2, Hypertension S3, Acne...',
  },
  {
    label: 'Conditions',
    icon: <LocationIcon />,
    description: 'Type-2 dibetes S1, Asthma, Chronic Kidney disease S2, Hypertension S3, Acne...',
  },
  {
    label: 'Symptoms',
    icon: <Symtombs />,
    description: 'Type-2 dibetes S1, Asthma, Chronic Kidney disease S2, Hypertension S3, Acne...',
  },
  {
    label: 'Protocols',
    icon: <Protocol />,
    description: 'Type-2 dibetes S1, Asthma, Chronic Kidney disease S2, Hypertension S3, Acne...',
  },
  {
    label: 'Client history',
    icon: <HistoryIcon />,
    description: 'Type-2 dibetes S1, Asthma, Chronic Kidney disease S2, Hypertension S3, Acne...',
  },
];

export const downloadFile = (userid: string, sessions: any) => {
  let reqBody = {
    url: `${import.meta.env.VITE_S3_DOWNLOAD_API}?key=pms-ql-user/${userid}/clientSnippet.jpg`,
    token: sessions.id_token,
    bucketName: import.meta.env.VITE_CLIENT_BUCKET,
    header: {
      accept: 'image/jpeg',
    },
  };
  PMS_S3.previewObject(reqBody);
};

export const getData = async (
  panelId: string,
  currentpatientId: string,
  props: IProps,
  dispatch: any,
  type: string,
  isStaff?: any,
  signal?: AbortSignal
) => {
  const customerPromise = PMS_S3.getObject(
    `pms-ql-user/${currentpatientId}/userProfile.json`,
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
  let optionalData: any = { ID: '', Topics: '' };
  if (!isStaff) {
    const clientData = PMS_S3.getObject(
      `pms-ql-mypatient/${currentpatientId}/mypatient.json`,
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
    const getClientData = await abortablePromise(clientData, signal);
    if (getClientData.Error) {
      ErrorToaster('Something went wrong! Please try again later');
    }
    optionalData = { ...optionalData, ...getClientData };
  } else {
    const staffData = PMS_S3.getObject(
      `pms-ql-mypatient/${currentpatientId}/staffSummary.json`,
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
    const getStaffData = await abortablePromise(staffData, signal);
    if (getStaffData.Error) {
      ErrorToaster('Something went wrong! Please try again later', panelId, 'error');
    }
    optionalData = { ...optionalData, ...getStaffData };
  }
  let customerData = {};
  const customerResponse = await abortablePromise(customerPromise, signal);
  if (customerResponse.Error) {
    ErrorToaster('Something went wrong! Please try again later', panelId, 'error');
  }
  customerData = customerResponse;

  dispatch(setMyCustomerDetails({ Synopsis: customerData, ID: currentpatientId, Topics: optionalData.Topics }));
  return { Synopsis: customerData, ...optionalData };
};

export const sendMessageInWhatsApp = (mobile: string) => {
  window.open(`${import.meta.env.VITE_WHATSAPP}${mobile}`, '_blank');
};

export const clickToCall = async (loggedInUserNumber: string, customerNumber: string, panelId?: string) => {
  try {
    await PMS_S3.makeClickToCall(loggedInUserNumber, customerNumber);
    SuccessToaster('Call placed!', panelId, 'success');
  } catch (e) {}
};
const socialPaltformOptions = [
  { label: 'Facebook', value: 'facebookUrl' },
  { label: 'Twitter', value: 'twitterUrl' },
  { label: 'Instagram', value: 'instagramUrl' },
  { label: 'LinkedIn', value: 'linkedInUrl' },
  { label: 'Youtube', value: 'youtubeUrl' },
];
export const checkSocialPlatformData = (data: any) => {
  if (!data) return;
  let socialPlatformDatastring: string[] = [];
  socialPaltformOptions.forEach((item) => {
    if (data[item?.value]) {
      socialPlatformDatastring.push(item.label);
    }
  });
  return socialPlatformDatastring.join(', ');
};
