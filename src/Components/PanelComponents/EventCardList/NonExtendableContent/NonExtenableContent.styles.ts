import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  eventDateTimeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    color: theme.palette.colors.gray[500],
    textTransform: 'uppercase',
  },
  eventSchedule: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
}));
