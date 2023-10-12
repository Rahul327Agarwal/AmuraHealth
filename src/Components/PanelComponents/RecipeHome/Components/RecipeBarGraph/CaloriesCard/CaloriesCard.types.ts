import { ICaloriesRangeProps } from '../CaloriesRange/CaloriesRange.types';

export interface IProps extends ICaloriesRangeProps {
  customStyle?: string;
  headerTitle: string;
  totalKcalTitle?: string;
  total?: any;
}
