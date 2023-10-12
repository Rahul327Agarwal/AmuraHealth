import ErrorToaster from '../../../Common/ErrorToaster';
import { PMS_S3 } from '../../../Utils';
import { CloudCalling, Configuration, Whatsapp } from './BulkSummary.svg';
import { ISummaryData } from './BulkSummary.types';

export const threeDotOption = [
  { label: 'View profile', value: 'ViewClientProfile', icon: Configuration },
  { label: 'Cloud calling', value: 'cloudCalling', icon: CloudCalling },
  { label: 'Chat on whatsapp', value: 'chatOnWhatsapp', icon: Whatsapp },
  // { label: "Export DP", value: "ExportDP", icon: exportFileIcon },
];

export const getSumnmaryData = async (
  panelId: string,
  sessions: any,
  tenantId: any,
  cardType: any,
  cardId: any
): Promise<ISummaryData> => {
  try {
    const reqBody = {
      method: 'POST',
      token: sessions.id_token,
      url: import.meta.env.VITE_GET_BULK_CARDS_SUMMARY,
      cardType: cardType,
      cardId: cardId,
      snippetIds: ['readyToAssign', 'assignedCards'], //['readyToAssign', 'readyToMove', 'assignedCards', 'failedCards'],
      tenantId: tenantId,
    };
    let response = await PMS_S3.postData(reqBody);
    console.log('bulk reassignment summary response', response);
    if (!response?.Error) {
      return response || {};
    }
    ErrorToaster(response?.Error?.data || 'Something went wrong! Please try again later', panelId, 'error');
    return {} as any;
  } catch (error) {
    ErrorToaster(error?.message || 'Something went wrong! Please try again later', panelId, 'error');
    return {} as any;
  }
};
export const tempData = {
  description: 'test 0',
  createdOn: '2023-04-03T07:50:35.479Z',
  createdBy: '394b1aa0-d73e-4b29-89c0-8c16006115aa',
  updatedOn: '2023-04-03T07:50:35.479Z',
  updatedBy: '394b1aa0-d73e-4b29-89c0-8c16006115aa',
  roleId: 'amura_guidance_counselor_level1',
  staffId: '394b1aa0-d73e-4b29-89c0-8c16006115aa',
  tenantId: 'amura',
  cardId: '9160115a-de6d-4f02-b3b8-480857fb7edb',
  cardType: 'moveCard',
  snippets: [
    {
      title: 'readyToAssign',
      description: '108 cards',
    },
    {
      title: 'readyToMove',
      description: '0 cards',
    },
    {
      title: 'assignedCards',
      description: '0 cards',
    },
    {
      title: 'failedCards',
      description: '0 cards',
    },
  ],
};
