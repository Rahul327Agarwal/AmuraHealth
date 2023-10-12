import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  rootContainer: {
    backgroundColor: theme.palette.colors.system.white,
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
  },
  scrollBody: {
    flexGrow: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    margin: '0 -1rem',
    padding: '16px',
  },
  footerStyle: {
    marginTop: 'auto',
    padding: '20px',
    margin: '0 -1rem -1rem',
  },

  criteriaWrapper: {
    background: '#F8F8F8',
    padding: '20px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    marginBottom: '25px',
    borderRadius: '8px',
  },
  addText: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    margin: '0 0 18px 0px',
    cursor: 'pointer',
    color: '#252427',
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& svg': {
      display: 'block',
    },
  },
  dropdowndiv: {
    width: '60px',
    position: 'relative',
    '& label + .MuiInput-formControl': {
      marginTop: '0px !important',
    },
    '& .MuiInput-underline': {
      '&:before': {
        borderBottom: '0px !important',
      },
      '&:after': {
        borderBottom: '0px !important',
      },
    },
  },
  subTitle: {
    color: '#5C5A61',
  },
  endIcons: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  closeIcons: {
    cursor: 'pointer',
  },
  headerStyle: {
    marginBottom: '20px',
  },
}));
