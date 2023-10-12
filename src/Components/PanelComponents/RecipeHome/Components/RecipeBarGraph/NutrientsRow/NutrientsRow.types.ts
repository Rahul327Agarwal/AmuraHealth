import { ICaloriesRangeProps } from '../CaloriesRange/CaloriesRange.types';

export interface INutrientsRowProps extends Partial<ICaloriesRangeProps> {
  customStyle?: string;
  title: string;
  value: string;
  noGraph?: boolean;
}
