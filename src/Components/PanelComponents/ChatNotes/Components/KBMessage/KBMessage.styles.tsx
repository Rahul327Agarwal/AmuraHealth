import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  chatMessage: {
    display: 'flex',
    gap: '12px',
    flexDirection: 'column',
    flexGrow: 1,
  },
  readMoreMessage: {
    color: theme.palette.colors.gray[500],
  },
}));
