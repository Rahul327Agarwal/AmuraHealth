export interface ICaloriesRangeProps {
  customStyle?: string;
  width?: string;
  variant: 'inner' | 'outerTop' | 'outerBottom';
  calories: Array<ICaloriesProps>;
  totalKcal: number;
  unit?: string;
}

export interface ICaloriesProps {
  kcal: any;
  title?: string;
  value?: string;
}
