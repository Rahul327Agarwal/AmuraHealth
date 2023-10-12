import React from 'react';
import { ArrowDown } from '../../SVGs/Common';
import { useStylesButton } from './ThreeDotMenu.styles';
import { RenderButtonProps } from './ThreeDotMenu.types';

const ThreeDotRenderButton = (props: RenderButtonProps) => {
  const { classes } = useStylesButton();

  return (
    <div className={classes.renderButtonWrapper}>
      <span>{props.icon}</span>
      <span>{props.label}</span>
      <span className={classes.reSize}>
        <ArrowDown />
      </span>
    </div>
  );
};

export default ThreeDotRenderButton;
