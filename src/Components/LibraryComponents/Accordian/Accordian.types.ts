import { AccordionProps } from '@mui/material';

export interface IProps extends AccordionProps {
  accordianTitle: any; //String;
  customStyle?: string;
  accodianContent?: any;
  children: any;
  noContent?: any;
  subTitle?: any;
  disabled?: boolean;
}
