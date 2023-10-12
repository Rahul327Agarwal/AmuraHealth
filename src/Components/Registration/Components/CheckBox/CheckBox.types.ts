export interface IProps {
  label: string;
  labelPlacement: 'end' | 'start' | 'top' | 'bottom';
  value: boolean;
  handleCheck: Function;
  disabled?: boolean | undefined | null;
  newTheme?: boolean

}
