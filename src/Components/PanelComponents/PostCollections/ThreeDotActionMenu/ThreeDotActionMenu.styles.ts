import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  menuStyle: {
    '&.LEVEL-1': {
      marginLeft: '32px',
      marginRight: '20px',
      '&:last-child': {
        marginBottom: '24px',
      },
    },
  },
  titleBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '60px',
    boxSizing: 'border-box',
    '&.clickable': {
      cursor: 'pointer',
    },
    '&.disabled': {
      opacity: '0.7',
      pointerEvents: 'none',
    },
  },
  titleStyle: {
    color: theme.palette.colors.gray[500],
  },
}));
