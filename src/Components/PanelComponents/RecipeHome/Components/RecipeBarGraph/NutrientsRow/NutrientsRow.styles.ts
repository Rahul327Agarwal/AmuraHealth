import { makeStyles } from 'tss-react/mui';
import { INutrientsRowProps } from './NutrientsRow.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<INutrientsRowProps>()((theme, { noGraph }) => ({
  mainContainer: {
    display: 'grid',
    alignItem: 'center',
    gap: '4px',
    gridTemplateColumns: noGraph ? '5fr 7fr' : '5fr 5fr 1fr',
    borderBottom: `1px solid ${theme.palette.colors.gray[100]}`,
    padding: '8px 0',
  },
  textStyle: {
    color: theme.palette.colors.theme.primary,
    flexGrow: 1,
  },
  unitTextStyle: {
    color: theme.palette.colors.theme.primary,
    minWidth: '32px',
    textAlign: 'end',
  },
}));
