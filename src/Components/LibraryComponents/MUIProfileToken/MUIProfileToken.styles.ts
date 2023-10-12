import { makeStyles } from 'tss-react/mui';
import { IProps } from './MUIProfileToken.types';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  gray400: {
    color: theme.palette.colors.gray[400],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  profilePic: {
    borderRadius: '50%',
    height: '32px',
    width: '32px',
    color: props.isDefaultAvatarDark ? theme.palette.colors.system.white : theme.palette.colors.theme.primary,
    // color: theme.palette.colors.theme.primary,
    // backgroundColor: theme.palette.colors.gray[100],
    backgroundColor: props.isDefaultAvatarDark ? theme.palette.colors.theme.primary : theme.palette.colors.gray[100],
    fontSize: '12px',
    fontWeight: 600,
  },
  primarycolor: {
    color: theme.palette.colors.theme.primary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  profileTokenWrapper: {
    boxSizing: 'border-box',
    padding: '0 14px 0 8px',
    border: `1px solid ${theme.palette.colors.gray[100]} !important`,
    display: 'flex',
    borderRadius: '64px',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    height: '48px',
    minWidth: props.minWidth ? props.minWidth : 'auto',
  },
  profileDetails: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: '8px',
    alignItems: 'center',
  },
  participantDetails: {
    display: 'grid',
    gridTemplateColumns: '100%',
    justifyContent: 'center',
    gap: '4px',
    width: '100%',
    maxWidth: '100px',
    flexDirection: 'column',
  },
  crossButton: {
    padding: '0 !important',
    '& svg': {
      color: theme.palette.colors.theme.primary,
    },
  },
}));
