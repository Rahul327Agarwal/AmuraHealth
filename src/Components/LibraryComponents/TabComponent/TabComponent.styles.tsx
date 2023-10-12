import { makeStyles } from 'tss-react/mui';
import { IProp, IProps } from './TabComponent.types';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProp | IProps>()((theme, props) => ({
  tabWrap: {
    padding: `0 ${(props as IProp).paddingX || '0'} `,
    marginBottom: '16px',
    background: '#F2F2F2',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    gap: '20px',
  },
  editicon: {
    cursor: 'pointer',
  },
  tabList: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'flex-start',
    padding: '0',
    margin: '0',
  },
  tabListItem: {
    textTransform: 'capitalize',
    // fontSize:"13px",
    position: 'relative',
    display: 'inline-block',
    listStyle: 'none',
    padding: '0.5rem 0.2rem',
    flexGrow: 1,
    fontWeight: 600,
    textAlign: 'center',
    color: '#A6A6A6',
    cursor: 'pointer',
    transition: '.3s ease',
    '&::after': {
      content: "''",
      position: 'absolute',
      bottom: 0,
      left: '50%',
      backgroundColor: 'currentColor',
      height: '4px',
      width: 'calc(100% - 5px)',
      borderRadius: '50px',
      transform: 'translateX(-50%)',
    },
    '&.active': { color: '#252427' },
    '&.error': { color: '#f44336' },
  },
}));
