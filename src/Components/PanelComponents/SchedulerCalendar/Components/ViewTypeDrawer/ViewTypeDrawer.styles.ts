import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  calendarTypebutton: {
    border: `1px solid ${theme.palette.colors.theme.primary}`,
    borderRadius: '20px',
    padding: '8px 12px',
    '& .MuiButton-label': {
      color: theme.palette.colors.gray[500],
    },
  },
  menuWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    justifyContent: 'space-between',
    padding: '14px 0px',
    borderBottom: `0.5px solid ${theme.palette.colors.gray[100]}`,
    '&:last-child': { borderBottom: 'none' },
    '& > span': {
      color: theme.palette.colors.gray[500],
    },
    '&[data-selected="true"] > span': {
      color: theme.palette.colors.theme.primary,
      '& rect, & line': { stroke: `${theme.palette.colors.theme.primary} !important` },
    },
  },

  headerIcon: {
    '& rect, & line': { stroke: `${theme.palette.colors.theme.primary} !important` },
  },
}));
