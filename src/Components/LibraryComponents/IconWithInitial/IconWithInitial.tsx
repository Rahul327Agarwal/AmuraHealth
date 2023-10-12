import React from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { useStyles } from './IconWithInitial.styles';
import { IProps } from './IconWithInitial.types';

export const initial_character_limit = 2;

const IconWithInitial = (props: IProps) => {
  const { icon, initial } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  return (
    <div className={classes.container}>
      {icon}
      {!!initial.length && (
        <div className={`${classes.initial} ${commonClasses.sm10Medium}`} data-testid={`initial`}>
          {initial.slice(0, initial_character_limit)}
        </div>
      )}
    </div>
  );
};

export default IconWithInitial;
