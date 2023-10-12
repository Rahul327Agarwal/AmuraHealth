import { Slider, styled } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { IStyleProps } from './MediaViewer.types';

export const useStyles = makeStyles<IStyleProps>()((theme, props) => {
  return {
    container: {
      position: 'absolute',
      inset: 0,
      zIndex: 900,
    },

    innerWrapper: {
      position: 'relative',
      height: '100%',
      background: theme.palette.colors.gray[900],
    },
    absoluteOpaque: {
      background: theme.palette.colors.system.white,
      opacity: '80%',
      width: '100%',
      position: 'absolute',
    },

    // ............the header
    header: {
      height: props.areDetailsHidden ? 0 : '80px',
      transition: 'all .5s ease',
      padding: props.areDetailsHidden ? '0 20px' : '20px 20px',
      display: 'grid',
      gridTemplateColumns: '46px calc(100% - 108px) 64px',
      top: '0',
      overflow: 'hidden',
      zIndex: 999,
    },
    metaData: {
      flexGrow: 1,
    },
    title: {
      overflow: 'hidden',
      width: 'calc(100% - 0px)',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    backIcon: {
      cursor: 'pointer',
    },

    date: {
      color: theme.palette.colors.gray[500],
    },

    threeDot: {
      marginLeft: 'auto',
      cursor: 'pointer',
    },
    // .............................the body
    mediaWrapper: {
      userSelect: 'none',
      width: '100%',
      height: '100%',
      background: theme.palette.colors.gray[900],
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      // cursor: 'pointer',

      '& img': {
        // height: '100%',
        cursor: props.isZoomActive ? 'zoom-out' : 'zoom-in',
        width: '100%',
        objectFit: 'contain',
        transition: 'scale .25s ease',
      },
    },
    imageWrapper: {
      width: '100%',
      maxHeight: '100%',
      height: '100%',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },

    videoFrame: {
      cursor: 'pointer',
    },
    playPause: {
      width: '42px',
      height: '42px',
      borderRadius: '4px',
      opacity: '80%',
      background: theme.palette.colors.system.white,
      position: 'absolute',
      zIndex: 999,
      margin: '0 auto',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
    },

    // .......................the footer
    footer: {
      bottom: '0',
      padding: props.areDetailsHidden ? '0 20px 0' : '20px 20px 32px',
      maxHeight: props.areDetailsHidden
        ? 0
        : props.isTextExpanded
        ? 'calc(100% - 80px)' // 80px header
        : props.type === 'video'
        ? '148px'
        : '112px',
      height: 'auto',
      overflow: props.showReadMore ? 'hidden' : 'auto',
      transition: 'all .5s ease',
      zIndex: 999,
    },

    textWrapper: {
      transition: 'all .5s ease',
      maxHeight: props.isTextExpanded ? '100%' : '2.5rem',
      overflow: 'hidden',
    },
    readMore: {
      cursor: 'pointer',
    },
    videoDetails: {
      display: 'grid',
      gridTemplateColumns: '32px 1fr 32px',
      gap: '12px',
      alignItems: 'center',
    },

    progressBar: {
      height: '4px',
      background: theme.palette.colors.gray[400],
      flexGrow: 1,
      cursor: 'pointer',
    },
    progress: {
      width: `${props.progress}%`,
      background: theme.palette.colors.gray[900],
      height: '100%',
      position: 'relative',
      '&:before': {
        position: 'absolute',
        content: '""',
        height: '12px',
        width: '12px',
        borderRadius: '100%',
        background: 'black',
        zIndex: 990,
        top: '50%',
        transform: 'translate(50%, -50%)',
        cursor: 'pointer',
        right: 0,
      },
    },
    time: {
      color: theme.palette.colors.gray[900],
      // minWidth: '30px',
    },

    mt16: {
      marginTop: '16px',
    },
    zoomableImgWrapper: {
      height: '100%',
      width: '100%',
      '& > div': {
        height: '100%',
      },
    },
  };
});

export const MUIVideoSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.colors.gray[900],
  '& .MuiSlider-thumb': {
    width: 15,
    height: 15,
    '&:before': {
      boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
    },
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 8px rgb(0 0 0 / 16%)`,
    },
    '&.Mui-active': {
      width: 20,
      height: 20,
    },
  },
  '& .MuiSlider-rail': {
    backgroundColor: theme.palette.colors.gray[400],
  },
  '& .MuiSlider-rail , & .MuiSlider-track': {
    height: '4px',
    borderRadius: '4px',
  },
}));
