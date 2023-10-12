import { IOptions, TMasterCriteria, TOptionObj } from '../AddCollection/AddCollection.types';

export interface IProps {
  onBack: () => void;
  editCriteria?: IEditSort;
  onApply: (data: IEditSort) => void;
}

export type IEditSort = ICriteria[];

export type IAvailableCriteria = 'significance' | 'name' | 'createdTime';

export interface ICriteria {
  clause: string;
  criteria: IAvailableCriteria | '';
  option: Array<any>;
  type: string;
  matchCriteria: string;
  matchCriteriaOptions: Array<any>;
  value: string | Array<string>;
  id: string;
  placeholder?: string;
}

export type TCriteriaClause = Record<IAvailableCriteria, { placeholder?: string; option?: IOptions[] }>;

export type TSort = 'A-Z' | 'Z-A' | 'high-low' | 'low-high' | 'good' | 'bad' | 'new-old' | 'old-new';
