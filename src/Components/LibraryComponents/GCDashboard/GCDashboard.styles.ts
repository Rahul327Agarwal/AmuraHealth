import { makeStyles } from 'tss-react/mui';
import { IProps } from './GCDashboard.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme) => ({
  mainWrapper: {
    overflow: 'auto',
    width: '100%',
    padding: '52px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    overflowX: 'hidden',
  },
  container: {
    maxWidth: '1086px',
    minWidth: '340px',
    width: 'inherit',
    height: '100%',
    // overflowY: 'auto',
    // height: 'inherit',
  },
  tabs: {
    display: 'flex',
    gap: '32px',
    height: 'calc(100% - 200px)',
    flexWrap: 'wrap',
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
  circularloader: {
    color: `${theme.palette.colors.gray[900]} !important`,
  },
  mobileViewConainter: {
    paddingBottom: '32px',
    '@media (min-width: 601px)': {
      display: 'none',
    },
  },
  tabsNav: {
    // width:'30%',
    height: 'auto',
  },
  height: {
    height: '100%',
  },
  tabsContentWrapper: {
    flex: 1,
    background: ' #E1E1E1',
    borderRadius: ' 20px 20px',
    padding: '5px',
    height: '1340px',
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
  content: {
    padding: '50px',
    overflowY: 'auto',
    height: '100%',
    '&::-webkit-scrollbar-thumb': {
      background: '#F1F1F1 !important',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent !important',
    },
  },
  navItems: {
    cursor: 'pointer',
    '&:not(:last-child)': {
      marginBottom: '32px',
    },
  },
  active: {
    position: 'relative',
    background: '#E1E1E1',
    borderRadius: '20px',
    padding: '32px 40px',

    '@media (max-width: 600px)': {
      padding: '32px 24px',
      borderRadius: '20px',
    },
  },
  first: {
    position: 'absolute',
    top: '-35px',
    right: '-2px',
    transform: 'rotate(90deg)',
  },
  last: {
    position: 'absolute',
    bottom: '-30px',
    right: '3px',
  },
  absolute: {
    right: '-90px',
    top: '-32px',
    width: '70px',
    height: '196px',
    background: '#E1E1E1',
    position: 'absolute',
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
  inActive: {
    background: ' #F1F1F1',
    borderRadius: '20px',
    padding: '32px 40px',
    '@media (max-width: 600px)': {
      padding: '32px 24px',
    },
  },
  navWrap: {
    position: 'relative',
  },
  tabTitle: {
    display: 'block',
    color: '#5C5A61',
  },
  count: {
    fontSize: '42px',
    fontWeight: '500',
  },
  tabContent: {
    borderBottom: ' 1px solid #F1F1F1',
    cursor: 'pointer',
  },
  accordianHeader: {
    padding: ' 32px 0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateInputContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clientWrapper: {
    background: '#E9E8E8',
    padding: '24px 20px',
    borderRadius: '12px',
    marginTop: '12px',
    wordBreak: 'break-word',

    '&:last-of-type': {
      marginBottom: '12px',
    },
  },
  editIcon: {
    cursor: 'pointer',
  },
  rotateUP: {
    transform: 'rotate(180deg)',
    cursor: 'pointer',
  },
  pointer: {
    cursor: 'pointer',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '32px',
    height: '178px',
    '@media (max-width:600px)': {
      flexDirection: 'column',
      height: 'auto',
    },
  },
  userWrap: {
    padding: '48px',
    // flex: 1,
    background: '#5C5A61',
    color: '#FFFFFF',
    borderRadius: '20px 0px 0px 20px',
    height: 'inherit',
    width: 'inherit',
    '@media (max-width:600px)': {
      height: 'auto',
      borderRadius: '20px 20px 0px 0px',
      padding: '36px 24px',
    },
  },

  heading: { color: '#5C5A61', fontSize: '22px', fontWeight: 500, lineHeight: '26px' },
  datefield: {
    display: 'flex',
    gap: '40px',
    marginTop: '16px',
    // alignItems: 'flex-end',
    width: '100%',
    '@media (max-width:600px)': {
      flexDirection: 'column',
      // alignItems: 'flex-start',
    },
  },
  datefieldsdWraper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flex: 1,
    '@media (max-width:600px)': {
      justifyContent: 'space-between',
    },
  },
  flex1: {
    width: '42%',
  },
  bottomLine: {
    color: 'red',
  },
  dateWrap: {
    height: 'inherit',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    background: '#252427',
    color: '#FFFFFF',
    borderRadius: '0px 20px 20px 0',
    padding: '48px',
    '@media (max-width:600px)': {
      width: 'inherit',
      borderRadius: '0px 0px 20px 20px',
      height: '120px !important',
      padding: '24px',
    },
  },
  showToText: {
    '@media (min-width:601px)': {
      display: 'none',
    },
  },

  userCount: {
    fontSize: '52px',
  },
  flex: {
    display: 'flex',
    marginTop: '8px',
    justifyContent: 'space-between',
    width: '170px',
    '@media (max-width:600px)': {
      width: 'inherit',
    },
  },
  date: {
    width: '130px',
    '@media (max-width:600px)': {
      width: 'inherit',
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  text: {
    marginTop: '10px',
    color: '#5C5A61',
  },
  StaffName: {
    color: '#5C5A61',
  },
  button: { color: '#F8F8F8' },
  upperHeader: {
    background: '#E9E8E8',
    borderRadius: '20px',
    height: '178px',
    padding: '39px 49px',
    marginBottom: '32px',
    '@media (max-width:600px)': {
      padding: '36px 24px !important',
      height: 'auto',
    },
  },
  marginTop: {
    // marginTop: '32px',
  },
  cursor: {
    cursor: 'default',
    '&:not(:last-child)': {
      marginBottom: '32px',
    },
  },
}));
