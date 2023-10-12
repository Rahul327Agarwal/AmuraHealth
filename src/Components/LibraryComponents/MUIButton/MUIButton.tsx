import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { ButtonStyled } from './MUIButton.styles';
import { IProps } from './MUIButton.types';
import React from 'react';

export default function MUIButton(props: IProps) {
  const commonStyles = useCommonStyles();
  return <ButtonStyled className={commonStyles.sm10Medium} {...props} />;
}
