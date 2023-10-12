import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const historyPrescriptionStyles = makeStyles()((theme) => ({
  widgetStyles: {
    textAlign: 'center',
  },
  prescriptionContainer: {
    display: 'grid',
    color: theme.palette.colors.gray[900],
    fontSize: '14px',
    cursor: 'pointer',
    padding: '6px 0px',
    wordBreak: 'break-word',
    paddingLeft: '12px',
    margin: '10px',
    marginBottom: '15px',
    border: `1px solid ${theme.palette.colors.gray[900]}`,
    gridTemplateColumns: '70% 15% 15%',
    '&:hover': {
      background: theme.palette.colors.gray[50],
    },
  },
  footer1: {
    position: 'absolute',
    right: '13px',
    bottom: '35px',
  },
  addButton: {
    // transform: 'translateY(50%)',
    background: `${theme.palette.colors.gray[900]} !important`,
    '& path': {
      fill: `${theme.palette.colors.system.white} !important`,
    },
  },
  prescriptionList: {
    height: 'calc(100% - 135px)',
    overflow: 'auto',
  },
  historyContainer: {
    height: 'inherit',
    backgroundColor: theme.palette.colors.system.white,
    position: 'relative',
  },
  searchbar: {
    padding: '10px',
  },
  noData: {
    display: 'block',
    width: '50%',
    margin: '70% auto',
    textAlign: 'center',
    color: theme.palette.colors.gray[900],
    wordBreak: 'break-word',
  },
  searchFieldWrap: {
    flexGrow: 1,
    '& .MuiTextField-root': {
      boxSizing: 'border-box',
      justifyContent: 'center',
      display: 'flex',
      background: ` ${theme.palette.colors.gray[25]} !important`,
      height: '54px',
      '& .MuiInputBase-input': {
        background: ` ${theme.palette.colors.gray[25]} !important`,
        color: `${theme.palette.colors.gray[400]} !important`,
        '&:focus-within': {
          background: ` ${theme.palette.colors.gray[25]} !important`,
          color: `${theme.palette.colors.gray[400]} !important`,
        },
        '&:hover': {
          background: ` ${theme.palette.colors.gray[25]} !important`,
          color: `${theme.palette.colors.gray[400]} !important`,
        },
      },
    },
  },
  mainConaitner: {
    display: 'grid',
    backgroundColor: theme.palette.colors.gray[50],
    padding: '16px',
    borderRadius: '6px',
    gridTemplateColumns: '40% 60%',
    margin: '15px 10px',
    cursor: 'pointer',
  },
  selectedConaitner: {
    display: 'grid',
    backgroundColor: theme.palette.colors.gray[25],
    padding: '16px',
    borderRadius: '6px',
    gridTemplateColumns: '40% 60%',
    margin: '15px 10px',
    cursor: 'pointer',
  },
  titleStyle: {
    color: theme.palette.colors.gray[500],
    '&.aligntexts': {
      textAlign: 'end',
    },
  },
}));
