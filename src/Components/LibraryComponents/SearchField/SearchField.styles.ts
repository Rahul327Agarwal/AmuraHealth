import { makeStyles } from 'tss-react/mui';
import { IProps } from './SearchField.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<any>()((theme, props) => ({
  inputWrap: {
    background: `${theme.palette.colors.gray[25]}`,
    borderRadius: '6px',
    '& *': {
      outline: 'none !important',
      border: 'none !important',
    },
    '& .MuiInputBase-input': {
      background: 'transparent !important',
      color: `${theme.palette.colors.theme.primary} !important`,
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
  clearIcon: {
    cursor: 'pointer',
    visibility: 'hidden',
    '&.visible': { visibility: 'visible' },
  },
}));
