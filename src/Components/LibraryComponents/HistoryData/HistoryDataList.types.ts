export interface IProps {
  // data: IHistoryData[];
  data: any;
  type: 'weight' | 'bp' | 'fbg';
  unit?: string;
  numberOfFractionalDigits?: number;
  // todo: ideally the unit should be of following type
  // unit?: 'mg/dL' | 'mmol/L' | 'kgs' | 'lbs';
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

export interface IFormattedHistoryData {
  before: number;
  after: number;
  updatedOn: string;
}
//weight data
// {
//   "before": "72 kgs",
//   "after": "70 kgs",
//   "updatedOn": "2023-06-29T07:59:55.892Z",
//   "tenantId": "amura",
//   "label": "weight",
//   "part_key": "~user~weight~0a7ac449-0d74-463d-a75f-4dc5823c2850~",
//   "sort_key": "2023-06-29T07:59:55.892Z",
//   "updatedBy": "0a7ac449-0d74-463d-a75f-4dc5823c2850"
// },

//bp data
// {
//   "before": "120-90 mmHg",
//   "after": "120-91 mmHg",
//   "updatedOn": "2023-06-29T07:59:32.825Z",
//   "tenantId": "amura",
//   "label": "bp",
//   "part_key": "~user~bp~0a7ac449-0d74-463d-a75f-4dc5823c2850~",
//   "sort_key": "2023-06-29T07:59:32.825Z",
//   "updatedBy": "0a7ac449-0d74-463d-a75f-4dc5823c2850"
// },
