import { makeStyles } from 'tss-react/mui';
import { IProps } from './BrowseRole.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  container: {
    backgroundColor: theme.palette.colors.system.white,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '20px',
    height: 'inherit',
    position: 'relative',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  browseRole: {
    cursor: 'pointer',
    borderBottom: ' 1px solid #E1E1E1',
    // margin: '0 -1rem 32px -1rem',
    margin: '0 4px 32px',
    padding: '20px',
    '&:last-child': {
      // padding: '0 16px 120px 16px !important',
      borderBottom: 'none !important',
    },
    background: theme.palette.colors.gray[50],
    borderRadius: '16px',
  },
  opacity50: {
    opacity: 0.5,
  },
  threeDot: {
    '& .MuiIconButton-label': {
      '& svg': {
        '& path': {
          fill: '#252427 !important',
        },
      },
    },
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
  shiftSegmentHeader: {
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
  footerDiv: {
    position: 'relative',
    zIndex: 1,
    // height: "56px",
    // background: "#1B1B1B",
    // marginTop: "auto",
  },
  addButtonWrapper: {
    position: 'absolute',
    right: '20px',
    bottom: '0',
    transform: 'translateY(50%)',
    borderRadius: '50%',
    padding: '10px',
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
  allowStatusContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  allowLabel: {
    color: theme.palette.colors.gray[500],
  },
  mrt: {
    marginRight: '24px',
    marginTop: '4px',
  },
  labelText: {
    color: theme.palette.colors.gray[900],
  },
}));
