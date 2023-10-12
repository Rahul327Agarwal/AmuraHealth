import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme, data: any) => ({
  mainContainer: {
    padding: '0 8px',
    marginBottom: '16px',
    borderRadius: '8px',
    borderBottom: `1px solid ${
      data?.isActive === 0 ? '#F8F8F8' : data.privacy === '@me' ? '#E1E1E1' : data.privacy == '@team' ? '#F1F1F1' : '#F8F8F8'
    }`,
    background:
      data?.isActive === 0 ? '#F8F8F8' : data.privacy === '@me' ? '#E1E1E1' : data.privacy == '@team' ? '#F1F1F1' : '#F8F8F8',
  },
  header: {
    color: '#252427',
    marginBottom: '23px',
    marginRight: '0',
    cursor: 'pointer',
  },
  noHistoryColor: {
    color: '#5C5A61',
  },
  nothingToShow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column',
    gap: '20px',
  },
  historyCard: {
    marginTop: '8px',
    borderRadius: '6px',
  },
  carddiv: {
    padding: '0 16px',
    margin: '0 -1rem',
  },
  cursorPointer: {
    cursor: 'pointer',
    "&[data-sticky='true']": {
      position: 'sticky',
      top: '0px',
      zIndex: '100',
      '& [data-notecard]': {
        // border: '1px solid pink',
        marginLeft: '-8px',
        marginRight: '-8px',
        paddingLeft: 24,
        paddingRight: 24,
      },
    },
  },
  maincarddiv: {
    padding: '10px',
    margin: '0 -1rem',
  },
  pdiv: {
    color: '#A6A6A6',
    marginTop: '28px',
    marginBottom: '16px',
  },
  footerStyle: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    marginBottom: '32px',
  },
  CancelButton: {
    color: '#252427',
  },
  ConfirmButton: {
    height: '44px',
    width: '107px',
    radius: '6px',
    padding: '12px 24px 12px 24px',
  },
  inputStyle: {
    fontSize: '17px !important',
    marginBottom: '32px',
  },
  drawerBody: {
    // height: '166px',
  },
}));
