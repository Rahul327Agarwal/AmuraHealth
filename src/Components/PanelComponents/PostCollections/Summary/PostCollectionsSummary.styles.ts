import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  headerWrap: {
    padding: '1rem',
  },
  flexrow: {
    display: 'grid',
    gap: '5%',
    marginBottom: '10px',
    gridTemplateColumns: '60% 35%',
    marginTop: '20px',
  },
  flexrow2: {
    display: 'flex',
    gap: '3px',
    alignItems: 'center',
    marginBottom: '4px',
  },
  span: {
    display: 'contents',
  },
  p1: {
    alignItems: 'center',
    color: theme.palette.colors.gray[400], //"#A6A6A6",
    marginTop: '3px',
    lineHeight: '10px',
  },
  p2: {
    alignItems: 'center',
    color: theme.palette.colors.gray[900], //"#252427",
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    // marginTop: "0",
  },
  hr: {
    background: theme.palette.colors.gray[100],
    height: '1px',
  }, //#E1E1E1" },
  topicsContainer: {
    height: 'calc(100% - 118px)',
    padding: '0px',
    overflow: 'auto',
  },
  heading: {
    color: theme.palette.colors.gray[900], //"#252427",
    margin: '0',
    display: 'block',
  },
  title: {
    color: theme.palette.colors.gray[500], //"#5C5A61",
    marginTop: '10px',
    marginBotom: '0px',
    wordBreak: 'break-word',
  },
  mainhead: {
    display: 'flex',
    gap: '16px',
  },
  descriptionwrapper: {
    flex: 1,
  },
  iconwrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: theme.palette.colors.gray[50], //"#F1F1F1",
    width: '32px',
    height: '32px',
  },
  inject: {
    '& path': {
      fill: '#5C5A61 !important',
    },
  },
  summarybody: {
    height: 'inherit',
    background: theme.palette.colors.system.white,
    // padding: "1rem",
    // overflowY: 'auto',
    // overflowX: 'hidden',
    position: 'relative',
  },
  mainwrapper: {
    padding: '8px 8px',
    marginBottom: '16px',
    '&.addCursor': {
      cursor: 'pointer',
    },
  },
  selected: {
    padding: '8px 8px',
    backgroundColor: theme.palette.colors.gray[25],
    '&.addCursor': {
      cursor: 'pointer',
    },
  },
  reAnswerQuestion: {
    color: theme.palette.colors.theme.primary,
    marginBottom: '40px',
  },
  drawerFooter: {
    margin: '-20px',
    marginTop: '0',
  },
  shadow: {
    boxShadow: theme.customShadows.scroll,
  },
}));
