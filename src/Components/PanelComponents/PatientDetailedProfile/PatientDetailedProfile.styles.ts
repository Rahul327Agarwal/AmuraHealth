import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    backgroundColor: theme.palette.colors.system.white,
    height: 'inherit',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    '& .MuiInputBase-root': {
      '& .MuiInputBase-input': {
        '&.Mui-disabled': {
          color: '#252427 !important',
          '-webkit-text-fill-color': '#252427 !important',
        },
      },
    },
  },
  headerStyle: {
    padding: '20px 20px 0 !important',
  },
  scrollBody: {
    flexGrow: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '20px',

    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  footerStyle: {
    marginTop: 'auto',
    padding: '20px',
    boxShadow:'none !important'
  },
  gridBox: {
    display: 'grid',
    gridTemplateColumns: '1fr 120px',
    gap: '20px',
  },
  sexAtBirthSection: {},
  heightSection:{
    display:'flex',
    gap:'48px'
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    paddingBottom: '15px',
    borderBottom: `1px solid ${theme.palette.colors.gray[100]}`,
    marginBottom: '15px',
  },
  subLabel: {
    color: theme.palette.colors.gray[500],
  },
  subLabel1: {
    color: theme.palette.colors.theme.primary,
    marginBottom: '10px',
  },
  subLabel2: {
    color: theme.palette.colors.theme.primary,
    margin: '28px 0 10px',
  },
  buttonLeft: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '30px 0 10px',
  },
  selectAllButton: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-end',
    cursor: 'pointer',
    alignSelf: 'end',
  },
  mobileGrid: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: '20px',
  },
  warningMessage: {
    color: theme.palette.colors.gray[500],
    padding: '20px 0',
    textAlign: 'center',
  },
  warningFooterStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    margin: '10px -20px -20px !important',
    boxShadow:'none !important',
  },
  editHistoryOptionCon: {
    gap: '8px',
    display: 'flex',
    alignItems: 'center',
  },
  inputWrapperNoBorder: {
    border: 'none',
    marginBottom: '0',
  },
  iconHeaderWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    paddingRight: '16px',
  },
  marginT8: {
    marginTop: '8px',
    wordBreak: 'break-word',
  }
}));
