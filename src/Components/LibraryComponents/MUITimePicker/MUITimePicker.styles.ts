import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  rootContainer: {
    '& .MuiInputBase-input': {
      cursor: 'pointer',
    },
  },
  mainInputWrapper: {
    margin: '50px 0',
    gap: '56px',
    width: '100%',
    display: 'grid',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gridTemplateColumns: '1fr 120px',
    // borderBottom: '3px solid red',
  },
  inputWrapper: {
    gap: '20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gridTemplateColumns: '1fr 1fr',
  },
  inputStyle: {
    fontSize: '17px !important',
  },
  footerWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '30px',
    alignItems: 'center',
  },

  errorText: {
    color: theme.palette.colors.red[700],
  },
  borderBottom: {
    borderBottom: '2px solid #292F3F',
  },
}));
