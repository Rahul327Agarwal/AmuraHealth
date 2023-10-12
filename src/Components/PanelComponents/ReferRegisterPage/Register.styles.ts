import { makeStyles } from 'tss-react/mui';

export const RegisterStyles = makeStyles()((theme) => ({
  textStyle: {
    fontSize: '14px',
    paddingTop: '15px',
    color: '#1B1B1B',
    paddingBottom: '5px',
    paddingLeft: '7px',
  },
  centerButtonStyle: {
    alignSelf: 'flex-end',
    height: 'fit-content',
    width: '100%',
    borderRadius: '4px',
    background: '#1B1B1B',
    textDecoration: 'none' as const,
    textTransform: 'none' as const,
    color: '#FFF',
    marginLeft: '5px',
    marginTop: '20px',
    '&:hover': {
      border: '0px',
      background: '#1B1B1B',
    },
  },
  errorMessage: {
    fontSize: '12px',
    color: 'red',
    paddingLeft: '7px',
    marginTop: '4px',
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
  stylePopper: {
    //background: "red !important",
    '& .MuiAutocomplete-option': {
      color: '#1B1B1B !important',
    },
    '& .MuiAutocomplete-noOptions': {
      color: '#1B1B1B !important',
      background: '#F7F7F7 !important',
    },
  },
  popperstyle: {
    color: 'black',
    //border: "red solid 1px",
    width: '100% !important',
    //padding: "15px !important",
    backgroundColor: '#F7F7F7',
    '& li': {
      '&:hover': {
        background: '#F8F8F8 !important',
      },
      margin: '0px !important',
    },
    height:'100% !important'
  },
  newFields: {
    height: '45px',
    boxSizing: 'border-box',
    border: '1px solid #D8D8D8 !important',
    paddingBottom: '0px !important',
    paddingRight: '0px !important',
    borderRadius: 4,
    position: 'relative',
    //paddingLeft: "7px",
    marginLeft: '5px',
    outline: 'none !important',
    marginBottom: '30px',
    '& div': {
      //width:"100%",
      height: '100%',
      border: 'none !important',
    },
    '& div:hover': {
      backgroundColor: 'transparent !important',
    },
    '& .MuiInputBase-input': {
      color: '#000 !important',
    },
    '& path': {
      fill: '#000',
    },
    '& .MuiAutocomplete-endAdornment': {
      paddingTop: '8px',
    },
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    background: '#FFFFFF !important',
    height: '100%',
    padding: '20px',
    overflow: 'auto',
    //border:"1px solid red"
  },
  btnFooter: {
    padding: '0px',
    //width:"100%",
    display: 'flex',
    alignSelf: 'start',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  secondryText: {
    color: theme.palette.colors.gray[500],
  },
}));
