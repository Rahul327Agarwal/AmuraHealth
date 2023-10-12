import { makeStyles } from 'tss-react/mui';
import { LEFT_SPACE, LEFT_SPACE_REPLY } from '../Message.function';
import { ProfileWithNameProps } from '../Message.types';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<ProfileWithNameProps>()((theme, props) => ({
  normalAvatar: {
    width: '24px',
    height: '24px',
    color: '#FFFFFF',
    background: ' #252427 !important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
  },
  smallAvatar: {
    width: '20px',
    height: '20px',
  },
  partyNameBox: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: `${props.isSmall ? LEFT_SPACE_REPLY : LEFT_SPACE} 1fr`,
  },
  partyName: {
    color: theme.palette.colors.gray[500],
    width: '264px',
    wordBreak:'break-word',
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));
