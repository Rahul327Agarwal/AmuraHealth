import { makeStyles } from 'tss-react/mui';
import { IProps } from './ConfigurationCard.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  cardWrap: {
    background: props.selected ? theme.palette.colors.system.white : theme.palette.colors.gray[50],
    padding: '28px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    borderBottom: '2px solid #FFFFFF',
    cursor: 'pointer',
    height: 'inherit',
  },
  imgWrap: {
    background: '#626262',
    height: '44px',
    width: '44px',
    border: '0.5px solid #E1E1E1',
    borderRadius: '50%',
    position: 'relative',
  },
  logoIcon: {
    position: 'absolute',
    top: '29px',
    zIndex: 1,
    left: '32px',
  },
  profilePic: {
    borderRadius: '50%',
    height: '44px',
    width: '44px',
    color: '#FFFFFF',
    position: 'relative',
    fontSize: '12px',
    fontFamily: 'Graphik',
    fontWeight: 400,
  },
  cardContentWrap: {
    width: '80%',
  },
  cardTitle: {
    color: theme.palette.colors.theme.primary,
    display: 'block',
    marginBottom: '8px',
  },
  cardCaption: {
    color: theme.palette.colors.gray[500],
    display: 'block',
    marginBottom: '8px',
  },
  recordWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordTitle: {
    color: theme.palette.colors.gray[400],
  },
  recordTime: {
    color: theme.palette.colors.gray[400],
    display: 'flex',
    alignItems: 'center',
  },
  timeIcon: {
    transform: 'translateY(3px)',
    display: 'inline-block',
    marginRight: '5px',
  },
  clearFilter: {
    color: theme.palette.colors.gray[400],
  },
}));
