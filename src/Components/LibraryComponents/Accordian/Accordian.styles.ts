import { makeStyles } from 'tss-react/mui';
import { IProps } from './Accordian.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme) => ({
  accordianWrap: {
    '& .MuiAccordionSummary-root': {
      padding: '8px 20px',
      minHeight: 'auto',
      background: theme.palette.colors.gray[25],
      display: 'grid',
      gridTemplateColumns: 'calc(100% - 34px) 34px',
    },
    '& .MuiAccordionSummary-content': {
      margin: '0px',
      padding: '0px',
    },
    '& .MuiAccordionSummary-expandIcon': {
      width: '34px',
    },
    '& .expandIconWrapper ': {
      width: '34px',
    },
    '& .MuiTypography-body1': {
      color: theme.palette.colors.gray[500],
    },
    '& .MuiCollapse-root': {
      background: theme.palette.colors.system.white,
      padding: '20px 0px',
    },
    '& .MuiAccordionSummary-root.Mui-expanded': {
      minHeight: 'auto !important',
    },
    '& .MuiPaper-root': {
      backgroundColor: `${theme.palette.colors.system.white} !important`,
    },
    '& .MuiCollapse-entered': {
      padding: '20px 0px',
    },
    '& .MuiAccordion-rounded': {
      minHeight: '38px',
      height: '38px',
      overflow: 'hidden',
    },
    '& .Mui-expanded': {
      height: 'auto',
      margin: '0px !important',
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
      width: 'fit-content',
      marginLeft:'10px !important'
    },
  },
  accordianTitleWrap: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
  },
  justifyRight: {
    textAlign: 'right',
  },
  wordbreak: {
    wordBreak: 'break-all',
  },
}));
