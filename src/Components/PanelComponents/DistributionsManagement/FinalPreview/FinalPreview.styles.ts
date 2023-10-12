import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    position: 'relative',
    height: 'inherit',
    backgroundColor: theme.palette.colors.system.white,
    display: 'flex',
    flexDirection: 'column',
  },
  previewHeader: {
    display: 'flex',
    gap: '20px',
    alignItems: 'start',
    justifyContent: 'space-between',
    padding: '32px 20px 0',
  },
  previewScrollBody: {
    // gap: "24px",
    // display: "flex",
    padding: '20px',
    // overflow: "auto",
    // flexGrow: 1,
    // flexDirection: "column",
  },
  headerText: {
    color: theme.palette.colors.theme.primary,
    wordBreak: 'break-word',
    marginTop: '8px',
  },
  footerDiv: {
    background: '#FFFFFF',
    boxShadow: '0px 14px 74px rgba(0, 0, 0, 0.15)',
    padding: '24px 20px',
    margin: '-1rem',
    marginTop: 'auto',
  },
}));
