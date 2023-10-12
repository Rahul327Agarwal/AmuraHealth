export interface IProps {
  selectedClient: any;
  sessions: any;
  onClose: Function;
}

export const WEIGHT_UNIT_OPTIONS = [
  { label: 'kgs', value: 'kgs' },
  { label: 'lbs', value: 'lbs' },
];

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
export interface IWeightUnitTypes {
  label: string;
  value: string;
}

export const DUMMY_HISTORY_DATA = [
  // { id: '1', previous: 87.5, current: 90, date: new Date() },
  // { id: '2', previous: 80, current: 79, date: new Date() },
  // { id: '3', previous: 84, current: 100.9, date: new Date() },

  {
    before: '',
    after: '70 kgs',
    updatedOn: '2023-06-29T07:59:55.892Z',
    tenantId: 'amura',
    label: 'weight',
    part_key: '~user~weight~0a7ac449-0d74-463d-a75f-4dc5823c2850~',
    sort_key: '2023-06-29T07:59:55.892Z',
    updatedBy: '0a7ac449-0d74-463d-a75f-4dc5823c2850',
  },
  // {
  //   before: '75 kgs',
  //   after: '72 kgs',
  //   updatedOn: '2023-06-29T07:05:23.823Z',
  //   tenantId: 'amura',
  //   label: 'weight',
  //   part_key: '~user~weight~0a7ac449-0d74-463d-a75f-4dc5823c2850~',
  //   sort_key: '2023-06-29T07:05:23.823Z',
  //   updatedBy: '0a7ac449-0d74-463d-a75f-4dc5823c2850',
  // },
  // {
  //   before: '70 kgs',
  //   after: '75 kgs',
  //   updatedOn: '2023-06-29T07:04:23.190Z',
  //   tenantId: 'amura',
  //   label: 'weight',
  //   part_key: '~user~weight~0a7ac449-0d74-463d-a75f-4dc5823c2850~',
  //   sort_key: '2023-06-29T07:04:23.190Z',
  //   updatedBy: '0a7ac449-0d74-463d-a75f-4dc5823c2850',
  // },
];
