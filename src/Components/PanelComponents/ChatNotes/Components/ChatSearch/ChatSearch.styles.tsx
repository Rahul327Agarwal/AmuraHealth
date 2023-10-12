import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  searchBox: {
    display: 'flex',
    gap: '10px',
    background: theme.palette.colors.system.white,
    // padding: '5px 20px',
    alignItems: 'center',
    // height: '69px',
    boxSizing: 'border-box',
    '& .MuiOutlinedInput-adornedStart': {
      height: '40px !important',
    },
  },
  backButton: {
    padding: 0,
  },
}));
