import React from 'react';
import Button from '../MUIButton/MUIButton';
import { useStyles } from './PanelFooter.styles';
import { IProps } from './PanelFooter.types';

export default function PanelFooter(props: IProps) {
  const {
    buttonSize,
    leftButtonText,
    righButtontText,
    disableRightButton,
    handleLeftButton,
    handleRightButton,
    customStyle,
    btnStyle,
    disableLeftButton,
  } = props;
  const { classes } = useStyles(props);
  return (
    <div className={`${classes.footerContainer} ${customStyle}`}>
      <Button
        variant="text"
        size={buttonSize || 'large'}
        className={btnStyle}
        onClick={handleLeftButton}
        disabled={disableLeftButton}
      >
        {leftButtonText}
      </Button>
      <Button
        variant="contained"
        size={buttonSize || 'large'}
        className={btnStyle}
        disabled={disableRightButton}
        onClick={handleRightButton}
      >
        {righButtontText}
      </Button>
    </div>
  );
}
