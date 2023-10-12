import React from 'react';
import { useStyles } from './PannelFooter.styles';
import { IProps } from './PannelFooter.types';
import Button  from '../MUIButton/MUIButton';

const PannelFooter = (props: IProps) => {
  const { handleCancel, handleAdd, buttonOneTitle, buttonTwoTitle, customStyle, buttonOneProps, buttonTwoProps } = props;
  const { classes } = useStyles();

  return (
    <div className={`${classes.footerWrap} ${customStyle}`}>
      <Button children={buttonOneTitle} variant="text" size="large" onClick={handleCancel} {...buttonOneProps} />
      <Button children={buttonTwoTitle} variant="contained" size="large" onClick={handleAdd} {...buttonTwoProps} />
    </div>
  );
};

export default PannelFooter;
