import { makeStyles } from 'tss-react/mui';
import { IProps } from './PageHeader.types';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  '& *': {
    boxSizing: 'border-box',
  },
  headerContainer: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    gridAutoRows: 'minmax(40px, auto)',
    alignItems: 'center',
    padding: `0 ${props.paddingX || '0'} `,
  },
  firstContainer: {
    '& .backArrow': {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'inherit',
      marginRight: '15px',
    },
  },
  middleContainer: {
    textAlign: props?.titleAlignment || 'left',
    margin: 'auto 0px',
    color: theme.palette.colors.gray[900],
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    wordBreak: 'break-all',
    fontWeight: props.headerContent === 'Recipes' && 500,
  },
  lastContainer: { cursor: 'pointer' },
  bottomContainer: {
    gridColumn: '1 / 4',
    gridRow: '2',
  },
}));
