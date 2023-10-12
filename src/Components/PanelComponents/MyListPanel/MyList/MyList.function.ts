import axios from 'axios';
import { Dispatch } from 'react';
import { getAndSetUserNameFromES, getEsDataforUsersArray, IUserNameObj } from '../../../../Common/Common.functions';
import { ISession } from '../../../../Common/Common.types';
import ErrorToaster from '../../../../Common/ErrorToaster';
import { setAllRoles, setAllTenants } from '../../../../DisplayFramework/State/Slices/DashboardSlice';
import { setMyList } from '../../../../DisplayFramework/State/Slices/MyListSlice';
import { setProgress } from '../../../../DisplayFramework/State/Slices/ReporteesSlice';
import { PMS_S3 } from '../../../../Utils';
import { IReporteesTab, ISelectedReporteesObject } from '../../ReporteesListView/ReporteesListViewHome.types';
import { EditDataTypes, IAvailableClauses, ICriteriaOption } from '../ManageTab/ManageTab.types';
import { ICard, INameCard } from './MyList.types';

const users = [
  { label: 'Kyle Rachau', value: 'Manage statuses', avatarUrl: 'urlstring' },
  { label: 'Steve Rogers', value: 'Steve Rogers', avatarUrl: 'urlstring' },
  { label: 'Peter Parker', value: 'Peter Parker', avatarUrl: 'urlstring' },
  { label: 'Bruce Banner', value: 'Bruce Banner', avatarUrl: 'urlstring' },
  { label: 'Bruce Banner', value: 'Bruce Banner', avatarUrl: 'urlstring' },
];

export const nameCardData = [
  {
    imageURL: '',
    name: 'Amura1',
    username: '@Amura1',
    userId: '@Amura1',
    acronym: 'AMU',
    mainDescription: 'Lorem ipsum dolor sit amet,  adipiscing elit. ',
    rating: 'Tables: 1',
    status: 'v1',
    time: '09:30 PM',
    users: users,
    isEmergency: false,
    isNewMessage: true,
    isOthers: true,
  },
  {
    imageURL: '',
    name: 'Amura2',
    username: '@Amura2',
    userId: '@Amura2',
    acronym: 'AMU',
    mainDescription: 'Lorem ipsum dolor sit amet,  adipiscing elit. ',
    rating: 'Tables: 1',
    status: 'v1',
    time: '09:30 PM',
    users: users,
    isEmergency: true,
    isNewMessage: false,
    isOthers: true,
  },
  {
    imageURL: '',
    name: 'Amura3',
    username: '@Amura3',
    userId: '@Amura3',
    acronym: 'AMU',
    mainDescription: 'Lorem ipsum dolor sit amet,  adipiscing elit. ',
    rating: 'Tables: 1',
    status: 'v1',
    time: '09:30 PM',
    users: users,
    isEmergency: false,
  },
  {
    imageURL: '',
    name: 'Amura4',
    username: '@Amura4',
    userId: '@Amura4',
    acronym: 'AMU',
    mainDescription: 'Lorem ipsum dolor sit amet,  adipiscing elit. ',
    rating: 'Tables: 1',
    status: 'v1',
    time: '09:30 PM',
    users: users,
    isEmergency: false,
    isNewMessage: true,
    isOthers: true,
  },
  {
    imageURL: '',
    name: 'Amura5',
    username: '@Amura5',
    userId: '@Amura5',
    acronym: 'AMU',
    mainDescription: 'Lorem ipsum dolor sit amet,  adipiscing elit. ',
    rating: 'Tables: 1',
    status: 'v1',
    time: '09:30 PM',
    users: users,
    isEmergency: true,
  },
];

