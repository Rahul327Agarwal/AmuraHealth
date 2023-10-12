import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  drawerBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  userDetails: {
    display: 'grid',
    gridTemplateColumns: '52% 48%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
  },
  discriptionData: {
    color: theme.palette.colors.gray[500],
    wordBreak: 'break-word',
    maxHeight: '270px',
    overflow: 'auto',
  },
  userName: {
    color: theme.palette.colors.gray[500],
    wordBreak: 'break-word',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  userDate: {
    color: theme.palette.colors.gray[400],
    wordBreak: 'break-word',
  },
  userNameWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  avatar: {
    borderRadius: '50%',
    height: '24px',
    width: '24px',
    color: theme.palette.colors.system.white,
    backgroundColor: theme.palette.colors.gray[900],
    fontSize: '10px',
    fontWeight: 600,
    fontFamily: 'Graphik',
  },
  loaderWrapper:{
    display:'flex',
    justifyContent:'space-between'
  }
}));
