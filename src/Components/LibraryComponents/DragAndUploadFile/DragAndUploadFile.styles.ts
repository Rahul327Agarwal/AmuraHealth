import { makeStyles } from 'tss-react/mui';
export const useStyles = makeStyles()((theme) => ({
  dragDropContainer: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    padding: '0 20px 40px',
  },
  label: {
    textAlign: 'left',
    width: '100%',
    marginLeft: '0px 3px',
    fontSize: '0.875rem',
  },

  mainContainer: {
    background: '#1B1B1B',
    borderRadius: '10px 10px 0px 0px',
    width: '100%',
  },
  iconText: {
    // fontFamily: "Inter",
    fontSize: '14px',
    color: '#fff',
  },
  dragAndDrop: {
    '& > label': {
      width: '100%',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '25px',
    padding: '40px 20px',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
  icons: {
    display: 'inherit',
  },
  filePreview: {
    paddingBottom: '10px',
  },
  previewBox: {
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  pictureIcon: {},
  imageName: {
    color: '#fff',
    overflow: 'hidden',
    overflowWrap: 'break-word',
  },
  iconEnd: {
    display: 'inherit',
    marginLeft: 'auto',
    color: '#fff',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
  },
  loaderDiv: {
    position: 'relative',
    display: 'flex',
    '& .MuiCircularProgress-colorPrimary': {
      color: '#00FFCC !important',
      width: '32px !important',
      height: '32px !important',
    },
  },
  progressLabel: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    fontSize: '8px',
    color: '#FFFFFF',
    transform: 'translate(-50%, -50%)',
  },
}));
