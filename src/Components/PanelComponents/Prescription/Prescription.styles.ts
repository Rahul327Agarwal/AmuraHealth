import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  rootContainer: {
    backgroundColor: theme.palette.colors.system.white,
    height: 'inherit', // for testing only
    padding: '1rem 0px',
    // display: "flex",
    // flexDirection: "column",
    position: 'relative',
  },
  padding1Rem: {
    padding: '0px 16px',
  },
  mainWrapper: {
    //for sticky scroll
    // height: "calc(100vh - 200px)".
    overflowY: 'auto',
    maxHeight: 'calc(100% - 68px)',
    // overflowX:"hidden",
    '& ::-webkit-scrollbar-thumb': {
      opacity: '0',
    },
    '&:hover ::-webkit-scrollbar-thumb': {
      opacity: '0',
    },
  },
  mainWrapperWhenStarted: {
    //for sticky scroll
    // height: "calc(100vh - 200px)".
    overflowY: 'auto',
    maxHeight: 'calc(100% - 68px)',
    // overflowX:"hidden",
    '& ::-webkit-scrollbar-thumb': {
      opacity: '0',
    },
    '&:hover ::-webkit-scrollbar-thumb': {
      opacity: '0',
    },
  },
  mainHeaderMaxHeight: {
    maxHeight: 'calc(100% - 164px)',
  },
  mainHeaderMaxHeightWithOutBtn: {
    maxHeight: 'calc(100% - 64px)',
  },
  header: {
    position: 'relative',
  },
  iconStyles: {
    '& path': {
      fill: theme.palette.colors.gray[900],
    },
  },
  medicineContent: {
    //for sticky scroll
    // position: "sticky",
    // top: "0",
    // height: "calc(100vh - 200px )",
  },
  btnHeight: {
    height: '44px',
  },
  filterWraper: {
    display: 'grid',
    gridAutoColumns: '47% 47%',
    gridAutoFlow: 'column',
    rowGap: '20px',
    justifyContent: 'space-between',
    margin: '30px 0',
    alignItems: 'self-end',
    backgroundColor: theme.palette.colors.system.white,
  },
  clearButton: {
    gridColumn: '1',
    gridRow: '2',
    maxWidth: 'fit-content',
    padding: '5px 0',
  },
  prescriptionWarning: {
    color: theme.palette.grey[500],
    textAlign: 'center',
    marginBottom: '20px',
  },
  prescriptionFooter: {
    gap: '10px',
    boxShadow: 'none',
    justifyContent: 'center',
    display: 'grid',
    gridTemplateColumns: '100px 100px',
    alignItems: 'stretch',
    background: 'transparent !important',
  },
  startPrescriptionBtn: {
    background: '#FFFFFF',
    display: 'flex',
    alignItems: 'flex-end',
    position: 'absolute',
    left: '0',
    right: '0',
    padding: '20px',
    bottom: '0',
  },
  //chetan
  summaryPanel: {
    padding: '8px 20px',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: '10px',
    background: theme.palette.colors.gray[25],
  },
  summaryTitle: {
    color: theme.palette.colors.theme.primary,
  },
  summaryDescription: {
    color: theme.palette.colors.gray[500],
  },
  subHeader: {
    color: theme.palette.colors.gray[500],
    margin: 'auto 0px',
  },
  //chetan
  hidden: {
    display: 'none',
  },
  colorstyle: {
    color: '#252427!important',
    '& span': {
      color: '#252427!important',
    },
  },
  inject: {
    '& path': {
      fill: '#5C5A61 !important',
    },
  },
  positionSticky: {
    position: 'sticky',
    top: '0px',
  },
  backArrowMargin: {
    marginRight: '8px',
    cursor: 'pointer',
  },
}));
