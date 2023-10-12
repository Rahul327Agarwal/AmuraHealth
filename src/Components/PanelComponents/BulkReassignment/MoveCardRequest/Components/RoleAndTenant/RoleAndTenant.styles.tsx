import { makeStyles } from 'tss-react/mui';
export const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  headerSection: {
    display: 'grid',
    gap: '10px',
    gridAutoFlow: 'column',
    alignItems: 'center',
    gridTemplateColumns: '1fr auto',
    boxSizing: 'border-box',
    paddingRight: '20px',
    height: '40px',
    '&[data-tenant]': {
      background: theme.palette.colors.gray[25],
      padding: '0 20px',
      margin: '0 -20px',
      paddingRight: '40px',
    },
  },
  menuListStyle: {
    transition: '.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '8px',
    cursor: 'pointer',
  },
  muiselectStyle: {
    '& .MuiInputBase-root': {
      marginTop: '0 !important',
    },
  },
  checkboxStyle: {
    justifySelf: 'self-end',
  },
  tenantSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  tenantBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  tenantTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: theme.palette.colors.gray[500],
  },
  staffBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  labelText: {
    color: theme.palette.colors.gray[500],
    lineHeight: '1 !important',
  },
  primaryText: {
    color: theme.palette.colors.gray[900],
  },
  secondryText: {
    color: theme.palette.colors.gray[500],
  },
  dflex: {
    display: 'flex',
    alignItems: 'center',
  },
}));
