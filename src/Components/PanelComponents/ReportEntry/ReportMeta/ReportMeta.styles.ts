import { makeStyles, withStyles } from 'tss-react/mui';
import { TextField } from '@mui/material';

export const BootstrapDate = withStyles(TextField, () => ({
  root: {
    'label + &': {
      marginTop: '4px',
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#171D20',
    fontSize: 12,
    boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)',
    color: '#FFF',
    padding: '10px 8px 10px 12px',
    '&:focus': {
      borderRadius: 2,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  keyBoardWidth: {
    width: '70%',
    marginTop: '7px',
  },
  container: {
    display: 'flex',
    marginBottom: '6px',
    height: '34px',
  },
  reportDate: {
    minWidth: '30%',
    margin: '10px',
    fontSize: '0.875REM',
    fontWeight: 500,
    color: '#FFFFFF',
  },
  fieldStyles: {
    marginTop: '7px',
    width: '100%',
  },
  labFieldStyles: {
    marginTop: '7px',
    width: '50%',
  },
}));
