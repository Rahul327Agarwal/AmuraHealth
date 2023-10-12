import { makeStyles } from 'tss-react/mui';
import { IProps } from './LoginLogoutSnippet.types';

export const useStyles = makeStyles<IProps>()((theme, props) => ({
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
    paddingTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',

    '& .MuiInputBase-root.Mui-disabled ': {
      borderBottom: !props.isEditView && 'none !important',
    },
    '& .MuiInputBase-root.Mui-disabled:before': {
      borderBottom: !props.isEditView && 'none !important',
    },
    '& .MuiInputBase-root.Mui-disabled:after': {
      borderBottom: !props.isEditView && 'none !important',
    },
  },
  footerStyle: {
    marginTop: 'auto',
    padding: '20px',
  },
  iconHeaderWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    paddingRight: '16px',
  },
  footerButtonWrapper: {
    padding: '16px',
    width: '100%',
    '& button': {
      padding: '20px !important',
    },
  },
  warningMessage: {
    color: theme.palette.colors.gray[500],
    padding: '20px 0',
    textAlign: 'center',
  },
  warningFooterStyle: {
    display: 'flex',
    justifyContent: 'center',
    boxShadow: 'unset',
    gap: '20px',
    margin: '10px -20px -20px !important',
  },
  modalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    marginBottom: '10px',
    width: '400px',
  },
}));
