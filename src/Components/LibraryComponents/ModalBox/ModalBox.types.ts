import { MouseEventHandler, ReactElement } from 'react';

export interface IModalBoxProps {
  open: boolean;
  modalTitle?: string;
  children: any;
  handleClose: MouseEventHandler;
  buttonPlacement?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  customStyle?: string;
  panelWidth?: string;
  buttonConfig: Array<{
    text: string | ReactElement;
    variant: 'contained' | 'text';
    onClick: (e: React.MouseEvent) => any;
    fullWidth?: boolean;
    disabled?: boolean;
  }>;
  showOnlyChildern?: boolean;
}
