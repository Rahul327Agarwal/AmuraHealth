export interface IProps {
  options: Array<{ label: string; value: string }>;
  value: Array<string>;
  onChange: (value: Array<string>) => void;
  isInline?: boolean;
  isDivider?: boolean;
  listAlign?: 'space-between' | 'end' | 'start';
  isReverse?: boolean;
  customStyle?: string;
  disabled?:boolean;
}
