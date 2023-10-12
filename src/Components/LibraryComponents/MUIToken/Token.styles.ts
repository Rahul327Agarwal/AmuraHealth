import { makeStyles } from 'tss-react/mui';
import { IProps } from './Token.types';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((themes, props) => ({
  rootStyle: {
    '& .MuiChip-deleteIcon': {
      fill: `${themes.palette.colors.gray[900]} !important`,
      visibility: 'visible',
    },
    '&:hover .MuiSvgIcon-root': {
      fill: `${themes.palette.colors.gray[900]} !important`,
      opacity: '0.7',
    },
    color: themes.palette.colors.gray[900],
    minWidth: props.minWidth || 'auto',
    maxWidth: '100%',
    padding: props.avatar ? '4px 8px' : '0',
  },
  active: {
    '&.MuiChip-outlined': {
      boxShadow: 'none',
      '& .MuiChip-label': {
        color: `${themes.palette.colors.gray[900]} !important`,
      },
      '&:hover .MuiChip-label': {
        color: `${themes.palette.colors.gray[900]} !important`,
      },
      backgroundColor: 'transparent !important',
      border: `1px solid ${themes.palette.colors.gray[props.avatar ? 400 : 900]} !important`,
      padding: '0 9px',
    },
  },
  inActive: {
    '&.MuiChip-outlined': {
      boxShadow: 'none',
      '& .MuiChip-label': {
        color: `${themes.palette.colors.gray[500]} !important`,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      '&:hover .MuiChip-label': {
        color: `${themes.palette.colors.gray[500]} !important`,
      },
      backgroundColor: `${themes.palette.colors.gray[25]} !important`,
      border: `1px solid ${themes.palette.colors.gray[100]} !important`,
      padding: '0 9px',
    },
  },
}));
