import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    backgroundColor: theme.palette.colors.system.white,
    display: 'flex',
    flexDirection: 'column',
    //padding: '20px',
    height: 'inherit',
  },
  scrollBody: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor: theme.palette.colors.system.white,
  },
  footerStyle: {
    marginTop: 'auto',
    height: '100px',
    boxSizing: 'border-box',
  },
  listStyle: {
    '& > :last-child': {
      marginBottom: '128px',
    },
  },
  groupedByButton: {
    padding: '0',
    height: '20px',
    width: '20px',
    borderRadius: '20px',
    border: `1px solid ${theme.palette.colors.gray[100]}`,
    boxSizing: 'border-box',
    color: theme.palette.colors.gray[500],
    fontSize: '10px !important',
    '&[data-selected="true"]': {
      color: theme.palette.colors.system.white,
      backgroundColor: theme.palette.colors.gray[500],
      border: `1px solid ${theme.palette.colors.gray[500]}`,
    },
  },
  removePadding: {
    padding: '0',
  },
  clearFilterSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    backgroundColor: theme.palette.colors.system.white,
    borderBottom: `1px solid ${theme.palette.colors.gray[50]}`,
  },
  gray500: {
    color: theme.palette.colors.gray[500],
  },
  bgGray: {
    backgroundColor: theme.palette.colors.gray[25],
    borderBottom: 'none',
    padding: '0px 20px',
    marginBottom: '16px',
  },
  mb16: {
    marginBottom: '16px',
  },
  headerStyle: {
    height: '80px',
    padding: '20px !important',
  },
  labelText: {
    color: theme.palette.colors.gray[500],
    lineHeight: '1 !important',
    marginLeft: '8px',
  },
  allCheckboxContainer: {
    width: 'fit-content',
    cursor: 'pointer',
  },
  cheboxDiv: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    height: '46px',
    backgroundColor: theme.palette.colors.gray[25],
    padding: '12px 20px',
  },
  staffcardBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'inherit',
    '& > *': { borderBottom: `1px solid ${theme.palette.colors.system.white}` },
  },
  bottomContainerStyle: {
    color: theme.palette.colors.gray[500],
    fontFamily: 'Graphik !important',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
    fontStyle: 'normal',
    marginLeft:'35px',
    marginTop:'-30px'
  },
}));
