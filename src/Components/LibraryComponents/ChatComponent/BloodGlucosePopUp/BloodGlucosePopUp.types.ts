export interface IProps {
  selectedClient: any;
  sessions: any;
  onClose: Function;
}

export interface IBgHistory {
  [unit: string]: {
    before: number;
    after: number;
    updatedOn: Date;
  }[];
}

export interface IHistoryData {
  before: string;
  after: string;
  updatedOn: string;
  tenantId: string;
  label: string;
  part_key?: string;
  sort_key?: string;
  updatedBy?: string;
}

export const FBG_UNIT_OPTIONS = [
  { label: 'mg/dL', value: 'mg/dL' },
  { label: 'mmol/L', value: 'mmol/L' },
];
