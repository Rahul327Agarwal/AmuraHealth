export interface IProps {
  disabled?: boolean;
  headerTitle?: string;
  label: string;
  value: string;
  onChange: Function;
  customStyle?: string;
  helperText?: string;
  showSeconds?: boolean;
}