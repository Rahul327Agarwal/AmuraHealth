import { makeStyles } from 'tss-react/mui';
export const useStyles = makeStyles()((theme) => ({
  wrapper: {
    width: '100%',
    padding: '35px 22px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px 0 16px 0',
    minHeight: '40px',
  },
  crossIcon: {
    cursor: 'pointer',
  },
  root: {
    borderRadius: '0px',
    border: 'none',
    width: '100%',
    color: '#fff',
  },
  label: {
    textAlign: 'left' as const,
    width: '100%',
    marginLeft: '0px 3px',
    fontSize: '0.875rem',
  },
  sendDisable: {
    color: '#4B4E50',
  },
  sendIcon: {
    color: 'rgb(0, 255, 194)',
    width: '26px',
    height: '26px',
    margin: 'auto 12px',
  },
  previewFile: {
    background: '#C4C4C4',
    borderRadius: '5px',
    height: '500px',
    padding: '10px',
  },
  fileName: {
    fontSize: '14px',
    lineHeight: '116.52%',
    // color: theme.palette.systemText.body,
    padding: '5px 15px',
    wordBreak: 'break-all',
  },
  uploadFiles: { display: 'flex', color: '#FFF', margin: '10px 0px' },
  cancelIconStyle: {
    // border: '1px solid ' + theme.palette.systemText.body,
    borderRadius: '4px',
    background: 'rgba(255,255,255,0.12)',
    textDecoration: 'none' as const,
    textTransform: 'none' as const,
    marginRight: '5px',
    color: '#fff',
    '&:hover': {
      color: '#000',
    },
  },
  previewBottom: {
    minHeight: '47px',
    minWidth: '47px',
    borderRadius: '3px',
    margin: '7px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    color: 'white',
    fill: 'white',
    // background: theme.palette.system.bg,
  },
  spanCenter: {
    display: 'block',
    margin: 'auto',
    cursor: 'pointer',
  },
  grid: {
    display: 'flex',
    // gridTemplateColumns: "25% 25% 25% 25%",
    padding: '20px 0 10px 0px',
    justifyContent: 'space-between',
  },
  uploadedLabel: { width: '100%' },
  typesOfFiles: {
    //fontfamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '116.52%',
    textAlign: 'center',
    color: '#A6A6A6',
  },
  MuiDropzoneArearoot: {
    color: '#252427 !important',
    boxSizing: 'border-box',
    background: '#fff !important',
    border: 'none !important',
    borderRadius: '4px !important',
    boxShadow: 'none !important',
    minHeight: '0 !important',
    '&:focus': {
      outline: 'none !important',
    },
    padding: '10px',
    '& svg': {
      '& path': {
        fill: '252427 !important',
      },
    },
  },
  svgIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '58px',
    height: '58px',
    padding: '0',
    borderRadius: '8px',
    boxSizing: 'border-box',
    background: theme.palette.colors.gray[50],
    marginBottom: '16px',
    transition: 'background .3s ease',
    '& path': { transition: 'fill .3s ease' },
    '&:hover': {
      background: theme.palette.colors.theme.primary,
      // '@media (max-width: 870px)': {
      //   background: theme.palette.colors.gray[50],
      // },
      '@media (hover: none) ': {
        background: theme.palette.colors.gray[50],
      },
      '& path': {
        fill: theme.palette.colors.system.white,
        // '@media (max-width: 870px)': {
        //   fill: theme.palette.colors.gray[500],
        // },
        '@media (hover: none) ': {
          fill: theme.palette.colors.gray[500],
        },
      },
    },
    // "@media (hover: hover) ":{
    //   background: theme.palette.colors.theme.primary,
    // },
  },
  pointer: {
    cursor: 'pointer',
  },
  chatFooterFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    maxWidth: '100%',
    padding: '10px',
  },
  padding10: {
    padding: '10px',
    display: 'flex',
    overflow: 'auto',
  },
  borderForFile: {
    // border: '1px solid ' + theme.palette.system.primary,
  },
  noBorderForFile: {
    border: '1px solid none',
  },
  closeIcon: {
    fontSize: 'medium',
    color: '#C6C6C6',
    cursor: 'pointer',
    position: 'absolute',
    top: '0px',
    right: '0px',
  },
  largeCloseIcon: {
    fontSize: 'large',
    color: '#C6C6C6',
    cursor: 'pointer',
    textAlign: 'end',
    marginLeft: '40px',
  },
  rightArrow: {
    fontSize: 'medium',
    color: 'rgb(0 255 194)',
    cursor: 'pointer',
    textAlign: 'center',
    height: '12px',
    width: '7.41px',
    marginLeft: '40px',
  },
  disableArrow: {
    color: '#C6C6C6',
    cursor: 'revert',
  },
  leftArrow: {
    fontSize: 'medium',
    color: 'rgb(0 255 194)',
    cursor: 'pointer',
    textAlign: 'center',
    height: '12px',
    width: '7.41px',
    marginRight: '40px',
  },
  chatSuggestions: {
    zIndex: 5,
    width: 'inherit',
    position: 'absolute',
    bottom: '65px',
    borderRadius: '8px 8px 0px 0px',
    // background: theme.palette.system.webpanel,
    maxHeight: '100px',
    overflow: 'auto',
  },
}));
