import { makeStyles } from 'tss-react/mui';
import { IProps } from './StaffCard.types';

export const useStyles = makeStyles<IProps>()((theme, { selectType, roundVariant, isSmallCard, isInlineSubLabel, subLabel }) => ({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '12px',
    position: 'relative',
    cursor: selectType === 'card' ? 'pointer' : 'unset',
    width: selectType === 'card' ? 'unset' : '100%',
    padding: isSmallCard ? '10px 0' : selectType === 'card' ? '8px 16px' : '16px 0',
    borderRadius: roundVariant ? '8px' : '0px',
    height: '84px',
    boxSizing: 'border-box',
    backgroundColor:
      selectType === 'card'
        ? theme.palette.colors.gray[roundVariant ? 25 : 50]
        : roundVariant
        ? theme.palette.colors.gray[50]
        : theme.palette.colors.system.white,
  },
  cardSelectSection: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  profileSection: {
    position: 'relative',
    display: 'flex',
  },
  tenantIcon: {
    display: 'flex',
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 1,
    translate: '-50% 0',
  },
  profilePic: {
    borderRadius: '50%',
    height: isSmallCard ? '20px' : '40px',
    width: isSmallCard ? '20px' : '40px',
    color: theme.palette.colors.theme.primary,
    backgroundColor: theme.palette.colors.gray[100],
    fontSize: isSmallCard ? '8px' : '12px',
    fontWeight: 600,
  },
  profileContentSection: {
    flex: 1,
    display: 'flex',
    flexDirection: isInlineSubLabel ? 'row' : 'column',
    gap: '4px',
  },
  textPrimary: {
    color: theme.palette.colors.theme.primary,
    width: '100%',
    overflow: 'hidden',
    wordBreak: 'break-word',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
  },
  sublabel: {
    color: theme.palette.colors.gray[500],
    backgroundColor: selectType === 'card' && !isInlineSubLabel ? theme.palette.colors.system.white : 'unset',
    maxWidth: 'fit-content',
    borderRadius: '4px',
    padding: selectType === 'card' && !isInlineSubLabel ? (!subLabel ? '0px' : '4px 8px') : '0px',
    overflow: 'hidden',
    wordBreak: 'break-word',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    ...(isInlineSubLabel && { minWidth: 'fit-content' }),
  },
  selectedSection: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(37,36,39,0.5)',
    borderRadius: 'inherit',
  },
  checkIconDIv: {
    top: '50%',
    right: '20px',
    position: 'absolute',
    translate: '0-50%',
    display: 'flex',
  },
  checkFlexbox: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    minWidth: 'fit-content',
  },
  errorText: {
    color: theme.palette.colors.red[700],
  },
  errorTextMessage: {
    borderTop: `1px solid ${theme.palette.colors.gray[100]}`,
    paddingTop: '8px',
    color: theme.palette.colors.red[700],
  },
}));
