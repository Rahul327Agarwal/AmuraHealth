import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((themes) => ({
  footer: {
    position: 'absolute',
    bottom: '40px',
    width: '85%',
  },
  headerWrap: {},
  maindiv: {
    background: themes.palette.colors.system.white,
  },
  pmargin: {
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    color: themes.palette.colors.gray[500],
  },
  footerdiv: {
    marginTop: '25px',
    width: '70%',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
