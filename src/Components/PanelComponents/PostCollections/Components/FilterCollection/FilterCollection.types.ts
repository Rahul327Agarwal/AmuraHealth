import { IOptions, TMasterCriteria, TOptionObj } from '../AddCollection/AddCollection.types';

export interface IProps {
  onBack: () => void;
  editCriteria?: IEditFilter;
  onApply: (data: IEditFilter) => void;
  criteriaOpts: IOptions[];
  criteriaBaseOpts: TOptionObj;
}

export interface IEditFilter {
  domainType: string;
  criteria: ICriteria[];
}

export interface ICriteria {
  clause: string;
  criteria: TMasterCriteria | '';
  option: Array<any>;
  type: string;
  matchCriteria: string;
  matchCriteriaOptions: Array<any>;
  value: string | IOptions;
  id: string;
  placeholder?: string;
}

export type TCriteriaClause = Record<TMasterCriteria, { placeholder?: string; option?: IOptions[]; type?: 'AUTOCOMPLETE' | '' }>;