export const configurationCardData = [
  {
    imageURL: '',
    name: 'Biomarkers',
    username: '@Amura5',
    userId: '@Amura5',
    record: '1200 records',
    mainDescription: 'Biomarkers are blood markers. ',
    time: '14:30',
  },
  {
    imageURL: '',
    name: 'Biomarkers',
    username: '@Amura5',
    userId: '@Amura5',
    record: '1200 records',
    mainDescription: 'Biomarkers are blood markers. ',
    time: '14:30',
  },
  {
    imageURL: '',
    name: 'Biomarkers',
    username: '@Amura5',
    userId: '@Amura5',
    record: '1200 records',
    mainDescription: 'Biomarkers are blood markers. ',
    time: '14:30',
  },
];
export const getMyListReportees = async (
  dispatch: any,
  sessions: any,
  staffId: string,
  roleId: string,
  setClientData: Function
) => {
  const payload = {
    Locale: sessionStorage.getItem('locale'),
    //url: import.meta.env.VITE_S3_FETCH_MYLIST,
    url: import.meta.env.VITE_S3_FETCH_MYLIST_NEW,
    token: sessions.id_token,
    headers: {},
    staffId: staffId,
    roleId: roleId,
  };
  return PMS_S3.postData(payload)
    .then((response) => {
      if (response.Error) {
        console.error(response.Error);
        return response;
      }
      let { roles, cards: patientarray } = response;
      let data = patientarray;
      let tenants = [];
      // data = data.filter((eachClient: INameCard) => {
      // data.forEach((eachClient: INameCard) => {
      //   console.log('eachClient', eachClient.type);
      //   if (tenants.indexOf(eachClient.tenantId) === -1) {
      //     tenants.push(eachClient.tenantId);
      //   }
      // });
      // setClientData({ cards: data, roles: roles });

      //*******filtering eventcards in 3rd party mylist******//
      let filteredData = data.filter((eachClient: INameCard) => {
        if (tenants.indexOf(eachClient.tenantId) === -1) {
          tenants.push(eachClient.tenantId);
        }
        return eachClient?.type !== 'eventCard';
      });
      setClientData({ cards: filteredData, roles: roles });
      //*******filtering eventcards in 3rd party mylist******//

      dispatch(setAllTenants(tenants));
      dispatch(setAllRoles(roles.join(', ')));
      return data;
    })
    .catch((err) => {
      console.log('Error in fetching data', err);
      setClientData({ roles: [], cards: [] });
    });
};

