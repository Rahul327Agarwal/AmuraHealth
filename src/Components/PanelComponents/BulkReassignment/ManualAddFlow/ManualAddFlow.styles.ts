import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  container: {
    position: 'relative',
    height: 'inherit',
    boxSizing: 'border-box',
    background: theme.palette.colors.system.white,
    // padding:"1rem", //testing
  },
  teamWrapper: {
    padding: '1rem',
    height: 'calc(100% - 210px)',
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    paddingBottom: '70px',
  },
  staffWrapper: {},
  dFlex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dFlexEnd: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
  },
  mainTitle: {
    padding: '8px 20px',
    display: 'flex',
    alignItems: 'center',
  },
  mainTitleNew: {
    padding: '25px 20px 20px 20px',
    display: 'grid',
    gridTemplateColumns: '94% 6%',
  },
  crossIconAlign: {
    alignSelf: 'flex-end',
    display: 'block',
    cursor: 'pointer',
  },
  labelOption: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
  },
  mb2: {
    marginBottom: '16px',
    display: 'block',
  },
  mt2: {
    marginTop: '30px',
  },
  addButtonWrapper: {
    position: 'absolute',
    right: '20px',
    bottom: '56px',
    transform: 'translateY(50%)',
    borderRadius: '50%',
    padding: '10px',
    background: `${theme.palette.colors.gray[900]}`,
  },
  addButton: {
    background: `${theme.palette.colors.gray[900]}`,
    display: 'grid',
    placeItems: 'center',
    height: '50px',
    width: '50px',
    borderRadius: '50%',
    border: 'none',
    // boxShadow: "0px 1px 7px -1px #212529",
    cursor: 'pointer',
    '& path': {
      fill: `${theme.palette.colors.system.white} !important`,
    },
  },
  footerDiv: {
    zIndex: 1,
    height: '56px',
    // background: "#1B1B1B",
    marginTop: 'auto',
  },

  //Select Role
  roleContainer: {
    position: 'relative',
    height: '100%',
    boxSizing: 'border-box',
    background: theme.palette.colors.system.white,
    display: 'flex',
    flexDirection: 'column',
    // overflowY:"auto",
    // overflowX:"hidden",
  },
  radioWrapper: {
    padding: '1rem',
    flex: '1',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  selectTitle: {
    padding: '1rem 1rem 0 1rem',
    marginBottom: '30px',
    display: 'block',
  },
  positionRevert: {
    position: 'unset !important' as any,
  },
  selectFooter: {
    width: '100%',
    padding: '20px',
  },
  //Assignment
  assignWrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    background: theme.palette.colors.system.white,
    height: 'inherit',
  },
  assignContainer: {
    background: theme.palette.colors.system.white,
    boxShadow: '0px 10px 10px 0px #0000000d',
    borderBottomLeftRadius: '25px',
    borderBottomRightRadius: '25px',
    padding: '1rem',
  },
  languageCard: {
    padding: '1rem',
  },
  middleContainer: {
    height: 'calc(100vh - 225px)',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  footerButtons: {},
  footerStyle: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    padding: '1rem',
  },

  modalBody: {},
  conformText: {
    color: theme.palette.colors.gray[500],
  },
  noResultsDiv: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textAlign: {
    textAlign: 'center',
  },
  topMargin: {
    marginTop: '24px',
  },
  inject: {
    '& path': {
      fill: '#5C5A61 !important',
    },
  },
  searchMatch: {
    margin: '8px 20px',
    backgroundColor: theme.palette.colors.gray[25],
  },
}));
//background: theme.palette.colors.theme.primaryLight,
