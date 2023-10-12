import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  container: {
    flexGrow: 1,
    overflow: 'auto',
    margin: '0 -20px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    paddingBottom: '20px',
  },
  pannelFooterStyle: {
    margin: 'auto -20px -20px',
  },
  objectiveWrapper: {
    borderBottom: '1px solid #e1e1e1 !important',
    padding: '6px 0',
    '& p': {
      marginBottom: '0',
      display: 'inline',
      height: 'auto',
      maxHeight: '40px',
    },
    '& button': {
      display: 'contents !important',
    },
  },
  objLabel: {
    color: '#a6a6a6',
  },
  objLabelDark: {
    color: '#5c5a61  !important',
  },
}));
