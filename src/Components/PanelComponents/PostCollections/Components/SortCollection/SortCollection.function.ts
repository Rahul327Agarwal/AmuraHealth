import { Dispatch, SetStateAction } from 'react';
import { v4 } from 'uuid';
import { IAvailableCriteria, ICriteria, TCriteriaClause, TSort } from './SortCollection.types';
import { ICollectionsList, IEsPosts, TOptionObj } from '../AddCollection/AddCollection.types';

export const DEFAULT_FILTERS: ICriteria = {
  clause: '',
  criteria: '',
  option: [],
  type: '',
  matchCriteria: '',
  matchCriteriaOptions: [],
  value: '',
  id: v4(),
};

export const CRITERIA_OPTIONS: { label: string; value: IAvailableCriteria }[] = [
  { value: 'name', label: 'Name' },
  { value: 'createdTime', label: 'Created Time' },
  { value: 'significance', label: 'Significance' },
];

export const sortAlphabetically = [
  { label: 'A → Z', value: 'A-Z' },
  { label: 'Z → A', value: 'Z-A' },
];

export const sortHighLow = [
  { label: 'High → Low', value: 'high-low' },
  { label: 'Low → High', value: 'low-high' },
];

export const sortNewOld = [
  { label: 'New → Old', value: 'new-old' },
  { label: 'Old → New', value: 'old-new' },
];

export const SORT_CRITERIA: TCriteriaClause = {
  name: {
    placeholder: 'Options',
    option: sortAlphabetically,
  },
  createdTime: {
    placeholder: 'Options',
    option: sortNewOld,
  },
  significance: {
    placeholder: 'Options',
    option: sortHighLow,
  },
};

export const helperFunction = (
  index: number,
  fieldName: string,
  value: string,
  cardData: ICriteria[],
  setCriteriaData: Dispatch<SetStateAction<ICriteria[]>>
) => {
  const tempData: ICriteria[] = JSON.parse(JSON.stringify(cardData));
  if (fieldName === 'criteria') {
    tempData.forEach((c, i) => {
      if (i === index) return;
      const option = tempData[i]?.option?.filter((v) => v.value !== value);
      tempData[i].option = option;
    });
    const matchedObject = SORT_CRITERIA[value] || {};
    tempData[index].matchCriteriaOptions = matchedObject?.option || [];
    tempData[index].value = '';
    tempData[index].type = '';
    tempData[index].matchCriteria = '';
    tempData[index].placeholder = matchedObject?.placeholder;
  }
  if (fieldName === 'matchCriteria') {
    let type = cardData[index]?.matchCriteriaOptions.find((obj) => obj.value === value)?.type;
    tempData[index].type = type;
    tempData[index].value = '';
  }
  tempData[index][fieldName] = value;
  setCriteriaData(JSON.parse(JSON.stringify(tempData)));
};

export const AddAnother = (setCriteriaData: Dispatch<SetStateAction<ICriteria[]>>) => {
  setCriteriaData((pre) => {
    const option = CRITERIA_OPTIONS.filter((v) => !pre?.some((c) => c.criteria === v.value));

    return [...pre, { ...DEFAULT_FILTERS, option, clause: 'or', id: v4() }];
  });
};

export const enableFooter = (criteria: Array<ICriteria>) => {
  if (!criteria.length) return false;
  const c1 = criteria.some((c) => {
    if (c.type && typeof c.value !== 'boolean' && (!c.value || !!!c.value.length)) return true;
    if (!c.criteria) return true;
    if (!c.matchCriteria) return true;
  });
  return !c1;
};

export const sortByFilter = (a: any, b: any, sortBy: TSort) => {
  switch (sortBy) {
    case 'high-low': {
      const aHighest = a ?? 0;
      const bHighest = b ?? 0;
      return bHighest - aHighest;
    }
    case 'low-high': {
      const aLowest = a ?? 0;
      const bLowest = b ?? 0;
      return aLowest - bLowest;
    }
    case 'new-old': {
      const aNewest = a ? new Date(a).getTime() : 0;
      const bNewest = b ? new Date(b).getTime() : 0;
      return bNewest - aNewest;
    }
    case 'old-new': {
      const aOldest = a ? new Date(a).getTime() : 0;
      const bOldest = b ? new Date(b).getTime() : 0;
      return aOldest - bOldest;
    }
    case 'A-Z': {
      if (!a) return 1;
      if (!b) return -1;
      return a.localeCompare(b);
    }
    case 'Z-A': {
      if (!a) return -1;
      if (!b) return 1;
      return b.localeCompare(a);
    }
    default:
      if (a?.toString()?.includes(sortBy)) return -1;
      if (b?.toString()?.includes(sortBy)) return 1;
      return 0;
  }
};

export const getPostListKey = (post: IEsPosts, key: IAvailableCriteria) => {
  switch (key) {
    case 'name':
      return post?.topics?.heading?.snippet;
    case 'createdTime':
      return post?.createdOn;
    case 'significance':
      return Number(post?.significance ?? 0);
    // case 'gender':
    //   return post?.gender;
    // case 'sexualMaturity':
    //   return post?.sexualMaturity?.toString();
    // case 'system':
    //   return post?.system;
    // case 'conditionsApplicable':
    //   return post?.conditionsApplicable?.toString();
    // case 'answerSet':
    //   return post?.topics?.response?.type;
    default:
      return key;
  }
};
export const getCollectionListKey = (collection: ICollectionsList, key: IAvailableCriteria) => {
  switch (key) {
    case 'name':
      return collection?.collectionName;
    case 'createdTime':
      return collection?.createdOn;
    case 'significance':
      return Number(0);
    default:
      return key;
  }
};

export const sortPostsandCollectionsList = (list: IEsPosts[] | ICollectionsList[], sortCriteria: ICriteria[], type = 'posts') => {
  if (!sortCriteria?.length) return list;
  const copyList = JSON.parse(JSON.stringify(list));
  return copyList.sort((a, b) => {
    for (const criterion of sortCriteria) {
      const { criteria, matchCriteria }: any = criterion;
      let aKey: any;
      let bKey: any;
      if (type === 'posts') {
        aKey = getPostListKey(a, criteria);
        bKey = getPostListKey(b, criteria);
      }
      if (type === 'collections') {
        aKey = getCollectionListKey(a, criteria);
        bKey = getCollectionListKey(b, criteria);
      }
      return sortByFilter(aKey, bKey, matchCriteria);
    }
    return 0;
  });
};
