import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  headerWrap: {
    height: 'inherit',
    position: 'relative',
    boxSizing: 'border-box',
    background: 'white',
  },
  namecard: {
    // overflow: "auto",
    // height: "calc(100vh - 330px)",
    padding: '0px 0px 128px 0px',
    margin: '0 -1rem',
  },
  wrapper: {
    height: 'inherit',
    padding: '1rem',
    overflow: 'auto',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  mainTitle: {},
  mb24: {
    marginBottom: '24px',
  },
  subTitle: {
    display: 'block',
  },
  heading: {
    marginBottom: '4px',
  },
  description: {
    color: '#5C5A61',
    wordBreak: 'break-word',
  },
  rowWrap: {
    marginBottom: '24px',
    width: '100%',
  },
  previewBtn: {
    background: theme.palette.colors.theme.primaryLight,
    color: theme.palette.colors.gray[25],
    boxShadow: ' 0px 4px 14px 0px #00000040',
    borderRadius: '6px',
    padding: '4px 13px',
    cursor: 'pointer',
    height: '28px',
  },
  viewBtn: {},
  footerDiv: {
    height: '56px',
    zIndex: 1,
  },
  addButtonWrapper: {
    position: 'absolute',
    // marginLeft:"265px",
    right: '20px',
    bottom: '60px',
    transform: 'translateY(50%)',
    background: '#252427',
    borderRadius: '50%',
  },

  addButton: {
    background: '#252427',
    display: 'grid',
    placeItems: 'center',
    height: '58px',
    width: '58px',
    borderRadius: '50%',
    border: 'none',
    boxShadow: '0px 1px 7px -1px #212529',
    cursor: 'pointer',
    '& path': {
      fill: '#FFFFFF !important',
    },
  },

  disableaddButton: {
    background: '#A6A6A6',
    display: 'grid',
    placeItems: 'center',
    height: '58px',
    width: '58px',
    borderRadius: '50%',
    border: 'none',
    boxShadow: '0px 1px 7px -1px #212529',
    cursor: 'pointer',
    '& path': {
      fill: '#FFFFFF !important',
    },
  },
  wordWrap: {
    wordBreak: 'break-word',
  },
  toggleBranching: {},
  btnGrey: {
    // boxShadow: '0px 1px 7px -1px #212529',
    borderRadius: '22px',
    cursor: 'pointer',
    '& path': {
      fill: `${theme.palette.colors.gray[900]} !important`,
    },
    '& .background-branching': {
      fill: `${theme.palette.colors.gray[50]} !important`,
    },
  },
  btnBlack: {
    //boxShadow: '0px 1px 7px -1px #212529',
    borderRadius: '22px',
    cursor: 'pointer',
    '& path': {
      fill: `${theme.palette.colors.system.white} !important`,
    },
    '& .background-branching': {
      fill: `${theme.palette.colors.gray[900]} !important`,
    },
  },
  hide: {
    display: 'none',
  },
  dFlex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '18px',
  },
  button: {
    '& focus': {
      outline: 'none',
    },
  },
}));
