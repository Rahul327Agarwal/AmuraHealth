import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  clamp: {
    textOverflow: 'ellipsis',
    overflowWrap: 'break-word',
    display: 'flex',
    flexFlow: 'column',
    '& hideText': {
      color: '#5C5A61',
      height: 'auto',
      overflow: 'visible',
    },
  },
  longTRext: {
    overflow: 'visible',
  },
  hideText: {
    color: '#5C5A61',
    height: 'auto',
    overflow: 'visible',
    wordBreak:'break-word'
  },
  readMoreBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'end',
    width: '100%',
    // maxWidth: "20%",
    // width: "20%",
    position: 'relative',
    top: '10px',
    '&:focus': {
      outline: 'none !important',
    },
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
    display: '-webkit-box',
    WebkitLineClamp: 2 /* number of lines to show */,
    WebkitBoxOrient: 'vertical',
    marginBottom: '0',
    wordBreak:'break-word'
  },
}));
