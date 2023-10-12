import { makeStyles } from 'tss-react/mui';
import { IProps } from './MUICheckboxGroup.types';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, { isReverse, listAlign, isDivider, isInline }) => ({
  mainContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: isInline ? 'row' : 'column',
  },

  menuListStyle: {
    transition: '.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: listAlign || 'space-between',
    flexDirection: isReverse ? 'row-reverse' : 'row',
    gap: '10px',
    cursor: 'pointer',
    padding: '14px 0',
    borderBottom: isDivider ? `0.5px solid ${theme.palette.colors.gray[100]}` : 'unset',
    '&:last-child': { borderBottom: 'none' },
  },
  secondryText: {
    color: theme.palette.colors.gray[500],
  },
}));
