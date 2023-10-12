import { makeStyles } from 'tss-react/mui';
import { IProps } from './NotesBrowse.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    backgroundColor: theme.palette.colors.system.white,
    position: 'relative',
    padding: '1rem',
    height: 'inherit',
    display: 'flex',
    flexDirection: 'column',
  },
  endAdornment: {
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
  },
  marginBottom24: {
    marginBottom: '24px',
  },
  maindiv: {
    padding: '4px 40px',
    background: '#F8F8F8',
    boxSizing: 'border-box',
    borderBottom: '1px solid #E1E1E1',
    margin: '0 -1rem 24px -1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: '0',
    zIndex: '200',
  },
  footer: {
    position: 'absolute',
    right: '13px',
    bottom: '47px',
  },

  ConfirmButton: {
    height: '44px',
    width: '107px',
    radius: '6px',
    padding: '12px 24px 12px 24px',
  },

  hashfooter: {
    position: 'absolute',
    right: '13px',
    bottom: '66px',
  },
  showall: {
    marginBottom: '13px',
    color: '#373639',
    textAlign: 'right',
    padding: '0 4px',
    cursor: 'pointer',
  },
  mainAccordianDiv: {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: 'calc(100vh - 310px)',
    margin: '0 -16px',
  },
  accordiancard: {},
  accordianWrap: {
    position: 'relative',

    wordBreak: 'break-all',
    '& .MuiTypography-body1': {
      width: '100% !important',
    },
    '& .MuiAccordionSummary-root': {
      transform: 'translateY(-5px) !important',
    },
    '& .MuiPaper-elevation1': {
      boxShadow: 'none',
    },
    '& .MuiCollapse-root': {
      padding: '20px 15px !important',
    },
  },
  footer1: {
    position: 'absolute',
    right: '20px',
    bottom: '35px',
    width: '58px',
    height: '58px',
  },
  accordiandiv: {
    marginBottom: '8px',
  },
  addButton: {
    // transform: 'translateY(50%)',
    width: '58px',
    height: '58px',
    background: `${theme.palette.colors.gray[900]} !important`,
    '& path': {
      fill: `${theme.palette.colors.system.white} !important`,
    },
  },
  addButtonDisabled: {
    position: 'absolute',
    right: '20px',
    bottom: '56px',
    // transform: 'translateY(50%)',
    background: '#A6A6A6',
    '& path': {
      fill: `${theme.palette.colors.system.white} !important`,
    },
  },
  header: {
    color: '#252427',
    marginBottom: '33px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  searchdiv: {
    marginTop: '24px',
    marginBottom: '24px',
  },
  CancelButton: {
    color: '#252427',
  },
  inputStyle: {
    fontSize: '17px !important',
    marginBottom: '32px',
  },
  footerStyle: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    marginBottom: '32px',
  },
  carddiv: {
    overflow: 'auto',
    padding: '0  20px',
    height: 'calc(100% - 50px)',
    margin: '-1px -1rem 0',
    overflowX: 'hidden',
    position: 'relative',
  },
  mainCarddiv: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  scrollArea: {
    position: 'relative',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    overflowX: 'hidden',
    // margin: '0 -20px',
    // padding: '0 20px 36px 20px',

    margin: '-1px -1rem 0',
    padding: '0 1rem',
  },
  CardWrapper: {
    marginBottom: '16px',
    position: 'relative',
  },

  flex1: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  p1: {
    color: '#5C5A61',
  },
  flex3: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profilePic: {
    width: '20px',
    height: '20px',
  },
  flex4: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '5px',
  },
  span1: {
    color: '#007AFF',
  },
  span2: {
    color: '#A6A6A6',
  },

  noResultFoundDiv: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#A6A6A6',
  },

  icondiv: {
    cursor: 'pointer',
    height: '32px',
  },
  heading: {
    color: '#5C5A61',
    margin: '0px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  flex: {
    display: 'flex',
    gap: '8px',
    width: '100%',
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% - 50px)',
  },
  title: {
    color: '#252427',
    margin: '0px',
  },
  backArrorIcon: {
    cursor: 'pointer',
    marginRight: '16px',
  },
}));