type IJsonArray = { cards: INameCard[]; roles: string[] };
export const getReporteesFilterResults = async (
  panelId: string,
  dispatch: Dispatch<any>,
  sessions: any,
  reportees: ISelectedReporteesObject[],
  setClientData: Function
) => {
  try {
    const payload = JSON.parse(
      JSON.stringify(
        await PMS_S3.encryptData({
          userId: sessions?.user?.id,
          staffId: sessions?.user?.id,
          token: sessions.id_token,
          reportees,
        })
      )
    );
    const responseFetch = await fetch(`${import.meta.env.VITE_GET_REPORTEES_FILTER_RESULTS_STREAM_NEW}`, {
      headers: { Authorization: `Bearer ${sessions.id_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      method: 'POST',
    });
    const stream = responseFetch.body;
    const reader = stream.getReader();
    let done = false;
    let data = '';

    const _cards: INameCard[] = [];
    const _roles: Set<string> = new Set([]);
    const _tenants: Set<string> = new Set([]);

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      if (readerDone) {
        done = true;
        break;
      }
      data = data + new TextDecoder().decode(value);
      // Remove any whitespace between the JSON objects
      const cleanedData = data.replace(/}\s*{/g, '},{');
      // Add square brackets to the cleaned data to create a valid JSON array
      try {
        const jsonArray = JSON.parse(`[${cleanedData}]`);
        jsonArray.forEach((data) => {
          dispatch(setProgress(data.progress));
          const { cards: newCards, roles: newRoles }: IJsonArray = data;
          newRoles.forEach((role) => {
            _roles.add(role);
          });
          newCards.forEach((value) => {
            _cards.push(value);
            _tenants.add(value.tenantId);
            _roles.add(value.tenantId);
          });
        });
        data = '';
      } catch (error) {}
    }
    if (data !== '') {
      const cleanedData = data.replace(/}\s*{/g, '},{');
      const jsonArray = JSON.parse(`[${cleanedData}]`);
      jsonArray.forEach((data) => {
        dispatch(setProgress(data.progress));
        const { cards: newCards, roles: newRoles }: IJsonArray = data;
        newRoles.forEach((role) => {
          _roles.add(role);
        });
        newCards.forEach((value) => {
          _cards.push(value);
          _tenants.add(value.tenantId);
          _roles.add(value.tenantId);
        });
      });
      data = '';
    }
    setClientData({ cards: _cards, roles: [] });
    dispatch(setAllTenants(Array.from(_tenants)));
    dispatch(setAllRoles(Array.from(_roles).join(', ')));
  } catch (error) {
    ErrorToaster('Something went wrong! Please retry', panelId, 'error');
    setClientData({ roles: [], cards: [] });
  }
};

export const getMyListData = async (dispatch: any, sessions: any, setClientData: any) => {
  const patientId = sessions.user ? sessions.user.id : '';
  const payload = {
    Locale: sessionStorage.getItem('locale'),
    url: import.meta.env.VITE_S3_FETCH_MYLIST_NEW,
    token: sessions.id_token,
    headers: {},
    staffId: sessions.user.id,
  };
  return PMS_S3.postData(payload)
    .then((response) => {
      if (response.Error) {
        console.error(response.Error);
        return response;
      }
      let { roles, cards: patientarray } = response;
      let data = patientarray;

      let tenants = [];
      data.forEach((eachClient: INameCard) => {
        if (tenants.indexOf(eachClient.tenantId) === -1) {
          tenants.push(eachClient.tenantId);
        }
      });

      setClientData({ cards: data, roles: roles });

      dispatch(setAllTenants(tenants));
      dispatch(setAllRoles(roles.join(', ')));
      dispatch(setMyList(data));
      return data;
    })
    .catch((err) => {
      console.log('Error in fetching data', err);
      setClientData({ roles: [], cards: [] });
    });
};

export const belongToGCTeam = (userProfile: string): boolean => {
  return userProfile.toLowerCase().includes('guidance_counselor');
};

export const belongToTATeam = (userProfile: string): boolean => {
  return userProfile.toLowerCase().includes('talent_acquisition');
};
export const belongToDataEntry = (userProfile: string): boolean => {
  return userProfile.toLowerCase().includes('l1_dataentry');
};

export const getStatusOfClient = (data: INameCard) => {
  let status = data?.additionalKeys?.status?.find((status) => status.statusType === 'edgeColor');
  if (status) {
    return status.current_status;
  }
  return '';
};

// //operation validation function

// /**
//  *
//  * @param value
//  * @param comparision
//  * @param operation
//  * @param type
//  * @returns boolean
//  */

// if (type === "date") {
//   switch (operation) {
//     case "gte":
//         new Date(value).getTime() >= new Date(comparision).getTime()
//       break;

//     default:
//       break;
//   }
// }
// patientArray.filter(()=>{
// let clauses = [{}, {}, {}]
// let result = [operationValidation(), oprationValidation(),  operationValidation()]

// let finalResult = result[0];
// result.forEach((value)=>{
//   if(finalResult){
//     finalResult =  finalResult && value
//   }
//   finalResult = finalResult || value
// })
//   return
// })

export const operationValidation = (value, comparision, operation, type) => {
  if (type === 'INPUT') {
    switch (operation) {
      case 'contains':
        return value.toLowerCase().includes(comparision.toLowerCase());
      case 'doesnotContain':
        return !value.toLowerCase().includes(comparision.toLowerCase());
      case 'is':
        return value.toLowerCase() === comparision.toLowerCase();
      case 'isNot':
        return value.toLowerCase() !== comparision.toLowerCase();
    }
  }
  if (type === 'DATEANDTIME') {
    let valueDate = new Date(value);
    let comparisionDate = new Date(comparision);
    switch (operation) {
      case 'after':
        return comparisionDate.getTime() <= valueDate.getTime();
      case 'before':
        return comparisionDate.getTime() >= valueDate.getTime();
    }
  }
  if (type === 'SELECT') {
    switch (operation) {
      case 'is':
        if (Array.isArray(value)) {
          if (value.length == 0) {
            return false;
          }
          return value.every((data) => data?.current_status === comparision);
        }
        return value === comparision;
      case 'isNot':
        if (Array.isArray(value)) {
          if (value.length == 0) {
            return false;
          }
          return value.every((data) => data?.current_status !== comparision);
        }

        return !value ? false : value !== comparision;
    }
  }
  if (type === 'MULTISELECT') {
    switch (operation) {
      case 'isAnyOf':
        if (Array.isArray(value)) {
          if (value.length == 0) {
            return false;
          }
          // if (!value) return false;
          return (
            value?.every((data) => {
              return comparision?.some((d1) => d1?.value === data?.current_status);
            }) || false
          );
        }
        return comparision.some((temp) => JSON.stringify(value)?.indexOf(`"${temp.value}"`) > -1);
      case 'isNoneOf':
        if (Array.isArray(value)) {
          if (value.length == 0) {
            return false;
          }
          return (
            value?.every((data) => {
              return comparision?.every((d1) => d1?.value !== data?.current_status);
            }) || false
          );
        }
        return comparision.every((temp) => JSON.stringify(value)?.indexOf(`"${temp.value}"`) === -1);
    }
  }
  return false;
  // if(type==='TIME'){
  //   switch(operation){
  //     case "after" :
  //       return cardType!==comparision;
  //   }
};

const getCriteriaCompareValue = (criteria: IAvailableClauses, card: ICard): any => {
  if (criteria === 'userCreatedOn') return card?.createdOn;
  if (criteria === 'nickName') return card?.title;
  if (criteria === 'status') return (card as INameCard)?.additionalKeys?.status;
  if (criteria === 'hasBlueDots')
    return (
      !!card?.additionalKeys?.bluedots?.blackDotsCount ||
      !!card?.additionalKeys?.bluedots?.indirectBlackDotsCount ||
      !!card?.additionalKeys?.bluedots?.blueDotsCount ||
      !!card?.additionalKeys?.bluedots?.indirectBlueDotsCount
    );
  if (criteria === 'type') return card?.type;
  return '';
};

const sortByDates = (aDateString, bDateString, ascOrder): any => {
  if (aDateString && !bDateString) {
    return -1;
  }
  if (bDateString && !aDateString) {
    return 1;
  }
  if (aDateString && bDateString) {
    try {
      let aDate = new Date(aDateString);
      let bDate = new Date(bDateString);

      if (aDate.toString() === 'Invalid Date') throw new Error('Wrong date');
      if (bDate.toString() === 'Invalid Date') throw new Error('Wrong date');

      return ascOrder ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
    } catch (error) {
      console.error(error);
      return -1;
    }
  }
};

export const getFilteredMyList = async (
  clientData: Array<ICard>,
  colorFilter,
  tabSettings,
  groupSetting,
  searchString: string,
  userNameObj?: IUserNameObj,
  setUserNameObj?: React.Dispatch<React.SetStateAction<IUserNameObj>>,
  reportessListType?: string
) => {
  let myLists = [...clientData];
  myLists = [
    ...myLists.sort((a, b) => {
      let aLatestMessageTimeStamp = null;
      let bLatestMessageTimeStamp = null;

      if ('latestMessageTimeStamp' in a?.additionalKeys) {
        aLatestMessageTimeStamp = a?.additionalKeys?.latestMessageTimeStamp;
      }

      if ('latestMessageTimeStamp' in b?.additionalKeys) {
        bLatestMessageTimeStamp = b?.additionalKeys?.latestMessageTimeStamp;
      }

      let aLastExpiredBluedot = a?.additionalKeys?.bluedots?.lastExpiredBluedot || null;
      let bLastExpiredBluedot = b?.additionalKeys?.bluedots?.lastExpiredBluedot || null;

      if (aLastExpiredBluedot && !bLastExpiredBluedot) {
        return -1;
      }
      if (bLastExpiredBluedot && !aLastExpiredBluedot) {
        return 1;
      }
      if (aLastExpiredBluedot && bLastExpiredBluedot) {
        try {
          let aLastExpiredBluedotDate = new Date(aLastExpiredBluedot);
          let bLastExpiredBluedotDate = new Date(bLastExpiredBluedot);

          if (aLastExpiredBluedotDate.toString() === 'Invalid Date') throw new Error('Wrong date');
          if (bLastExpiredBluedotDate.toString() === 'Invalid Date') throw new Error('Wrong date');

          if (aLastExpiredBluedotDate.getTime() - bLastExpiredBluedotDate.getTime() === 0) {
            return sortByDates(aLatestMessageTimeStamp, bLatestMessageTimeStamp, false);
          }

          return aLastExpiredBluedotDate.getTime() - bLastExpiredBluedotDate.getTime();
        } catch (error) {
          console.error(error);
          return -1;
        }
      }

      let aBlueToExpireNext = a?.additionalKeys?.bluedots?.blueToExpireNext || null;
      let bBlueToExpireNext = b?.additionalKeys?.bluedots?.blueToExpireNext || null;

      if (aBlueToExpireNext && !bBlueToExpireNext) {
        return -1;
      }
      if (bBlueToExpireNext && !aBlueToExpireNext) {
        return 1;
      }
      if (aBlueToExpireNext && bBlueToExpireNext) {
        try {
          let aBlueToExpireNextDate = new Date(aBlueToExpireNext);
          let bBlueToExpireNextDate = new Date(bBlueToExpireNext);

          if (aBlueToExpireNextDate.toString() === 'Invalid Date') throw new Error('Wrong date');
          if (bBlueToExpireNextDate.toString() === 'Invalid Date') throw new Error('Wrong date');

          if (aBlueToExpireNextDate.getTime() - bBlueToExpireNextDate.getTime() === 0) {
            return sortByDates(aLatestMessageTimeStamp, bLatestMessageTimeStamp, false);
          }

          return aBlueToExpireNextDate.getTime() - bBlueToExpireNextDate.getTime();
        } catch (error) {
          console.error(error);
          return -1;
        }
      }

      let aBlueDotCount = a?.additionalKeys?.bluedots?.blueDotsCount || 0;
      let bBlueDotCount = b?.additionalKeys?.bluedots?.blueDotsCount || 0;

      if (aBlueDotCount && !bBlueDotCount) {
        return -1;
      }
      if (!aBlueDotCount && bBlueDotCount) {
        return 1;
      }

      if (aBlueDotCount - bBlueDotCount === 0) {
        return sortByDates(aLatestMessageTimeStamp, bLatestMessageTimeStamp, false);
      }

      return aBlueDotCount - bBlueDotCount;
    }),
  ];
  let groupedData = {};
  try {
    if (colorFilter['isBluedot'] && !Object.values(colorFilter).every(Boolean)) {
      myLists = myLists.filter((item: INameCard) => {
        return (
          item?.additionalKeys?.bluedots?.blackDotsCount ||
          item?.additionalKeys?.bluedots?.indirectBlackDotsCount ||
          item?.additionalKeys?.bluedots?.blueDotsCount ||
          item?.additionalKeys?.bluedots?.indirectBlueDotsCount ||
          0
        );
      });
    }
    // if (colorFilter['isExpired'] && !Object.values(colorFilter).every(Boolean)) {
    //   myLists = myLists.filter((item: INameCard) => {
    //     return item.additionalKeys?.bluedots?.blackDotsCount || 0;
    //   });
    // }
    if (colorFilter['isNewMessages'] && !Object.values(colorFilter).every(Boolean)) {
      if (
        Boolean(reportessListType) &&
        !colorFilter['isEmergency'] &&
        !colorFilter['isBluedot'] &&
        colorFilter['isNewMessages']
      ) {
        myLists = [];
      } else {
        myLists = myLists.filter((item: INameCard) => {
          return item.additionalKeys?.greenDotCount || 0;
        });
      }
    }
    if (colorFilter['isEmergency'] && !Object.values(colorFilter).every(Boolean)) {
      myLists = [];
    }
    let criteria: EditDataTypes[] = tabSettings.criteria;

    if (tabSettings.tabId !== 'All' && criteria?.length) {
      const filteredData = myLists.filter((card: ICard) => {
        let FinalResult = false;
        criteria.forEach(({ criteria, matchCriteria, type, value, clause }) => {
          let comparisionValue = getCriteriaCompareValue(criteria, card);
          if (comparisionValue === '') {
            return;
          }
          let isCrtiterialFullfilled = operationValidation(comparisionValue, value, matchCriteria, type);
          if (clause === 'and') {
            FinalResult = FinalResult && isCrtiterialFullfilled;
          }
          if (clause === 'or') {
            FinalResult = FinalResult || isCrtiterialFullfilled;
          }
          if (clause === '') {
            FinalResult = isCrtiterialFullfilled;
          }
        });
        return FinalResult;
      });
      myLists = filteredData;
    }
    if (searchString.length > 2) {
      const searchValue = searchString.toLowerCase();
      myLists = myLists.filter(({ title }) => title?.toLowerCase()?.includes(searchValue));
    }
    if (groupSetting && groupSetting.groupedBy) {
      if (groupSetting.groupedBy === 'staffId-roleId') {
        const staffs = new Set([]);
        myLists.forEach((card: INameCard) => {
          const currKey = `${card.staffId}~${card.roleId}`;
          if (!userNameObj[card.staffId]) {
            staffs.add(card.staffId);
          }
          if (groupedData[currKey]) {
            groupedData[currKey].push(card);
            return;
          }
          groupedData[currKey] = [card];
          return;
        });
        let updatedByNamesRes = {};
        const users = Array.from(staffs).map((_id) => ({ match: { _id: _id } }));
        if (users.length) {
          updatedByNamesRes = await getEsDataforUsersArray(users, true);
        }

        let groupedDataNew = {};
        const allusers = { ...userNameObj, ...updatedByNamesRes };
        setUserNameObj(allusers);
        for (const key in groupedData) {
          if (!Object.prototype.hasOwnProperty.call(groupedData, key)) continue;
          const element = groupedData[key];
          const [staffId, roleId] = key.split('~');
          const staffName = allusers[staffId] ?? staffId;
          groupedDataNew[`${staffName}~${roleId}`] = element;
        }
        groupedData = JSON.parse(JSON.stringify(groupedDataNew));
      } else {
        myLists.forEach((card: INameCard) => {
          if (groupedData[card[groupSetting.groupedBy] || 'Not grouped']) {
            groupedData[card[groupSetting.groupedBy] || 'Not grouped'].push(card);
            return;
          }
          groupedData[card[groupSetting.groupedBy] || 'Not grouped'] = [card];
          return;
        });
      }
    }
  } catch (error) {
    console.log('!!error', error);
  }

  return { filteredList: myLists, groupedData };
};

export const modifyGroupedDataKey = async (
  groupedData: Object,
  userNameObj?: IUserNameObj,
  setUserNameObj?: React.Dispatch<React.SetStateAction<IUserNameObj>>
): Promise<Object> => {
  let groupedDataNew = {};
  for (const key in groupedData) {
    if (!Object.prototype.hasOwnProperty.call(groupedData, key)) continue;
    const element = groupedData[key];
    const [staffId, roleId] = key.split('~');
    const staffName = await getAndSetUserNameFromES(staffId, userNameObj, setUserNameObj, true);
    groupedDataNew[`${staffName}~${roleId}`] = element;
  }
  return groupedDataNew;
};

export const sortStatus = (a: string, b: string): number => {
  if (!a) return 1;
  if (!b) return -1;
  if (a === b) return 0;
  if (a === 'New') return -1;
  if (b === 'New') return 1;
  if (a === 'Follow up') return -1;
  if (b === 'Follow up') return 1;
  if (a === 'Awaiting payment') return -1;
  if (b === 'Awaiting payment') return 1;
  if (a === 'Unreachable') return -1;
  if (b === 'Unreachable') return 1;
  if (a === 'Lost') return -1;
  if (b === 'Lost') return 1;
  if (a === 'Won') return -1;
  if (b === 'Won') return 1;
  return 0;
};

export const sortByFilter = (a: INameCard, b: INameCard, sortBy: string, loggedInUserId: string) => {
  switch (sortBy) {
    // case 'bluedot':
    //   const aBlueDot = new Date(
    //     ((Array.isArray(a?.bluedots) && a?.bluedots) || []).find(
    //       (value) => value.user === `${loggedInUserId}~${a.tenantId}~${a.roleId}`
    //     )?.latestBluedot || 0
    //   ).getTime();
    //   const bBlueDot = new Date(
    //     ((Array.isArray(b?.bluedots) && b?.bluedots) || []).find(
    //       (value) => value.user === `${loggedInUserId}~${a.tenantId}~${a.roleId}`
    //     )?.latestBluedot || 0
    //   ).getTime();
    //   return bBlueDot - aBlueDot;
    case 'Newest':
      const aNewest = a?.createdOn ? new Date(a.createdOn).getTime() : 0;
      const bNewest = b?.createdOn ? new Date(b.createdOn).getTime() : 0;
      return bNewest - aNewest;
    case 'Oldest':
      const aOldest = a?.createdOn ? new Date(a.createdOn).getTime() : 0;
      const bOldest = b?.createdOn ? new Date(b.createdOn).getTime() : 0;
      return aOldest - bOldest;
    case 'Name':
      let userOne: string = a?.title || '';
      let userTwo: string = b?.title || '';
      if (!userOne) return 1;
      if (!userTwo) return -1;
      return userOne.localeCompare(userTwo);
    // case 'Status':
    //   return sortStatus(
    //     a?.status?.find((x) => x?.statusType === 'edgeColor')?.current_status,
    //     b?.status?.find((x) => x?.statusType === 'edgeColor')?.current_status
    //   );
  }
};

export const getIndices = (sortedObject: any, accordionState: any) => {
  let statusHeadingIndexes: Array<number> = [];
  let index = 0;
  statusHeadingIndexes.push(index);
  Object.keys(sortedObject).forEach((key, arrayIndex) => {
    if (arrayIndex > 0) {
      if (
        accordionState[Object.keys(sortedObject)[arrayIndex - 1]] &&
        sortedObject[Object.keys(sortedObject)[arrayIndex - 1]].length
      ) {
        index = index + sortedObject[Object.keys(sortedObject)[arrayIndex - 1]].length + 1;
        statusHeadingIndexes.push(index);
      }
      if (!accordionState[Object.keys(sortedObject)[arrayIndex - 1]]) {
        index = index + 1;
        statusHeadingIndexes.push(index);
      }
    }
  });
  return statusHeadingIndexes;
};

export const DEFAULT_TAB = { tabId: 'All', tabName: 'All' };

export const TAB_THREEDOT_OPTIONS = [
  { label: 'Manage Tabs', value: 'EDIT_TAB' },
  { label: 'Manage Groups', value: 'EDIT_GROUP' },
];

export const exportMyListAsCSV = (key: string, sessions: any) => {
  let reqBody = {
    isDownloadRequired: true,
    url: `${import.meta.env.VITE_S3_DOWNLOAD_API}?key=${key}`,
    token: sessions.id_token,
  };
  PMS_S3.previewObject(reqBody);
};

export const getAllStaffRoles = async (panelId: string, props: any) => {
  const payload = {
    payLoad: {
      partKey: 'part_key',
      partKeyValue: `~roles~master~${props.selectedClient.tenant_id || 'amura'}~`,
      tableName: 'staff-info',
    },
  };
  const url = `${import.meta.env.VITE_BASE_API_URL}/queryFromDB`;
  try {
    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${props.sessions.id_token}` },
    });
    return response?.data || [];
  } catch (error) {
    console.error('!!error', error);
    ErrorToaster(error.message, panelId, 'error');
    return [];
  }
};

