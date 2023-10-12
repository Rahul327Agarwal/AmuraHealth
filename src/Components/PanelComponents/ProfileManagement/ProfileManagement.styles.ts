import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainProfileContainer: {
    background: theme.palette.colors.system.white,
    position: 'relative',
    padding: '20px',
    // margin: "-1rem", // NOTE: storybook only
    // height: "calc(100vh - 40px)", // NOTE: storybook only
    height: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    '& .MuiInputBase-root': {
      '& .MuiInputBase-input': {
        '&.Mui-disabled': {
          color: '#252427 !important',
          '-webkit-text-fill-color': '#252427 !important',
        },
      },
    },
  },
  backButtonStyle: {
    '& .firstContainer svg path': {
      fill: `${theme.palette.colors.theme.primary} !important`,
    },
  },
  warningMessage: {
    color: theme.palette.colors.gray[500],
    padding: '20px 0',
    textAlign: 'center',
  },
  warningFooterStyle: {
    display: 'flex',
    justifyContent: 'center',
    boxShadow: 'unset',
    gap: '20px',
  },
  menuButton: {
    width: '100%',
    borderBottom: `0.5px solid ${theme.palette.colors.gray[100]}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 0',
    boxSizing: 'border-box',
    cursor: 'pointer',
    '& .label': {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      color: theme.palette.colors.red[700],
    },
  },
  pannelFooterStyle: {
    margin: 'auto -20px -20px',
  },
  editBtn: {
    color: '#252427',
    cursor: 'pointer',
  },
  modalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    marginBottom: '10px',
  },
  backArrowIcon: {
    cursor: 'pointer',
    marginRight: '15px',
  },
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 248px)',
  },
}));
