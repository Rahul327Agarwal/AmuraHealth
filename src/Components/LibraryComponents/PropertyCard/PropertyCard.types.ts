export interface IProps {
  id: string;
  customStyle?: string;
  headerTitle: string;
  tooltipText: string;
  rangeHeader: string;
  onRangeChange: Function;
  defaultRangeValue: number;
  isResetFilter?: boolean;
  profileProgress: any;
}
