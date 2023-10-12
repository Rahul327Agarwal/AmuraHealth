import { makeStyles } from 'tss-react/mui';
import { IProps } from './ProfilePicGroup.types';
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps & { isMore: boolean }>()((theme, props) => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    position: 'relative',
    '& .MuiAvatarGroup-avatar': {
      border: '1px solid #FFFFFF !important',
      width: '24px',
      height: '24px',
      color: '#FFFFFF',
      fontFamily: 'Graphik',
      fontSize: '10px',
      fontWeight: 500,
      '&:last-child': { backgroundColor: props.isMore ? '#303030' : '#757575' },
    },
  },
  avatar: {
    border: `2px solid #FFFFFF`,
    width: '24px',
    height: '24px',
    color: '#FFFFFF',
  },
}));
