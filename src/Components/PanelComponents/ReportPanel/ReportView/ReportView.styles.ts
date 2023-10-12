import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  rootContainer: {
    position: 'relative',
    height: 'inherit',
    backgroundColor: theme.palette.colors.system.white,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
  },
  backArrow: {
    marginRight: '15px',
    cursor: 'pointer',
  },
  scrollBody: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 'inherit',
    overflowY: 'auto',
    overflowX: 'hidden',
    margin: '0 -20px',
    padding: '0 20px',
  },
  secondryText: {
    marginLeft:'36px',
    color: theme.palette.colors.gray[500],
    wordBreak: 'break-word',
  },
  hidden: {
    display: 'none',
  },
  pageheaderStyle: {
    // gridColumn: '2 / 4 !important',
    marginTop: '-40px !important',
  },
  dflex: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  headerStyle: {
    '& svg': {
      '& path': {
        fill: '#252427 !important',
      },
    },
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.colors.gray[25],
    width: 32,
    height: 32,
    borderRadius: 4,
    cursor: 'pointer',
    transition: 'background-color 0.1s ease',
    '&:hover': {
      backgroundColor: theme.palette.colors.gray[50],
    },

    '& svg': {
      paddingTop: 4,
    },
  },
  bgdark: {
    background: ' #F1F1F1',
    borderRadius: '4px',
    flex: 1,
    padding: '5px',

    '& span': {
      fontWeight: '400 !important',
      color: '#252427 !important',
    },
  },
  flex: {
    display: 'flex',
    gap: '20px',
  },
  download: {
    color: '#5C5A61',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '12px',
  },
  heading: {
    color: '#252427',
    display: 'block',
    marginBottom: '12px',
    marginTop: '14px',
  },
  labName: {
    color: '#252427',
    display: 'block',
  },
  pointerDiv: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
}));
