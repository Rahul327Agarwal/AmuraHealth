import { makeStyles } from 'tss-react/mui';
export const useStyles = makeStyles()((theme) => ({
  rootContainer: {
    height: 'inherit',
    position: 'relative',
    display: 'flex',
    backgroundColor: theme.palette.colors.system.white,
    // borderRadius: '8px',
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    padding:'20px'
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    gap: '32px',
    margin: '75px 75px 0px 75px',
   
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  headerStyle: {
    color: theme.palette.colors.gray[900],
  },
  subHeaderStyle: {
    color: theme.palette.colors.gray[500],
  },
  btnStyle: {
    background: '#373639',
    color: '#FFFFFF',
    padding: '12px 24px',
    borderRadius: '6px',
    height: '44px',
    '&:hover': {
      background: '#373639',
      color: '#FFFFFF',
    },
  },
}));
