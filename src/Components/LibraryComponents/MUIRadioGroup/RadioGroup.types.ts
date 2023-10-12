export interface IProps {
  variant: 'radio' | 'token' | 'tokenWithoutCross' | 'radioForStaff';
  options: Array<{ label: string; value: string | boolean }>;
  value: string | boolean;
  setValue: Function;
  flexDirection?: 'row' | 'column';
  minWidth?: string;
  gap?: string;
  isReverse?: boolean;
  isDivider?: boolean;
  disabled?: boolean;
  icon?: any;
  isSurvey?: boolean;
}
