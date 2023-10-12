import { Dialog } from '@mui/material';
import React from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { CrossIcon } from '../../SVGs/Common';
import MUIButton from '../MUIButton/MUIButton';
import { useStyles } from './ModalBox.styles';
import { IModalBoxProps } from './ModalBox.types';

export default function ModalBox(props: IModalBoxProps) {
  const { customStyle, open, modalTitle, children, buttonConfig, handleClose, showOnlyChildern, ...restProps } = props;
  const { classes } = useStyles(restProps);
  const commonClasses = useCommonStyles();

  return (
    <Dialog open={open} hideBackdrop className={`${classes.dialogueBox} ${customStyle}`}>
      {!showOnlyChildern && (
        <div className={classes.modalContainer}>
          <header className={`${commonClasses.body17Medium} ${classes.modalTitle}`}>
            {modalTitle}
            <span className={classes.marginR16}>
              <CrossIcon className={classes.closeIcon} onClick={handleClose} />
            </span>
          </header>
          <div className={`${commonClasses.body15Regular} ${classes.modalBody}`}>{children}</div>
          <footer className={classes.modalFooter}>
            {buttonConfig?.map(({ text, ...rest }, index) => (
              <MUIButton key={index} {...rest}>
                {text}
              </MUIButton>
            ))}
          </footer>
        </div>
      )}
      {showOnlyChildern && <div className={`${commonClasses.body15Regular} ${classes.modalBody}`}>{children}</div>}
    </Dialog>
  );
}
