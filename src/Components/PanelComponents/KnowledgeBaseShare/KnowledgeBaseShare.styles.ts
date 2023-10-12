import { makeStyles } from 'tss-react/mui';
import { IProps } from './KnowledgeBaseShare.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  rootContainer: {
    backgroundColor: theme.palette.colors.system.white,
    padding: '16px 0',
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  searchField: {
    margin: '0 16px',
    // border: '10px solid red',
  },
  scrollBody: {
    flexGrow: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 'calc(100% - 100px)',
    padding: '0 16px',
  },
  noData: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#A6A6A6',
  },
}));
