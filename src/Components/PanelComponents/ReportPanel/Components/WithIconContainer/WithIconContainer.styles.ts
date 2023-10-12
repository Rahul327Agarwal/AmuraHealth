import { makeStyles } from 'tss-react/mui';
import { IProps } from './WithIconContainer.types';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, { rowGap, columnGap, disabled, Label }) => ({
  iconContainerBox: {
    display: 'grid',
    rowGap: rowGap || '32px',
    columnGap: columnGap || '5px',
    alignItems: 'center',
    gridTemplateColumns: '30px 1fr',
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : 'initial',
  },
  iconChildrenBox: {
    gridArea: Label ? '2/2' : '1/2',
    display: 'grid',
    gridAutoFlow: 'column',
    gap: '30px',
    alignItems: 'start',
  },
  primaryText: {
    color: theme.palette.colors.theme.primary,
  },
}));
