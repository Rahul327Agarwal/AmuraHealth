import React from 'react';
import { useStyles } from './Accordian.styles';
import { IProps } from './Accordian.types';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useCommonStyles } from '../../../Common/Theme/CommonStyles';
import { UpArrow } from './Accordian.svg';

const Accordian = (props: IProps) => {
  const { accordianTitle, children, customStyle, subTitle, disabled, ...restProps } = props;
  const { classes } = useStyles(props);
  const commonClass = useCommonStyles();

  return (
    <div className={`${classes.accordianWrap} ${customStyle}`}>
      <Accordion {...restProps}>
        <AccordionSummary expandIcon={<UpArrow />} disabled={disabled}>
          {!subTitle && <Typography className={`${commonClass.body15Medium} ${classes.wordbreak}`}>{accordianTitle}</Typography>}
          {subTitle && (
            <span className={`${classes.accordianTitleWrap}`}>
              <Typography className={commonClass.body15Medium}>{accordianTitle}</Typography>
              <Typography className={`${commonClass.caption12Medium} ${classes.justifyRight}`}>{subTitle}</Typography>
            </span>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={commonClass.body15Regular}>{children}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Accordian;
