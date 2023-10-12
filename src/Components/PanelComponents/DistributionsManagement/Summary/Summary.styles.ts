import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  flexrow: {
    display: 'grid',
    gap: '5%',
    marginBottom: '10px',
    gridTemplateColumns: '60% 35%',
    // marginTop: "20px",
    padding: '20px 20px 0 20px',
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

  heading: {
    color: theme.palette.colors.gray[900], //"#252427",
    margin: '0',
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
  topiccard: {
    overflow: 'auto',
    height: 'calc(100% - 84px)',
  },
  summarybody: {
    position: 'relative',
    height: 'inherit',
    background: theme.palette.colors.system.white,
    //padding: "1rem",
  },
  mainwrapper: {
    padding: '8px 8px',
    '&.addCursor': {
      cursor: 'pointer',
    },
  },
  shadow: {
    boxShadow: theme.customShadows.scroll,
  },
}));
