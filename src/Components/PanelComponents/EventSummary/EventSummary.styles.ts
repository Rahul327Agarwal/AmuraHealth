import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<any>()((theme) => ({
  mainContainer: {
    background: theme.palette.colors.system.white,
    height: `100%`,
    // padding: '0 20px',
    position: 'relative',
  },

}));
