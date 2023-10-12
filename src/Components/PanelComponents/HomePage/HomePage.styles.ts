import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    padding: 16,
    paddingTop: 80,
    overflow: 'auto',
  },
  mainSvg: {
    flex: 'none',
  },
  textWrapper: {
    padding: '16px 20px',
    width: '100%',
    backgroundColor: theme.palette.colors.gray[50],
    borderRadius: 6,
    marginTop: 60,
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      backgroundColor: theme.palette.colors.gray[100],
    },
    transition: 'background-color 0.1s ease-in-out',
  },
  textWrapperDisable: {
    padding: '16px 20px',
    width: '100%',
    backgroundColor: theme.palette.colors.gray[50],
    borderRadius: 6,
    marginTop: 60,
    userSelect: 'none',
    transition: 'background-color 0.1s ease-in-out',
  },
  text: {
    fontWeight: 500,
    wordBreak: 'break-word',
  },
}));
