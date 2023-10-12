import { id } from 'date-fns/locale';
import { getNameInitials } from '../../../../Common/Common.functions';
import ErrorToaster from '../../../../Common/ErrorToaster';
import { PMS_S3 } from '../../../../Utils';
import { AmuraIcon, DoctorIcon, StaffIcon } from '../../../SVGs/Common';
import { ISummaryData } from '../../BulkSummary/BulkSummary.types';
import { ICardtoAssign } from '../CardsFlowHomePage/CardsFlowHomePage.types';
import { ISelectedCard, IStaffpoolData, IcardData, TGroupBy } from './SelectStaffPoolViewAndAssign.types';
import SuccessToaster from '../../../../Common/SuccessToaster';

export const getRoleAvatarIcon = (role: string) => {
  switch (role) {
    case 'Doctor':
      return DoctorIcon;
    default:
      return StaffIcon;
  }
};
export const getCardDetails = (
  variant: TGroupBy,
  staffId: string,
  userName: string,
  isReverVariant?: boolean
): { displayName: string; profileIcon: any; profileURL: string } => {
  const object1 = {
    displayName: staffId,
    profileIcon: isReverVariant ? AmuraIcon : getRoleAvatarIcon(staffId),
    profileURL: '',
  };
  const object2 = {
    displayName: userName || staffId,
    profileURL: `${import.meta.env.VITE_DP_URL}${staffId}/profile-pic.png`,
    profileIcon: getNameInitials(userName || staffId),
  };

  switch (variant) {
    case 'SF':
      return isReverVariant ? object1 : object2;
    case 'RL':
      return isReverVariant ? object2 : object1;
    default:
      return object1;
  }
};

export const getStaffPoolData = async (panelId: string, sessions: any, summaryData: ISummaryData): Promise<IStaffpoolData> => {
  try {
    const { cardId, cardType, roleId, staffId, tenantId } = summaryData || {};
    const reqBody = {
      method: 'POST',
      token: sessions.id_token,
      url: import.meta.env.VITE_GET_STAFF_POLL,
      roles: [{ tenantId: tenantId, roleId: roleId, staffId: staffId }],
    };
    let response = await PMS_S3.postData(reqBody);
    if (!response?.Error) {
      console.log(response, 'response for getCardsToAssign');
      return response || ({} as any);
    }
    ErrorToaster(response?.Error?.data || 'Something went wrong! Please try again later', panelId, 'error');
    return {} as any;
  } catch (error) {
    console.error(error, 'error for getCardsToAssign');
    ErrorToaster(error?.message || 'Something went wrong! Please try again later', panelId, 'error');
    return {} as any;
  }
};

export const convertObject = (satffPoolData: IStaffpoolData): IcardData[] => {
  const staffArray = satffPoolData?.roles?.flatMap((role) => {
    const roleId = role.roleId;
    const staff = role?.staff && Object.keys(role.staff).map((staffId) => ({ currentStaffRoleId: roleId, patientId: staffId }));
    return staff || [];
  });
  return staffArray || [];
};

export const handleAutoAssign = async (
  sessions: any,
  cardsToAssign: ICardtoAssign[],
  selectedCards: ISelectedCard,
  summaryData: ISummaryData,
  panelId: string
) => {
  try {
    const { cardId, cardType, roleId, staffId, tenantId } = summaryData || {};
    let newCadrsToAssign = cardsToAssign.map((each) => {
      return {
        currentStaffHierarchyId: each.currentStaffHierarchyId,
        currentStaffId: each.currentStaffId,
        currentStaffRoleId: each.currentStaffRoleId,
        patientId: each.patientId,
      };
    });
    let userIdsdata = Object.values(selectedCards);
    let poolObj = userIdsdata[0]?.map((each) => {
      return {
        userId: each,
        userName: each,
      };
    });
    const reqBody = {
      method: 'POST',
      token: sessions.id_token,
      url: import.meta.env.VITE_GET_AUTO_ASSIGN,
      assignerId: cardsToAssign[0]?.assignerId,
      assignerHierarchyId: cardsToAssign[0]?.assignerHierarchyId,
      assignerRoleId: cardsToAssign[0]?.assignerRoleId,
      userId: sessions.user.id,
      pool: poolObj,
      cardId: cardId,
      tenantId: tenantId,
      roleId: roleId,
      isPermanent: true,
      cardType: cardType,
      cardsToAssign: newCadrsToAssign,
    };
    let response = await PMS_S3.postData(reqBody);
    if (!response?.Error) {
      SuccessToaster(response.message || 'Auto Assign Successful', panelId, 'success');
      return response;
    }
    ErrorToaster(response?.Error?.data || 'Something went wrong! Please try again later', panelId, 'error');
    return response;
  } catch (error) {
    console.error(error, 'error for GET_AutoAssign');
    ErrorToaster(error?.message || 'Something went wrong! Please try again later', panelId, 'error');
  }
};
