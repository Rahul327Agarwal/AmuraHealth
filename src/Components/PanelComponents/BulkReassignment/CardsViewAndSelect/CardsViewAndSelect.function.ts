import { getNameInitials } from '../../../../Common/Common.functions';
import ErrorToaster from '../../../../Common/ErrorToaster';
import { PMS_S3 } from '../../../../Utils';
import { AmuraIcon, DoctorIcon, StaffIcon } from '../../../SVGs/Common';
import { ISummaryData } from '../../BulkSummary/BulkSummary.types';
import { ShiftRingProps } from '../../MyTeam/Components/ShiftRing/ShiftRing.types';
import { ICardtoAssign } from '../CardsFlowHomePage/CardsFlowHomePage.types';
import { ISelectedCard, IStaff, TGroupBy } from './CardsViewAndSelect.types';

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

export const getCardsToAssign = async (
  panelId: string,
  sessions: any,
  summaryData: ISummaryData,
  clickedSnippetIds: Array<string>
): Promise<IStaff[]> => {
  try {
    const { cardId, cardType, roleId, staffId, tenantId } = summaryData || {};
    const reqBody = {
      method: 'POST',
      token: sessions.id_token,
      url: import.meta.env.VITE_GET_CARDS_TO_ASSIGN,
      cardType: cardType,
      cardId: cardId,
      snippetIds: clickedSnippetIds,
      tenantId: tenantId,
      staffId: staffId,
      roleId: roleId,
    };
    let response = await PMS_S3.postData(reqBody);
    if (!response?.Error) {
      return response || [];
    }
    ErrorToaster(response?.Error?.data || 'Something went wrong! Please try again later', panelId, 'error');
    return [] as any;
  } catch (error) {
    console.error(error, 'error for gerCardsToAssign');
    ErrorToaster(error?.message || 'Something went wrong! Please try again later', panelId, 'error');
    return [] as any;
  }
};

export const makecardstoAssignObj = (cardsData: IStaff[], selelectedCardData: ISelectedCard): ICardtoAssign[] => {
  const output = Object.values(selelectedCardData).reduce((acc, curr) => {
    const newObject = [];
    curr.forEach((each) => {
      const obj = cardsData.find((item) => item.patientId === each);
      if (obj) {
        let newObj = {
          patientId: obj?.patientId,
          currentStaffHierarchyId: obj?.currentStaffHierarchyId,
          currentStaffId: obj?.currentStaffId,
          currentStaffRoleId: obj?.currentStaffRoleId,
          assignerHierarchyId: obj?.assignerHierarchyId || '',
          assignerRoleId: obj?.assignerRoleId || '',
          assignerId: obj?.assignerId || '',
          tenantId: obj?.tenantId || '',
          cardId: obj?.cardId || '',
        };
        newObject.push(newObj);
      }
    });
    return [...acc, ...newObject];
  }, []);
  return output;
};
