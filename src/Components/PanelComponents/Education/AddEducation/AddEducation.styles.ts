import { makeStyles } from 'tss-react/mui';
import { IProps } from './AddEducation.types';
export const useStyles = makeStyles<IProps>()((theme) => ({
  backButton: {
    cursor: 'pointer',
    marginRight: '14px',
    '& path': {
      fill: theme.palette.colors.theme.primary,
    },
  },
  name: {
    display: 'block',
    color: '#5C5A61',
    maxWidth: '280px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  rootContainer: {
    backgroundColor: theme.palette.colors.system.white,
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    padding: '20px',
    height: 'inherit',
    position: 'relative',
    // height: '95vh', // DEV ONLY
    // margin: '-1rem', // DEV ONLY
    overflow: 'hidden',
  },
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
  headerStyle: {
    margin: '0px 20px',
    '& .MuiInputLabel-formControl': {
      color: `#A6A6A6 !important`,
    },
  },
  scrollBody: {
    flexGrow: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingTop: '11px',
    // padding: '0 20px',
  },
  marginBottom: {
    marginBottom: '31px',
    '& .MuiInputLabel-formControl': {
      color: `${theme.palette.colors.gray[500]} !important`,
    },
  },
  bigGrayButton: {
    wordBreak: 'break-word',
    width: '100%',
    padding: '16px',
    color: theme.palette.colors.theme.primaryLight,
    backgroundColor: `${theme.palette.colors.gray[50]} !important`,
    borderRadius: '4px',
    fontSize: '15px !important',
    '& .MuiIconButton-label': {
      fontSize: 'inherit',
    },
  },
  footercontainer: {},
  mb: {
    marginBottom: '16px',
    display: 'block',
  },
  fullWidth: {
    width: '100%',
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
    boxShadow: 'none !important',
  },
}));
