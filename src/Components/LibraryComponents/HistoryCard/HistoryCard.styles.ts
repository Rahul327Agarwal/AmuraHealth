import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  cardWrap: {
    background: theme.palette.colors.gray[50],
    padding: '24px 20px',
    position: 'relative',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  imgWrap: {
    background: '#626262',
    height: '32px',
    width: '32px',
    border: '0.5px solid #E1E1E1',
    borderRadius: '50%',
    position: 'relative',
    marginRight: '4px',
    backgroundColor: theme.palette.colors.gray[900],
  },
  profilePic: {
    borderRadius: '50%',
    height: '32px',
    width: '32px',
    color: '#FFFFFF',
    position: 'relative',
    fontSize: '12px',
    fontFamily: 'Graphik',
    fontWeight: 400,
    backgroundColor: theme.palette.colors.gray[900],
  },

  cardCaption: {
    color: theme.palette.colors.gray[500],
    display: 'block',
    marginBottom: '12px',
  },
  strikeText: {
    textDecoration: 'line-through',
    color: theme.palette.colors.gray[500],
    marginBottom: '8px',
    wordBreak: 'break-word',
  },
  margin8px: {
    marginRight: '8px',
  },
  currentText: {
    color: theme.palette.colors.gray[500],
    marginBottom: '16px',
    wordBreak: 'break-word',
  },
  footerWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dflex: {
    display: 'grid',
    gridTemplateColumns: '32px calc(100% - 44px)',
    gap: '12px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0px',
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: theme.palette.colors.gray[400],
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  updateTime: {
    color: theme.palette.colors.gray[400],
  },
  flex1: {
    flex: 1,
  },
  updatedBy: {
    color: theme.palette.colors.gray[400],
    wordBreak: 'break-word',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  avatar: {
    height: '32px',
    width: '32px',
    borderRadius: '50%',
    color: theme.palette.colors.system.white,
    backgroundColor: theme.palette.colors.gray[900],
    fontSize: '10px',
    fontWeight: 600,
    fontFamily: 'Graphik',
  },
  userClass: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 0',
  },
  userDetailsDiv: {
    display: 'grid',
    gridTemplateColumns: '60% 40%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
  },
}));
