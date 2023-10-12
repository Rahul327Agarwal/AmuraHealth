export interface IProps {
  startTime: Date;
  endTime: Date;
  createdTime: Date;
  showTimer?: boolean;
  noBGandPadding?: boolean;
  setIsLoading?: any;
  triggerFunction?: Function;
  // trigger after accepts a value in MS
  triggerAfter?: number;
  calculateTriggerFrom?: Date;
}
