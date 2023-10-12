import { InputBase } from '@mui/material';
import { withStyles } from 'tss-react/mui';
import { PMS_LOCALE } from '../../../../../Utils';
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
const BootstrapInput = withStyles(InputBase, (theme, props) => ({
  root: {
    overflow: 'hidden',
    'label + &': {
      marginTop: '4px',
    },
    '&.MuiInputBase-root': {
      height: '100%',
      background: '#3f4044 !important',
    },
    width: '100%',

    '& .MuiPaper-root': {
      transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      backgroundColor: '#000 !important',
    },
    '& .MuiMenu-list': {
      background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)), #121212',
      maxHeight: '300px !important',
      outline: 0,
    },
    '& .MuiInputBase-input': {
      cursor: 'pointer',
      background: '#3f4044 !important',
      color: '#fff !important',
      padding: '6px 0px 7px 6px !important',
      fontSize: '14px !important',
    },
    '& .MuiInputBase-input:focus': {
      background: 'rgba(196, 196, 196, 0.5) !important',
      color: '#fff !important',
      fontSize: '14px !important',
    },
    '& .MuiInputBase-input:hover': {
      background: 'rgba(196, 196, 196, 0.5) !important',
      color: '#fff !important',
      fontSize: '14px !important',
    },
    '& .MuiInputBase-input:disabled ': {
      background: '#3f4044 !important',
    },
    '& .react-autosuggest__input': {
      backgroundColor: '#3f4044',
      border: 0,
      outline: 0,
      padding: '5px 5px',
      color: '#fff !important',
      borderBottom: '0px !important',
      fontSize: '14px',
    },
    '& .react-autosuggest__input--focused': {
      outline: 'none',
      backgroundColor: '#818284',
    },
    '& .react-autosuggest__input:hover': {
      outline: 'none',
      backgroundColor: '#818284',
    },
  },
  input: {
    height: '100%',
    position: 'relative' as any,
    textAlign: 'center' as any,
    backgroundColor: 'rgba(196, 196, 196, 0.5) !important',
    color: '#FFF',
    padding: '6px 7px !important',
    fontSize: '12px',
    '&:focus': {
      outline: '0',
      backgroundColor: 'rgba(196, 196, 196, 0.5) !important',
    },
    '&:hover': {
      backgroundColor: 'rgba(196, 196, 196, 0.5) !important',
    },
    '&:disabled': {
      backgroundColor: 'rgba(196, 196, 196, 0.5) !important',
    },
  },
}));

interface IProps {
  handleChange: Function;
  placeHolder: string;
  value: string;
  disabled?: boolean;
}
export default function CenteredInput(props: IProps) {
  return (
    <BootstrapInput
      data-testid="iralue"
      value={props.value}
      disabled={props.disabled}
      placeholder={PMS_LOCALE.translate(`${props.placeHolder}`)}
      onChange={(e) => {
        props.handleChange(e.target.value);
      }}
    />
  );
}
