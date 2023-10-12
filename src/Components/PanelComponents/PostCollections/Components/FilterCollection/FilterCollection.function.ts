import { Dispatch, SetStateAction } from 'react';
import { v4 } from 'uuid';
import { ICriteria, TCriteriaClause } from './FilterCollection.types';
import { TOptionObj } from '../AddCollection/AddCollection.types';

export const DEFAULT_FILTERS: ICriteria = {
  clause: 'and',
  criteria: '',
  option: [],
  type: '',
  matchCriteria: '',
  matchCriteriaOptions: [],
  value: '',
  id: v4(),
};

export const DOMAIN_OPTIONS = [
  { label: 'Medical', value: 'Medical' },
  { label: 'Recipe', value: 'Recipe' },
  { label: 'Aptitude Test', value: 'Aptitude Test' },
];

export const CLAUSE_OPTIONS = [
  { label: 'And', value: 'and' },
  { label: 'Or', value: 'or' },
];

export const FILTER_CRITERIA: TCriteriaClause = {
  gender: {
    placeholder: 'Select',
  },
  sexualMaturity: {
    placeholder: 'Select',
  },
  significance: {
    placeholder: 'Select',
  },
  system: {
    placeholder: 'Select',
    type: 'AUTOCOMPLETE',
  },
  conditionsApplicable: {
    placeholder: 'Select',
    type: 'AUTOCOMPLETE',
  },
  domain: {
    placeholder: 'Select',
  },
  // answerSet: {
  //   placeholder: 'Options',
  // },
};

export const helperFunction = (
  index: number,
  fieldName: string,
  value: string,
  optionsObj: TOptionObj,
  cardData: ICriteria[],
  setCriteriaData: Dispatch<SetStateAction<ICriteria[]>>
) => {
  let tempData = JSON.parse(JSON.stringify(cardData));
  if (fieldName === 'criteria') {
    const curValue = optionsObj?.[value];
    const matchedObject = FILTER_CRITERIA[value] || {};
    tempData[index].option = [];
    tempData[index].matchCriteriaOptions = curValue?.option || matchedObject?.option || [];
    tempData[index].value = '';
    tempData[index].type = matchedObject?.type || '';
    tempData[index].matchCriteria = '';
    tempData[index].placeholder = `Select ${curValue?.label || ''}`;
  }
  if (fieldName === 'matchCriteria') {
    let type = cardData[index]?.matchCriteriaOptions.find((obj) => obj.value === value)?.type;
    tempData[index].type = type;
    tempData[index].value = getDefaultValues(type);
  }
  tempData[index][fieldName] = value;
  setCriteriaData(JSON.parse(JSON.stringify(tempData)));
};

const getDefaultValues = (type: string) => {
  if (type === 'AUTOCOMPLETE') {
    return {};
  }
  return '';
};

export const getCriteriaValue = (criteria: ICriteria) => {
  const { matchCriteria, value, type }: any = criteria;

  if (type === 'AUTOCOMPLETE') {
    if (typeof value === 'object') {
      return value?.value;
    }
    return value;
  }
  return matchCriteria;
};

export const AddAnother = (_criteria: ICriteria[], setCardData: Dispatch<SetStateAction<ICriteria[]>>) => {
  const criteria = JSON.parse(JSON.stringify(_criteria));
  criteria.push({ ...DEFAULT_FILTERS, clause: 'and', id: v4() });
  setCardData([...criteria]);
};

export const enableFooter = (domainType: string, criteria: Array<ICriteria>) => {
  if (!domainType || !criteria.length) return false;
  const c1 = criteria.every((c) => {
    if (c.type && c.value && c.criteria) return true;
    if (c.criteria && c.matchCriteria) return true;
    return false;
  });
  return c1;
};
