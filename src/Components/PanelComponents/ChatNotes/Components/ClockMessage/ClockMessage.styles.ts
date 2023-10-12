import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  grayText: {
    color: theme.palette.colors.gray[400],
  },
}));
