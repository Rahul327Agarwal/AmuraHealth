import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  profileCardSpacing:{
    padding: "100px 60px 20px 60px"
  },
  spacing: {
    padding: "60px",
  },
  header: {
    display: 'grid',
    gridAutoFlow: 'column',
    justifyContent: 'space-between',
    padding: '20px 60px',
    background: '#f8f8f8',
  },
  detailsWrapper: {
    alignItems: 'flex-start',
    width: 'max-content',
  },
  styledPTag: {
    margin: 0,
  }
}));
