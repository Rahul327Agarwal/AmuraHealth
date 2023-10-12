import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  container: {
    padding: '16px 0',
    background: '#FFFFFF',
    maxHeight: '285px',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  span: {
    padding: '10px',
    display: 'inline-block',
  },
  popup: {
    position: 'absolute',
    zIndex: 99999,
    width: '100%',
    top: '50px',
    // left: '15px',
    boxShadow: '0px 4px 13px rgba(0, 0, 0, 0.25)',
    background: '#FFFFFF',
  },
  rootRelativeContainer: {
    backgroundColor: theme.palette.colors.system.white,
    height: '100%',
    position: 'relative',
  },
  searchbox: {
    height: '40px !important',
    background: ' #F8F8F8',
    borderRadius: '6px',
  },
  dflex: {
    // display: 'blcok',
    // alignItems: 'center',
    // gap: '8px',
    '& .MuiButtonBase-root': {
      height: '24px',
      padding: '0px !important',
    },
  },
  spaceBetween: {
    padding: '16px',
    borderBottom: '0.5px solid #E1E1E1',
    cursor: 'pointer',
    '&:hover': {
      background: '#F1F1F1',
    },
  },
  highlightOption: {
    background: '#E1E1E1',
  },
  name: {
    display: 'block',
    color: '#5C5A61',
    maxWidth: '280px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  text: {
    display: 'block',
    color: '#5C5A61',
  },
  date: {
    color: '#5C5A61',
    display: 'block',
    textAlign: 'end',
  },
  dot: {
    background: '#d8f3dc',
    height: '10px',
    width: '10px',
    borderRadius: '50%',
    display: 'inline-block',
  },
}));
