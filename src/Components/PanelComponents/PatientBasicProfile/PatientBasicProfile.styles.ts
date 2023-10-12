import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    backgroundColor: theme.palette.colors.system.white,
    height: 'inherit',
    padding: '20px 0px',
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
  profileImageBox: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 0 20px 0px',
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
  profileEditBottom: {
    background: `${theme.palette.colors.theme.primary} !important`,
    position: 'absolute',
    bottom: '20%',
    right: '40%',
    border: `3px solid ${theme.palette.colors.system.white}`,
    height: '24px',
    width: '24px',
    padding: 0,
    '& svg': {
      width: '12px',
      height: '12px',
    },
  },
  profileAvatar: {
    height: '68px',
    width: '68px',
    textTransform: 'uppercase',
    // backgroundColor: "transparent",
    color: '#FFFFFF',
    position: 'relative',
    fontWeight: 400,
    backgroundColor: theme.palette.colors.gray[900],
  },
  headerStyle: {
    margin: '0px 20px',
    '& .MuiInputLabel-formControl': {
      color: `#A6A6A6 !important`,
    },
  },
  marginBottom: {
    marginBottom: '24px',
    '& .MuiInputLabel-formControl': {
      color: `${theme.palette.colors.gray[500]} !important`,
    },
  },
  scrollBody: {
    flexGrow: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '0 20px',
  },
  footerStyle: {
    marginTop: 'auto',
    padding: '20px',
    margin: 'auto -20px -20px',
  },
  footercontainer: {
    padding: '0 20px',
  },
  editHistoryOptionCon: {
    gap: '8px',
    display: 'flex',
    alignItems: 'center',
  },
  contentWithIconContainer: {
    display: 'grid',
    gridTemplateColumns: '24px auto ',
    gap: '20px',
    alignItems: 'center',
  },
  marginleft: {
    marginLeft: '44px',
  },
  eachFields: {
    display: 'flex',
    flexDirection: 'column',
  },
  marginB8: {
    marginBottom: '8px',
    color: '#A6A6A6',
  },
  iconsContainer: {
    display: 'flex',
    gap: '28px',
  },
  wordBreaks: {
    wordBreak: 'break-word',
  },
}));
