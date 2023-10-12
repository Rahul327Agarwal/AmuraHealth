import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  panel: {
    background: theme.palette.colors.system.white,
    height: 'inherit',
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    margin: '0px 8px',
    flex: '1',
    overflowY: 'auto',
  },
  footerButton: {
    padding: '12px 17px',
  },

  ///////////////
  addButtonDisabled: {
    display: 'grid',
    placeItems: 'center',
    height: '58px',
    width: '58px',
    borderRadius: '50%',
    background: '#A6A6A6',
    border: 'none',
    boxShadow: '0px 1px 7px -1px #212529',
    cursor: 'pointer',
    '& path': {
      fill: '#FFFFFF !important',
    },
  },
  container: {
    backgroundColor: theme.palette.colors.system.white,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '20px',
    height: 'inherit',
    position: 'relative',
    // overflowY:"auto",
    // overflowX:"hidden",
  },
  browseRole: {
    // borderBottom:" 1px solid #E1E1E1",
    // margin: "0 -1rem 32px -1rem",
    // padding: "0 16px 16px 16px",
  },
  modalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    marginBottom: '10px',
  },
  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  headerTitle: {
    color: '#252427',
    marginBottom: '2px',
    display: 'block',
  },
  headerSubTitle: {
    color: '#5C5A61',
    display: 'block',
  },
  reportee: {
    marginBottom: '16px',
    display: 'block',
  },
  dflex: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '16px',
    flexWrap: 'wrap',
  },
  positionabsolute: {
    position: 'absolute',
  },
  footerDiv: {
    position: 'absolute',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'end',
    right: '20px',
    bottom: '30px',
    // height: "56px",
    // background: "#1B1B1B",
    // marginTop: "auto",
  },
  headerStyle: {
    // height: "60px",
    boxSizing: 'border-box',
    // padding: "20px !important",
  },
  scrollBody: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '0 16px',
    margin: '0 -1rem',
    // '&:last-child': { marginBottom: '120px !important' },
  },
  noDataCon: {
    color: '#A6A6A6',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButtonWrapper: {
    // position: "absolute",
    // right: "20px",
    // bottom: "0",
    // transform: "translateY(50%)",
    // borderRadius: "50%",
    // padding: "10px",
    // background: "#3F4044",
  },
  addButton: {
    background: '#252427',
    display: 'grid',
    placeItems: 'center',
    height: '58px',
    width: '58px',
    borderRadius: '50%',
    border: 'none',
    boxShadow: '0px 1px 7px -1px #212529',
    cursor: 'pointer',
    '& path': {
      fill: '#FFFFFF !important',
    },
  },
}));
