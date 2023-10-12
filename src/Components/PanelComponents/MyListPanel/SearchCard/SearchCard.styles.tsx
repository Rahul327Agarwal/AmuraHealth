import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  searchCardWrap: {
    padding: '20px 0px 0px',
    transform: 'translate(-355px,0px)',
    transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
  },
  swipeIn: {
    transform: 'translate(0px,0px)',
  },
  swipeOut: {
    transform: 'translate(-355px,0px)',
  },
  recentSearchWrap: {
    padidngTop: '32px',
  },
  searchTitle: {
    color: '#5C5A61',
    padding: '8px 20px',
    background: '#F8F8F8',
    margin: '32px -20px 20px',
  },
  searchCardContent: {
    paddingTop: '32px',
  },
  tokenItem: {
    // marginRight: "12px"
  },
  tokenWrap: {
    '& .MuiChip-root': {
      marginRight: '12px',
      marginBottom: '12px',
    },
  },
  backdrop: {
    opacity: 0.8,
    background: theme.palette.colors.gray[900],
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
}));
