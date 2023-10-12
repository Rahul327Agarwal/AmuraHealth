import { Chip } from '@mui/material';
import React from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { Close } from './svg';
// import { Close } from '../../SVGs/Common';
import { useStyles } from './Token.styles';
import { IProps } from './Token.types';

const Token = (props: IProps) => {
  const { className, ...restProps } = props;
  const commonClasses = useCommonStyles();
  const { classes } = useStyles(props);

  return (
    <Chip
      data-testid="token"
      className={`${commonClasses.body15Regular} ${classes.rootStyle} ${className} ${
        props.active ? classes.active : classes.inActive
      }`}
      variant="outlined"
      color="default"
      deleteIcon={Close}
      {...restProps}
    />
  );
};

export default Token;
