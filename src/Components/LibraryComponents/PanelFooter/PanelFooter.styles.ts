import { makeStyles } from 'tss-react/mui';
import { IProps } from './PanelFooter.types';
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  footerContainer: {
    // backgroundColor: theme.palette.colors.system.white,
    boxShadow: '0px 14px 74px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `20px ${props.paddingX || '0'} `,
  },
}));
