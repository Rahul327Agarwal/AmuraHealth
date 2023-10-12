import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  inputContainer: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    alignItems: 'center',

    '& > *:first-child': {
      width: '120px !important',
    },
  },
  input: {
    '& .MuiInputBase-input': {
      // fontSize: '24px !important',
    },
    '& .MuiInputBase-root': {
      // paddingTop: '16px !important',
      // paddingBottom: '4px !important',
      marginBottom: '8px !important',
    },

    '& input': {
      textAlign: 'center',
      // letterSpacing: '24px',
      // textIndent: '24px',
      margin: '0 !important',
      padding: '0 !important',
    },
  },
}));
