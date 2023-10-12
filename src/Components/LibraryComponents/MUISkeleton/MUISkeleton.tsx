import React from 'react';
import { StyledSkeleton } from './MUISkeleton.styles';
import { IProps } from './MUISkeleton.types';

export default function MUISkeleton(props: IProps) {
  return <StyledSkeleton {...props} />;
}
