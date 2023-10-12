import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((themes) => ({
  headerWrap: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${themes.palette.colors.gray[100]}`,
    padding: '13px 0px',
    boxSizing: 'border-box',
    marginBottom: '0.5px',
    backgroundColor: themes.palette.colors.system.white,
    zIndex: 5,
  },
  sticky: {
    position: 'sticky',
    top: '0px',
  },
  sticky40px: {
    position: 'sticky',
    top: '0px',
  },
  mt: {
    marginTop: '8px',
  },
  medicineBlock: {
    width: '56%',
    boxSizing: 'border-box',
    '&.disabled': {
      opacity: '0.5',
    },
  },
  headerTitle: {
    width: '56%',
    boxSizing: 'border-box',
    color: themes.palette.colors.gray[500],
  },
  tabletBlock: {
    padding: '10px 8px 10px 0px',
  },
  dayBlock: {
    width: '11%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:nth-child(even)': { background: themes.palette.colors.gray[25] },
    '&.colorLight': { color: themes.palette.grey[400] },
    '&.disabled': { color: `${themes.palette.colors.gray[400]}  !important` },
  },
  shiftIcon: {
    width: '11%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  medicineWrap: {
    display: 'flex',
  },
  medicineIcon: {
    width: '24px',
    height: '24px',
    paddingRight: '7px',
  },
  infoWrapper: {
    width: '100%',
  },
  tabletTitle: {
    color: themes.palette.colors.gray[900],
    margin: '0',
  },
  contentWrap: {
    display: 'flex',
    '&.disabled': { opacity: '.6' },
  },
  dflex: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexWrap: {
    '@media (max-width: 435px)': {
      flexDirection: 'column',
    },
  },
  tabletTime: {
    marginRight: '15px',
    width: '90px',
  },
  SubText: {
    marginBottom: 0,
    color: themes.palette.colors.gray[500],
  },
  tags: {
    padding: '4px 8px',
    color: themes.palette.colors.system.white,
    background: themes.palette.colors.gray[500],
    borderRadius: '26px',
    marginRight: '12px',
  },
  orderLink: {
    height: '20px',
    width: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowWrap: {
    height: 'calc(100% - 138px)',
  },
  productsWrap: {
    //for sticky scroll
    // height: "calc(100% - 250px)",
    // overflowY: "auto"
  },
  noResultFound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: '278px',
    margin: '100px auto',
  },
  sorryText: {
    margin: '26px 0 12px',
    color: themes.palette.colors.gray[500],
  },
  sorrySubText: {
    color: themes.palette.colors.gray[400],
  },
}));
