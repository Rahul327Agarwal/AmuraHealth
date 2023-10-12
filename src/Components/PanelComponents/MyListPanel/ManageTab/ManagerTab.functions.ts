import { v4 } from 'uuid';
import ErrorToaster from '../../../../Common/ErrorToaster';
import { PMS_S3 } from '../../../../Utils';
import { DEFAULT_TABDATA, EditDataTypes, ICriteriaClause } from './ManageTab.types';
import SuccessToaster from '../../../../Common/SuccessToaster';

export const AddAnother = (originalTab, setCardData) => {
  let criteria = JSON.parse(JSON.stringify(originalTab));
  if (criteria.length === 1) {
    criteria.push({ ...DEFAULT_TABDATA, clause: 'and', id: v4() });
    setCardData([...criteria]);
  } else {
    criteria.push({ ...DEFAULT_TABDATA, clause: 'or', id: v4() });
    setCardData([...criteria]);
  }
};
export const GROUPBY_OPTIONS = [
  { label: 'Card Name', value: 'Card Name' },
  { label: 'Card Type', value: 'Card Type' },
  { label: 'Blue Dot - Time created', value: 'Blue Dot - Time created' },
  { label: 'Blue Dot - Time of expiry', value: 'Blue Dot - Time of expiry' },
  { label: 'Black Dot', value: 'Black Dot' },
  { label: 'Red Dot', value: 'Red Dot' },
  { label: 'Tenant', value: 'Tenant' },
  { label: 'Role', value: 'Role' },
];
const getDefaultValues = (type: string) => {
  if (type === 'DATEANDTIME') {
    let defaultDate = new Date();
    defaultDate.setHours(0, 0, 0, 0);
    return defaultDate.toISOString();
  } else if (type === 'MULTISELECT') {
    return [];
  }
  return '';
};
export const helperFunction = (arrayIndex, fieldName, value, cardData, setCardData) => {
  let tempData = JSON.parse(JSON.stringify(cardData));
  if (fieldName === 'criteria') {
    let matchedObject = JSON.parse(JSON.stringify(TabCriteria.criteriaClauses)).find((obj) => obj.value === value);
    let option = matchedObject?.options;
    tempData[arrayIndex].option = option;
    tempData[arrayIndex].matchCriteriaOptions = matchedObject?.clause;
    tempData[arrayIndex].value = '';
    tempData[arrayIndex].type = '';
    tempData[arrayIndex].matchCriteria = '';
  }
  if (fieldName === 'matchCriteria') {
    let type = cardData[arrayIndex]?.matchCriteriaOptions.find((obj) => obj.value === value)?.type;
    tempData[arrayIndex].type = type;
    tempData[arrayIndex].value = getDefaultValues(type);
  }
  tempData[arrayIndex][fieldName] = value;
  setCardData(JSON.parse(JSON.stringify(tempData)));
};

export const addTabsAPICall = async (
  panelId: string,
  tabName,
  sortingOrder,
  cardData,
  action,
  tabId,
  userID,
  sessions,
  setAction
) => {
  const payload = {
    Locale: sessionStorage.getItem('locale'),
    url: import.meta.env.VITE_EVENT_API,
    token: sessions.id_token,
    EventName: 'mytab',
    Action: action,
    userId: sessions?.user?.id,
    tabName: tabName.trim(),
    sortingOrder: sortingOrder,
    criteria: cardData,
    tabId: tabId === '' ? v4() : tabId,
    created_on: new Date().toDateString(),
    created_by: userID,
  };
  try {
    const response = await PMS_S3.postData(payload);
    if (response?.Error) return ErrorToaster(response?.Error.data, panelId, 'error');
    setAction({ screen: 'TAB_PANEL', payload: {} });
    ErrorToaster(
      `Tab ${action === 'ADD' ? 'added' : action === 'UPDATE' ? 'updated' : 'deleted'} successfully!`,
      panelId,
      'error'
    );
  } catch (error) {
    console.log('err', error);
  }
};

export const enableCreateTab = (tabName: string, criteria: Array<EditDataTypes>) => {
  if (!tabName.trim()) {
    return false;
  }
  if (criteria.length === 0) {
    return false;
  }
  if (
    criteria.some((eachCriteria) => {
      if (typeof eachCriteria.value !== 'boolean' && (!eachCriteria.value || !!!eachCriteria.value.length)) return true;
      if (!eachCriteria.criteria) return true;
      if (!eachCriteria.matchCriteria) return true;
    })
  ) {
    return false;
  }
  return true;
};
export const enableCreateFilter = (tabName: string, criteria: Array<EditDataTypes>) => {
  if (!tabName.trim()) {
    return false;
  }
  if (
    criteria.length &&
    criteria.some((eachCriteria) => {
      if (typeof eachCriteria.value !== 'boolean' && (!eachCriteria.value || !!!eachCriteria.value.length)) return true;
      if (!eachCriteria.criteria) return true;
      if (!eachCriteria.matchCriteria) return true;
    })
  ) {
    return false;
  }
  return true;
};

export const reorderNew = (list, sortingOrder): Array<any> => {
  const result = Array.from(list);

  let clickedTabIndex = 0;
  let modifySortingOrder = result.map((tab: any, index) => {
    if (tab.sortingOrder === sortingOrder) {
      clickedTabIndex = index;
      return { ...tab, sortingOrder: 0 };
    }
    if (tab.sortingOrder === 0) {
      return { ...tab, sortingOrder: sortingOrder };
    } else {
      return tab;
    }
  });
  let [removed] = modifySortingOrder.splice(clickedTabIndex, 1);
  modifySortingOrder.splice(0, 0, removed);

  return modifySortingOrder;
};

export const CLOUSE_OPTIONS = [
  { label: 'And', value: 'and' },
  { label: 'Or', value: 'or' },
];

export class TabCriteria {
  static criteriaClauses: Array<ICriteriaClause> = [
    {
      value: 'type',
      label: 'Card Type',
      options: [
        { label: 'Name Card', value: 'nameCard' },
        { label: 'Event Card', value: 'eventCard' },
      ],
      clause: [{ label: 'is', value: 'is', type: 'SELECT' }],
    },
    {
      value: 'nickName',
      label: 'Card Name',
      options: [],
      clause: [
        { label: 'Contains', value: 'contains', type: 'INPUT' },
        { label: 'Does not contain', value: 'doesnotContain', type: 'INPUT' },
        { label: 'is', value: 'is', type: 'INPUT' },
        { label: 'is not', value: 'isNot', type: 'INPUT' },
      ],
    },
    {
      value: 'userCreatedOn',
      label: 'Created On',
      options: [],
      clause: [
        { label: 'After', value: 'after', type: 'DATEANDTIME' },
        { label: 'Before', value: 'before', type: 'DATEANDTIME' },
      ],
    },
    {
      value: 'hasBlueDots',
      label: 'Bluedot',
      options: [
        { label: 'Present', value: true },
        { label: 'Not present', value: false },
      ],
      clause: [{ label: 'is', value: 'is', type: 'SELECT' }],
    },
  ];
}
