import { makeStyles } from 'tss-react/mui';
import { IProps } from './SearchField.types';
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  inputWrap: {
    background: '#f8f8f8',
    borderRadius: '6px',
    '& *': {
      outline: 'none !important',
      border: 'none !important',
    },
    '& .MuiInputBase-input': {
      background: 'transparent !important',
      color: `${theme.palette.colors.gray[900]} !important`,
    },
    '& .MuiInputBase-root': {
      background: 'transparent !important',
    },
    '& .MuiFormControl-root': {
      width: '100%',
    },
    '& .MuiOutlinedInput-adornedStart': {
      backgroundColor: `${theme.palette.colors.gray[25]} !important`,
      height: props.maxHeight || '54px',
    },
    '& .MuiOutlinedInput-adornedEnd': {
      backgroundColor: `${theme.palette.colors.gray[25]} !important`,
      height: props.maxHeight || '54px',
      borderRadius: '6px',
    },
  },
  navIcon: {
    cursor: 'pointer',
    '& path': {
      fill: '#000000',
    },
    '&.margin': {
      marginRight: '12px',
    },
    "&[data-disabled='true']": {
      '& path': {
        fill: '#b1b1b1 !important',
      },
    },
  },
}));
