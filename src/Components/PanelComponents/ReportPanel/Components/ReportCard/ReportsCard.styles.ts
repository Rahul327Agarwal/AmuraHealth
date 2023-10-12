import { makeStyles } from 'tss-react/mui';
import { IProps } from './ReportsCard.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, { isActive, isSelected }) => ({
  reportCards: {
    backgroundColor: theme.palette.colors.gray[!isActive || isSelected ? 25 : 50],
    padding: '20px 16px',
    borderRadius: '6px',
    cursor: isActive ? 'pointer' : 'unset',
    // border: `2px solid ${isSelected ? theme.palette.colors.gray[100] : 'transparent'} `,
  },
  cardHeaders: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardSides: {
    display: 'grid',
    gridTemplateColumns: '60% 40%',
    marginTop: '20px',
  },
  primaryText: {
    color: theme.palette.colors.theme.primary,
    opacity: isActive ? 1 : '0.5',
    wordBreak: 'break-word',
    fontWeight: 500,
  },
  secondaryText: {
    color: '#5c5a61',
    fontWeight: 400,
    fontSize: 15,
    fontStyle: 'normal',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    wordBreak: 'break-word',
  },
  deactivateDiv: {
    width: '100%',
    height: 'auto',
    padding: '20px 0 0 0',
    display: 'grid',
    gridTemplateColumns: '11% 89%',
    // alignItems: 'center',
  },
  userNameWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  avatar: {
    height: '24px',
    width: '24px',
  },
}));
