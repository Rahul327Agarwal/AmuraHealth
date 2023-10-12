import axios from 'axios';
import { getHierarchyStaff } from '../../../../Common/Common.functions';
import ErrorToaster from '../../../../Common/ErrorToaster';
import SuccessToaster from '../../../../Common/SuccessToaster';
import { PMS_S3 } from '../../../../Utils';
import { NoneIcon, NonVegetarianIcon, VegetarianIcon } from '../../../SVGs/Common';
import { INameCard } from '../MyList/MyList.types';
import { IFilterState } from '../MyListHome.types';

export const versionOptions = [
  { label: 'V1', value: 'V1' },
  { label: 'V2', value: 'V2' },
  { label: 'V3', value: 'V3' },
  { label: 'V4', value: 'V4' },
  { label: 'V5', value: 'V5' },
];
export const typeOptions = [
  { label: 'None', value: 'none', icon: <NoneIcon /> },
  { label: 'Vegetarian', value: 'vegetarian', icon: <VegetarianIcon /> },
  {
    label: 'Non-Vegetarian',
    value: 'nonVegetarian',
    icon: <NonVegetarianIcon />,
  },
];

export const statusCard = {
  imageURL: '',
  name: 'Amura',
  username: '@Amura',
  userId: '@Amura',
  acronym: 'AMU',
  mainDescription: 'Lorem ipsum dolor sit amet,  adipiscing elit. ',
  rating: 'Tables: 1',
  status: 'v1',
  time: '09:30 PM',
  users: [],
};

export const getStatusForAllRoles = async (tenantId: string, role: string, props: any) => {
  let status: any = [];
  status = await PMS_S3.getObject(
    `pms-ql-status/${tenantId}/${role}/allStatus.json`,
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
  if (status.Error) {
    return [];
  }
  return status;
};

export const updateStatus = async (
  panelId: string,
  status: any,
  eachClientData: INameCard,
  sessions: any,
  additionDetails?: any
) => {
  let userId = eachClientData.additionalKeys?.patientId;
  let tenantId = eachClientData?.tenantId ? eachClientData?.tenantId : '';

  let request: any = {
    tenantId: tenantId,
    patientId: userId,
    roleId: eachClientData.roleId,
    statusType: 'edgeColor',
    current_status: status,
    previous_status: '',
    hierarchyId: eachClientData.additionalKeys.hierarchyId,
    UserName: sessions.user.id,
  };
  if (additionDetails?.comments) request = { ...request, ['Comments']: additionDetails.comments.trim() };
  if (additionDetails?.paymentReference)
    request = {
      ...request,
      ['PaymentReference']: additionDetails.paymentReference.trim(),
    };
  const response: any = await axios.post(import.meta.env.VITE_STATUS_CHANGE, request);
  if (response?.Error) {
    ErrorToaster('Something went wrong! Please try again.', panelId, 'error');
    return false;
  } else {
    SuccessToaster('Status updated successfully', panelId, 'success');
    return request;
  }
};

export const defaultLoststate = { comment: '' };
export const defaultWonstate = {
  comment: '',
  paymentId: '',
  paymentIdError: '',
};

export const checkFiltersApplied = (defaultFilters: IFilterState, selectedFilters: IFilterState) => {
  try {
    if (defaultFilters.owner.length !== selectedFilters.owner.length) {
      return true;
    }
    if (defaultFilters.status.length !== selectedFilters.status.length) {
      return true;
    }
    if (defaultFilters.role.length !== selectedFilters.role.length) {
      return true;
    }
    if (defaultFilters.sortBy !== selectedFilters.sortBy) {
      return true;
    }
    if (defaultFilters.groupBy !== selectedFilters.groupBy) {
      return true;
    }
    let startDate = new Date(defaultFilters.createdOnStart);
    let appliedStartDate = new Date(selectedFilters.createdOnStart);
    startDate.setHours(0, 0, 0, 0);
    appliedStartDate.setHours(0, 0, 0, 0);
    if (startDate.getTime() !== appliedStartDate.getTime()) {
      return true;
    }
    let endDate = new Date(defaultFilters.createdOnEnd);
    let appliedEndDate = new Date(selectedFilters.createdOnEnd);
    endDate.setHours(0, 0, 0, 0);
    appliedEndDate.setHours(0, 0, 0, 0);
    if (endDate.getTime() !== appliedEndDate.getTime()) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export const notifyStatusUpdate = async (
  selectedCard: INameCard,
  notifyEvent: Function,
  props: any,
  payload: any,
  fetchMultipleUserNames: Function
) => {
  let assignees = await getHierarchyStaff(selectedCard.additionalKeys.hierarchyId, fetchMultipleUserNames);
  assignees.forEach((assignee) => {
    let [_empty1, staffId, roleId, _empty2] = assignee.value.split('~');
    notifyEvent({
      input: {
        user_id: `${staffId}`,
        event_name: 'UPDATED_STATUS',
        timestamp: `${new Date().getTime()}`,
        last_message: JSON.stringify({ ...payload, patientId: selectedCard.additionalKeys.patientId }) ?? '',
      },
    });
  });
};
