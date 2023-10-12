import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    position: 'relative',
    height: 'inherit',
    backgroundColor: theme.palette.colors.system.white,
    display: 'flex',
    flexDirection: 'column',
  },
  scrolldiv: {
    overflowY: 'auto',
    height: 'inherit',
    backgroundColor: theme.palette.colors.system.white,
  },
  previewHeader: {
    display: 'flex',
    gap: '20px',
    // alignItems: "center",
    // gridAutoFlow: "column",
    justifyContent: 'space-between',
    padding: '32px 20px 0',
  },
  previewScrollBody: {
    gap: '24px',
    display: 'flex',
    padding: '24px 20px 128px',
    // overflow: "auto",
    flexGrow: 1,
    flexDirection: 'column',
  },
  headerText: {
    color: theme.palette.colors.theme.primary,
    wordBreak: 'break-word',
    marginTop: '6px',
  },
  noDataBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '24px',
  },
  headerTextGray: {
    color: theme.palette.colors.gray[500],
  },
  addButton: {
    position: 'absolute',
    right: '20px',
    bottom: '60px',
    transform: 'translateY(50%)',
    background: `${theme.palette.colors.gray[900]} !important`,
    '& path': {
      fill: `${theme.palette.colors.system.white} !important`,
    },
  },
  disabledButton: {
    position: 'absolute',
    right: '20px',
    bottom: '60px',
    transform: 'translateY(50%)',
    background: `${theme.palette.colors.gray[400]} !important`,
    '& path': {
      fill: `${theme.palette.colors.system.white} !important`,
    },
  },
  cardIconsStyle: {
    padding: '0 !important',
  },
  actionModalStyle: {
    padding: '24px 20px',
    width: '280px',
  },
  previewButton: {
    background: theme.palette.colors.theme.primaryLight,
    color: theme.palette.colors.gray[25],
    boxShadow: ' 0px 4px 14px 0px #00000040',
    borderRadius: '6px',
    padding: '4px 13px',
    cursor: 'pointer',
    height: '28px',
  },
}));
