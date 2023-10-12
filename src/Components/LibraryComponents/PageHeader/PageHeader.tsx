import React from 'react';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { BackArrowIcon } from '../../SVGs/Common';
import Button  from '../MUIButton/MUIButton';
import { useStyles } from './PageHeader.styles';
import { IProps } from './PageHeader.types';

export default function PageHeader(props: IProps) {
  const {
    handleBack,
    isClearAll,
    clearAllText,
    headerContent,
    customStyle,
    handleClearAll,
    endAdornment,
    startAdornment,
    bottomContainer,
    bottomContainerStyle,
  } = props;
  const { classes } = useStyles(props);
  const commonClasses = useCommonStyles();
  return (
    <div className={`${classes.headerContainer} ${customStyle}`}>
      <div className={`${classes.firstContainer} firstContainer`}>
        {startAdornment}
        {props.injectComponent ? (
          props.injectComponent
        ) : !startAdornment && handleBack ? (
          <span className="backArrow" onClick={handleBack}>
            {<BackArrowIcon />}
          </span>
        ) : null}
      </div>

      <div className={`${commonClasses.body17Medium} ${classes.middleContainer}`}>{headerContent}</div>
      <div className={classes.lastContainer}>
        {isClearAll && (
          <Button size="small" fontSize="12px" disableRipple onClick={handleClearAll}>
            {clearAllText || 'Clear All'}
          </Button>
        )}
        {endAdornment}
      </div>
      {bottomContainer && <div className={`${classes.bottomContainer} ${bottomContainerStyle}`}>{bottomContainer}</div>}
    </div>
  );
}
