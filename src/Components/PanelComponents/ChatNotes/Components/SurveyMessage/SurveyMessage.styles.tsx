import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.colors.gray[25], //F8F8F8
    borderRadius: '8px',
    padding: '24px 16px',
    wordBreak: 'break-word',
  },
  container: {
    margin: '0px 15px',
  },
  container2: {
    marginBottom: '40px',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  headerTitle: {
    color: theme.palette.colors.gray[500], //5C5A61
  },
  questionStyle: {
    color: theme.palette.colors.gray[900], //252427
  },
  iconStyle: {
    marginRight: '12px',
  },
  marginB24: {
    marginBottom: '24px',
  },
  marginB20: {
    marginBottom: '20px',
  },
  leftMessageTimeText: {
    margin: '8px 0px 15px 0px',
    color: theme.palette.colors.gray[400],
  },
  bodyContainer: {
    paddingLeft: '40px',
    display: 'flex',
    flexDirection: 'column',
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'end',
  },
  statusCon: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    gap: '8px',
  },
  reDoStyle: {
    padding: '0 !important',
  },
  messageSent: {
    color: '#5C5A61',
  },
  downArrow:{
    fill:"#5C5A61",
    position: 'absolute',
    top: 0,
    right: 0,
  },
  downArrowBG:{
    position: 'absolute',
    width: '25px',
    top: 0,
    right: 0,
    height: '25px',
    background: theme.palette.colors.gray[25],
    filter: 'blur(5px)',
    '&.bgDarkRight': {
      background: ' #E1E1E1',
    },
    '&.Right': {
      background: theme.palette.colors.gray[50],
    },
    '&.switchBgRight': {
      background: theme.palette.colors.gray[25],
    },
    '&.bgTeamRight': {
      background: theme.palette.colors.gray[50],
    },
    '&.Left': {
      background: theme.palette.colors.gray[25],
    },
    '&.switchBgLeft': {
      background: theme.palette.colors.gray[50],
    },
  },
  downArrowWrapper:{
    position: 'relative',
    float: 'right',
    left: '10px',
    zIndex: 100,
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
