export interface IProps {
  groupName?: string;
  groupData: Array<{
    biomarkerId: string;
    groupName: string;
    type: string;
    unitId: string;
    value: string;
    createdOn?: string;
  }>;
}
