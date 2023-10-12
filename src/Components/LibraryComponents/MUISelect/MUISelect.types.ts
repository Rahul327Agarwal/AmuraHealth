import { SelectProps } from '@mui/material';

export interface IProps extends SelectProps {
  options: Array<{ label: string; value: string; icon?: any }>;
  labelId: string;
  customStyle?: string;
  customMenuProps?: any;
  removePaddingTB?: boolean;
  type?: string;
}
