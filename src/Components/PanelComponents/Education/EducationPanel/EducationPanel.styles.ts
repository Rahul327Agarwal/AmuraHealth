import { makeStyles } from 'tss-react/mui';
import { IProps } from './EducationPanel.types';
export const useStyles = makeStyles<IProps>()((theme) => ({
  backButton: {
    cursor: 'pointer',
    marginRight: '14px',
    '& path': {
      fill: theme.palette.colors.theme.primary,
    },
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
  scrollBody: {
    flexGrow: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    margin: '0 -20px',
    padding: '10px 20px',
  },
  addButton: {
    position: 'absolute',
    height: '58px',
    width: '58px',
    right: '20px',
    bottom: '56px',
    transform: 'translateY(50%)',
    background: `${theme.palette.colors.gray[900]} !important`,
    '& path': {
      fill: `${theme.palette.colors.system.white} !important`,
    },
  },
}));
