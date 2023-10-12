import { Functions } from 'aws-sdk/clients/appsync';

export interface IProps {
  startTime: Date;
  endTime: Date;
  createdTime: Date;
  setShowLine?: React.Dispatch<React.SetStateAction<boolean>>;
  triggerFunction?: Function;

  // trigger after accepts a value in MS
  triggerAfter?: number;
  calculateTriggerFrom?: Date;
}
