import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  PropertyCardWrap: { padding: '20px' },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  contentWrap: { width: '75%' },
  graphWrap: { width: '25%' },
  contentText: {
    color: theme.palette.colors.gray[500],
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    gap: '10px',
    marginBottom: '10px',
  },
  contentDetails: {
    color: theme.palette.colors.gray[900],
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginRight: '10px',
  },
}));
