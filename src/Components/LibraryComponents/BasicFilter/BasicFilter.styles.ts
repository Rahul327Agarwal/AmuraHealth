import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  filterWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  clearButton: {
    transform: 'translateY(1.1px)',
    paddingRight:"0 !important",
    cursor:'pointer',
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  gcButton:{
    padding:'0 !important',
    "& svg":{
      height:'20px',
      width:'20px'
    }
  }
}));
