import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  uploadbtn: {
    fontSize: '12px',
    color: '#5C5A61',
    width: '73px',
    marginRight: '16px',
  },

  pdfDiv: {
    width: '42px',
    height: '42px',
    aspectRatio: '4/3',
    overflow: 'hidden',
    borderRadius: '8px',
    objectFit: 'cover',
    '& .react-pdf__Page': {
      width: '100%',
      height: '100%',
      minWidth: 'unset !important',
      minHeight: 'unset !important',
      '& .react-pdf__Page__canvas': {
        width: '100% !important',
        height: '100% !important',
        overflow: 'hidden',
        objectFit:'cover'
      },
      '& .react-pdf__Page__annotations ': {
        display: 'none',
      },
    },
  },

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
  },
  flexrow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#F8F8F8',
    paddingRight: '8px',
    '& label': {
      outline: 'none !important',
    },
  },
  initialstyle: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    background: '#F8F8F8',
    borderRadius: '8px',
    // width: '124px',
    // height: '74px',
    '& label': {
      outline: 'none !important',
    },
  },
  muiDrawerStyle: {
    '& .drawer-container-header': {
      marginBottom: '0px !important',
    },
    cursor: 'pointer',
  },
  container: {
    position: 'relative',
    color: 'white',
    cursor: 'pointer',
    overflow: 'hidden',
    borderRadius: '8px',
    width: '42px',
    height: '42px',
  },
  middle: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    translate: '-50% -50%',
    zIndex: '1 !important',
    '& svg': {
      display: 'flex',
      verticalAlign: 'baseline',
    },
  },
  loader: {
    color: '#000000',
    width: '16px !important',
    height: '16px !important',
    marginLeft: '8px',
    marginRight: '8px',
  },
  imagediv: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    padding: '10px 0px 10px 10px',
  },
  flexcolumn: {
    // '& .MuiIconButton-root': {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    width: '100%',
    height: '74px',
    // },
    '& h1': {
      margin: '0px',
      width: '100%',
    },
  },
  directionRow: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
}));
