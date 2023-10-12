import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
// export const useStyles = makeStyles()((theme,props) => ({
  export const useStyles = makeStyles()((theme,) => ({
  note: {
    color: '#252427',
  },
  sendButton: {
    background: 'green',
  },
  flex:{
    flex:1,
  },
  maindiv: {
    boxSizing: 'border-box',
    background: 'white',
    padding: '1rem',
    position: 'relative',
    height:'100%' ,
  },
  headerdiv: {
    height:'100%',
    display:'flex',
    flexDirection:'column',
  },
  header: {
    margin: '0 -1rem 30px -1rem',
  },
  footer: { },
  flex1: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  arrowstyle: {
    marginRight: '16px',
  },
  tagdiv: {
    marginBottom: '30px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderRadius: '0px',
    },
  },
  inputdiv: {
    marginBottom: '24px',
  },
  check: {
    color: '#252427',
    marginLeft: '8px',
  },
  backArrowIcon: {
    cursor: 'pointer',
  },
}));
