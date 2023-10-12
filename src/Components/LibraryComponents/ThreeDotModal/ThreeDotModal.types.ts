import { PopoverOrigin } from '@mui/material';
import React from 'react';

export interface CommonThreeDotModalProps {
  isReverse?: boolean;
  renderButton?: any;
  customStyle?: string;
  isGrow?: boolean;
  isRotate?: boolean;
  disable?: boolean;
  /** Using popover disabled the BG Page (clicks, scrolls) */
  usePopOver?: boolean;
  /** Only used by PopOver */
  anchorAlignment?: PopoverOrigin;
  /** Only used by PopOver */
  popOverAlignment?: PopoverOrigin;
}

export interface IProps extends CommonThreeDotModalProps {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children: any;
  disableThreeDotMenu?: boolean;
  onModalOpen?: Function;
  onModalClose?: Function;
}
