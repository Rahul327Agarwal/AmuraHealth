import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  rootRelativeContainer: {
    height: 'inherit',
    position: 'relative',
  },
  rootContainer: {
    height: 'inherit',
    backgroundColor: theme.palette.colors.system.white,
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
  overlapDrawerContainer: {
    height: 'inherit',
    backgroundColor: theme.palette.colors.system.white,
    display: 'flex',
    flexDirection: 'column',
    gap: '31px',
    padding: '20px',
  },

  overlapDrawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1050,
    height: 'inherit',
    '& .MuiDrawer-paper': {
      width: '100%',
      position: 'initial',
      borderRadius: '8px',
      background: 'transparent !important',
    },
  },
  scrollBody: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '31px',
    overflowY: 'auto',
    overflowX: 'hidden',
    margin: '0 -20px',
    padding: '20px',
  },
  secondryText: {
    color: theme.palette.colors.gray[500],
  },
  gray400: {
    color: theme.palette.colors.gray[400],
  },
  biomarkersWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  orLabel: {
    textAlign: 'center',
    color: theme.palette.colors.gray[400],
  },
  bigGrayButton: {
    wordBreak: 'break-word',
    padding: '16px',
    color: theme.palette.colors.theme.primaryLight,
    backgroundColor: `${theme.palette.colors.gray[50]} !important`,
    borderRadius: '4px',
    fontSize: '15px !important',
    '& .MuiIconButton-label': {
      fontSize: 'inherit',
    },
  },
  fullWidth: {
    width: '100%',
  },
  reportdiv: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  attachmentWrapper: {
    display: 'grid',
    gridAutoFlow: 'column',
    alignItems: 'center',
    gridAutoColumns: '90% 10%',
    '& svg': {
      cursor: 'pointer',
      stroke: theme.palette.colors.gray[500],
      width: 20,
      height: 20,
    },
  },
  modalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    marginBottom: '10px',
  },
  footerStyle: {
    backgroundColor: theme.palette.colors.system.white,
    boxShadow: '0px 14px 74px rgba(0, 0, 0, 0.15)',
    padding: '32px 20px',
    margin: 'auto -20px -20px',
  },
  inputWrapperBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '31px',
    marginLeft: '34px',
  },
  saveButtonWrapper: {
    padding: '20px 0',
    display: 'grid',
    gridTemplateColumns: '25% 1fr',
    gap: '28px',

    '.MuiButton-root.MuiButton-contained.Mui-disabled': {
      color: `${theme.palette.colors.gray[400]} !important`,
      background: `${theme.palette.colors.gray[25]} !important`,
    },
  },
  mb: {
    marginBottom: '31px !important',
  },
  addAnotherStyle: {
    padding: '0 5px',
  },
  loaderWhite: {
    color: `${theme.palette.colors.system.white} !important`,
  },
}));
