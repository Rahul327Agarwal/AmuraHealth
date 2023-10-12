import React from 'react';
import { useStyles } from './DotStatus.styles';
import { IProps } from './DotStatus.types';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';

const DotStatus = (props: IProps) => {
  const { count, onClick = () => {} } = props;
  const { classes } = useStyles(props);
  const CommonStyles = useCommonStyles();

  return (
    <div className={classes.mainContainer} onClick={onClick}>
      <svg className={classes.svgStyle} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" fill="#E1E1E1" />
      </svg>
      <span className={`${classes.numStyleText} ${CommonStyles.sm8Regular}`}>{count > 99 ? '99+' : count || ''}</span>
    </div>
  );
};

export default DotStatus;
