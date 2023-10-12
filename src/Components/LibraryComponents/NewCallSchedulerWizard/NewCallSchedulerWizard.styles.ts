import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '28px 0px',
    height: '100%',
    overflow: 'auto',
    alignItems: 'center',
    '@media (min-width: 1024px)': {
      padding: '48px 20px',
    },
  },
  mainWrapper: {
    width: '100%',
  },
  main: {
    padding: '32px',
    alignSelf: 'left',
    width: '100%',
  },
  logo: {
    margin: '32px 0px',
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
    },
    '@media (min-width: 1024px)': {
      borderRadius: '16px',
    },
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
    color: theme.palette.colors.gray[900], //#252427
    wordBreak: 'break-word',
  },

  marginStyles: {
    '&.marginB29': {
      marginBottom: '29px',
    },
    '&.marginB16': {
      marginBottom: '16px',
    },
    '&.marginB28': {
      marginBottom: '28px',
    },
    '&.marginB48': {
      marginBottom: '48px',
    },
    '&.marginL24': {
      marginLeft: '24px',
    },
    '&.marginR32': {
      marginRight: '32px',
    },
  },

  dataConatianer: {
    width: '100%',
    padding: '48px 20px',
    maxWidth: '350px',
    backgroundColor: theme.palette.colors.gray[25],
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
  detailContainer: {
    marginBottom: '28px',
  },

  calenderBg: {
    background: '#FFFFFF !important',
    //padding: '20px 0px',
    //margin: '0px 28px 30px',
  },
  horizontalLine: {
    border: ` 1px solid ${theme.palette.colors.gray[200]}`,
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
  ComboContainer: {
    display: 'flex',
    flexDirection: 'column',
    '@media (min-width: 1024px)': {
      display: 'grid',
      gridTemplateColumns: '42% 54%',
      gap: '30px',
    },
  },
  TimeZoneContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px 0px 19px 0px',
    '& .MuiInputBase-input': {
      display: 'unset',
      width: '210px',
    },
  },
  timeSlotsGrid: {
    //padding: '0px 5px',
    display: 'flex',
    gap: '16px',
    overflowY: 'auto',
    flexWrap: 'wrap',
    '@media (min-width: 768px)': {
      display: 'flex',
      flexWrap: 'wrap',
      height: 'fit-content',
      gap: '16px',
    },
    '@media (min-width: 1024px)': {
      display: 'flex',
      flexWrap: 'wrap',
      height: 'fit-content',
      gap: '16px',
    },
  },
  noslotsdata: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    color: '#AEAEAE',
    marginLeft: '4px',
    textAlign: 'center',
    width: '100%',
  },

  buttonStyle: {
    boxShadow: 'none !important',
    height: '80px',
    width: '100%',
    padding: '12px 24px !important',
    '&.marginL16': {
      marginLeft: '16px',
    },
    marginTop: '29px',
    marginBottom: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonStyle2: {
    height: '44px',
    minWidth: 'auto !important',
    padding: '12px 24px !important',
    '&.marginL16': {
      marginLeft: '16px',
    },
  },
  buttonStyle3: {
    // height: '44px',
    // minWidth: 'auto !important',
    // padding: '12px 24px !important',
    // '&.marginL16': {
    //   marginLeft: '16px',
    // },
  },

  timeIcon: {
    marginRight: '16px',
    marginTop: '10px',
  },
  menuInlineStyle: {
    padding: '10px',
    '&:hover': {
      background: `${theme.palette.colors.gray[25]} !important`,
    },
    '& :nth-child(2)': {
      minWidth: 'max-content',
      textAlign: 'end',
    },
  },
  confirmationConatianer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '48px 20px',
    width: '100%',
    maxWidth: '350px',
    backgroundColor: theme.palette.colors.gray[25],
    '@media (min-width: 768px)': {
      padding: '48px 48px',
      maxWidth: '488px',
    },
  },
  containerWidth: {
    width: '100%',
  },
  slotsContainer: { textAlign: 'center', width: '100%' },
  slotsGrid: {
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: 'repeat(auto-fit, 100px)',
    gridGap: '16px',
  },
  titleAndTimeCon:{
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap', 
  },
  organizerWrap:{
    marginBottom:'20px'
  },
  heading:{
    color:'#A6A6A6',
    display:'block',
    marginBottom:'8px'
  },
  participantLabel: {
    color: theme.palette.colors.gray[900],
    marginBottom: '12px',
  },
}));