export const getTabsAPI = async (sessions: any, userId): Promise<IReporteesTab[]> => {
  try {
    const reqBody = {
      method: 'POST',
      token: sessions.id_token,
      url: import.meta.env.VITE_GET_REPORTEES_TAB,
      userId: userId, //sessions?.user?.id,
      tabType: 'MY_TAB',
    };
    let response = await PMS_S3.postData(reqBody);
    if (!response?.Error) {
      return response || [];
    }
    return [];
  } catch (error) {
    return [];
  }
};

export const getGroupsAPI = async (sessions: ISession, userId: string): Promise<any> => {
  try {
    let response = await PMS_S3.getObject(
      `pms-ql-mylist/${userId}/myGroups.json`,
      import.meta.env.VITE_CLIENT_BUCKET,
      {
        TenantId: 'amura',
        Locale: sessionStorage.getItem('locale'),
        url: import.meta.env.VITE_S3_FETCH_API,
        token: sessions.id_token,
        headers: {},
      },
      []
    );
    if (!response?.Error) {
      return response || [];
    }
    return [];
  } catch (error) {
    return [];
  }
};

export const getMyListObject = async (patientId: string, roleId: string, tenantId: string, sessionData: any, staffId: string) => {
  const payload = {
    Locale: sessionStorage.getItem('locale'),
    url: import.meta.env.VITE_S3_FETCH_MYLIST_OBJECT_NEW,
    token: sessionData.id_token,
    headers: {},
    staffId: staffId || sessionData.user.id,
    patientId: patientId,
    tenantId: tenantId,
    roleId: roleId,
  };
  let clientData: any = await PMS_S3.postData(payload);
  if (clientData.Error) {
    clientData = {
      roles: [],
      cards: [],
    };
  }
  return clientData;
};
export const getMyListMoveCards = async (cardId: string, roleId: string, tenantId: string, sessionData: any, staffId: string) => {
  const payload = {
    Locale: sessionStorage.getItem('locale'),
    url: import.meta.env.VITE_S3_FETCH_MYLIST_OBJECT_NEW,
    token: sessionData.id_token,
    headers: {},
    staffId: staffId || sessionData.user.id,
    cardId: cardId,
    tenantId: tenantId,
    roleId: roleId,
  };
  let clientData: any = await PMS_S3.postData(payload);
  if (clientData.Error) {
    clientData = {
      roles: [],
      cards: [],
    };
  }
  return clientData;
};
export const getMyListEvent = async (eventId: string, roleId: string, tenantId: string, sessionData: any, staffId: string) => {
  const payload = {
    Locale: sessionStorage.getItem('locale'),
    url: import.meta.env.VITE_S3_FETCH_MYLIST_EVENT,
    token: sessionData.id_token,
    headers: {},
    staffId: staffId || sessionData.user.id,
    eventId: eventId,
    tenantId: tenantId,
    roleId: roleId,
  };
  let clientData: any = await PMS_S3.postData(payload);
  if (clientData.Error) {
    clientData = {
      roles: [],
      cards: [],
    };
  }
  return clientData;
};
