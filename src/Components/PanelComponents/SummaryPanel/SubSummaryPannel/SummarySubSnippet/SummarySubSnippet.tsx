import React from 'react';
import { useCommonStyles } from '../../../../../Common/Theme/CommonStyles';
import { useStyles } from './SummarySubSnippet.styles';
import { IProps } from './SummarySubSnippet.types';

const SummarySubSnippet = (props: IProps) => {
  const { textValue, title, icon, onClick } = props;
  const { classes } = useStyles(props);
  const CommonStyles = useCommonStyles();
  return (
    <>
      <div className={classes.mainContainer} onClick={onClick ? onClick : null}>
        <div className={`${classes.subContainer} ${CommonStyles.sm10Regular}`}>
          <span>{icon}</span>
          <span className={classes.titleStyle}>{title}</span>
        </div>
        <span
          className={`=${CommonStyles.body15Regular} ${!props?.completeView ? classes.valueStyle : classes.valueStyleNoOverflow}`}
          title={textValue ? textValue : ''}
        >
          {textValue ? textValue : '-'}
        </span>
      </div>
    </>
  );
};
export default SummarySubSnippet;
