import { makeStyles } from 'tss-react/mui';
export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    position: 'relative',
    height: 'inherit',
    backgroundColor: theme.palette.colors.gray[50],
    boxSizing: 'border-box',
  },
  searchBox: {
    display: 'flex',
    gap: '10px',
    background: theme.palette.colors.system.white,
    padding: '5px 20px',
    alignItems: 'center',
    height: '48px',
    boxSizing: 'border-box',
    '& .MuiOutlinedInput-adornedStart': {
      height: '40px !important',
    },
  },
  backButton: {
    padding: 0,
  },
  myListHeader: {
    background: '#E9E8E8',
    padding: ' 8px 20px',
    borderRadius: ' 8px 8px 0px 0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIcon: {
    cursor: 'pointer',
  },
  bgColor: {
    backgroundColor: theme.palette.colors.gray[50],
  },
  headerText: {
    display: 'flex',
    alignItems: 'center',
    gap: '11px',
  },
  subHeader: {
    padding: '8px 20px',
    background: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '48px',
  },
  nameChardWrapper: {},
  addButton: {
    position: 'absolute',
    right: '20px',
    bottom: '60px',
    transform: 'translateY(50%)',
    background: `${theme.palette.colors.gray[900]} !important`,
    '& path': {
      fill: `${theme.palette.colors.system.white} !important`,
    },
  },
  addmargin: {
    marginBottom: '16px',
  },
  disabledButton: {
    position: 'absolute',
    right: '20px',
    bottom: '60px',
    transform: 'translateY(50%)',
    background: `${theme.palette.colors.gray[400]} !important`,
    '& path': {
      fill: `${theme.palette.colors.system.white} !important`,
    },
  },
  listStyle: {
    '& > :last-child': {
      marginBottom: '128px',
    },
  },

  eventDateTimeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    color: theme.palette.colors.gray[500],
    textTransform: 'uppercase',
  },
  eventSchedule: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  loaderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
}));
