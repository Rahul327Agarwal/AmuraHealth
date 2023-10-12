import { makeStyles } from 'tss-react/mui';
export const RegisterStyles = makeStyles()((theme) => ({
  textStyle: {
    fontSize: '14px',
    paddingTop: '15px',
    color: '#1B1B1B',
    paddingBottom: '5px',
    paddingLeft: '7px',
  },
  mainContainer: {
    height: 'calc(100% - 42px)',
    overflowX: 'hidden',
    width: '100%',
    '& .PhoneInputInput': {
      outline: 'none',
    },
    margin:'auto',
  },
  centerButtonStyle: {
    height: 'fit-content',
    width: '100%',
    borderRadius: '4px',
    background: '#1B1B1B',
    textDecoration: 'none' as const,
    textTransform: 'none' as const,
    marginRight: '5px',
    color: '#FFF',
    marginLeft: '7px',
    marginTop: '20px',
    '&:hover': {
      border: '0px',
      background: '#1B1B1B',
    },
  },
  errorMessage: {
    fontSize: '10px',
    color: 'red',
    paddingLeft: '7px',
  },
  checkbox: {
    height: '24px',
    margin: '0px',
    '& .MuiTypography-root': {
      marginLeft: '8px',
    },
  },
  formLabel: {
    fontSize: '14px',
    paddingTop: '15px',
    color: '#1B1B1B !important',
    paddingBottom: '5px',
    paddingLeft: '7px',
    '& .MuiCheckbox-colorSecondary.Mui-checked': {
      color: '#1B1B1B !important',
    },
  },
  paddingLeft: {
    paddingLeft: '7px',
    overflow: 'hidden',
  },
}));
