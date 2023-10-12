import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    marginBottom: '35px',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: '10px',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  iconButton: {
    width: '58px',
    height: '58px',
    padding: '0',
    borderRadius: '8px',
    boxSizing: 'border-box',
    background: theme.palette.colors.gray[50],
    transition: 'background .3s ease',
    '& path': { transition: 'fill .3s ease' },
    '&:hover': {
      background: theme.palette.colors.theme.primary,
      '& path': { fill: theme.palette.colors.system.white },
    },
    '&:hover + span': { color: theme.palette.colors.gray[900] },
  },
  iconText: {
    transition: 'color .3s ease',
    color: theme.palette.colors.gray[400],
  },
}));
