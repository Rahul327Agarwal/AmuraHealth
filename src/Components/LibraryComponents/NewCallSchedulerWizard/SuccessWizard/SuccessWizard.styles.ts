import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainContainerSucces: {
    display: 'flex',
    flexDirection: 'column',
    padding: '48px 0px',
    height: '100%',
    alignItems: 'center',
    overflow: 'auto',
    '@media (min-width: 1024px)': {
      padding: '48px 20px',
    },
  },

  logo: {
    margin: '32px 0px',
  },
  logoContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoConAlignment: {
    display: 'flex',
    width: '100%',
    maxWidth: '350px',
    marginBottom: '32px',
    '@media (min-width: 768px)': {
      maxWidth: '488px',
    },
    '@media (min-width: 1024px)': {
      maxWidth: '100%',
    },
    justifyContent: 'end',
  },
  textColor: {
    color: theme.palette.colors.gray[900],
  },
  textColor2: {
    color: theme.palette.colors.gray[500],
  },
  subContainer2: {
    display: 'flex',
    flexDirection: 'column',
  },

  successContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  appointmentText: {
    wordBreak: 'break-word',
    color: theme.palette.colors.gray[500], //#5C5A61'
  },

  nameChip: {
    margin: '0px 12px 12px 0px',
  },
  listElements: {
    listStyleType: 'none',
    margin: '0px',
    paddingLeft: '0px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    '@media (min-width: 1024px)': {
      maxWidth: '942px',
    },
  },
  contentContainerBg: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.colors.gray[25],
    '@media (min-width: 768px)': {
      maxWidth: '942px',
      borderRadius: '16px',
    },
  },

  dataConatianer: {
    width: '100%',
    backgroundColor: theme.palette.colors.gray[25],
    padding: '48px 20px',
    maxWidth: '350px',
    '@media (min-width: 768px)': {
      maxWidth: '488px',
      padding: '48px 20px',
    },
    '@media (min-width: 1024px)': {
      maxWidth: '100%',
      borderRadius: '16px',
      padding: '48px 48px',
    },
  },

  paddingTB52RL187: {
    '@media (min-width: 1024px)': {
      padding: '52px 187px',
      marginTop: '45px',
    },
  },
  wordbreak: {
    wordBreak: 'break-word',
  },

  //new styles
  marginStyles: {
    '&.maringB12': {
      marginBottom: '12px',
    },
    '&.maringB24': {
      marginBottom: '24px',
    },
    '&.marginB20': {
      marginBottom: '20px',
    },
    '&.marginB2': {
      marginBottom: '2px',
    },
    '&.marginB8': {
      marginBottom: '8px',
    },
    '&.marginL24': {
      marginLeft: '24px',
    },
  },
  greetingsContianer: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonStyle: {
    height: '44px',
    minWidth: 'auto !important',
    padding: '12px 24px !important',
    '&.marginL16': {
      marginLeft: '16px',
    },
  },
  organizerWrap:{
    marginBottom:'20px'
  },
  heading:{
    color:'#A6A6A6',
    display:'block',
    marginBottom:'8px'
  }
}));
