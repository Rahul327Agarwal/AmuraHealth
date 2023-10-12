import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  clamp: {
    textOverflow: 'ellipsis',
    overflowWrap: 'break-word',
    // display: 'flex',
    // flexFlow: 'column',
    '& hideText': {
      color: theme.palette.colors.theme.primary,
      height: 'auto',
      overflow: 'visible',
    },
  },
  longTRext: {
    overflow: 'visible',
  },
  hideText: {
    color: theme.palette.colors.theme.primary,
    height: 'auto',
    overflow: 'visible',
  },
  readMoreBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  featureText: {
    color: '#5C5A61',
    height: '40px',
    overflow: 'hidden',
    maxWidth: '100%',
    margin: '0px',
    width: '100%',
  },
  textwrapper: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    marginBottom: '0',
  },
}));
