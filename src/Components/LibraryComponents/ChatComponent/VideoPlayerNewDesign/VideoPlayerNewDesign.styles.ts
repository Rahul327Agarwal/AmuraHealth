import { Slider, styled } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { IProps } from './VideoPlayerNewDesign.types';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  headerWrap: {},
  heading: {
    color: theme.palette.colors.gray[900], //"#252427",
    margin: '0',
  },
  title: {
    color: theme.palette.colors.gray[500], //"#5C5A61",
    marginTop: '10px',
    marginBotom: '0px',
  },
  mainhead: {
    display: 'flex',
    gap: '16px',
  },
  videoContainer: {
    width: '100%',
    height: '152px',
    position: 'relative',
  },
  iconwrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: theme.palette.colors.gray[25], //"#F8F8F8",
    width: '32px',
    height: '32px',
  },
  mainwrapper: {
    //padding: "8px 8px",
    width: '100%',
  },

  divborder: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '24px 20px',
    // gap: "24px",
    width: '100%',
    height: '328px',
    background: '#F8F8F8',
    border: '1px solid #E9E8E8',
    borderRadius: '8px',
    flex: 'none',
    order: 2,
    flexGrow: 0,
  },
  docpreview: {
    position: 'relative',
    borderRadius: '8px',
    width: '100%',
    height: '200px',
  },

  radioDiv: { padding: '20px' },
  radiolabel: {
    display: 'inline-block',
    position: 'relative',
    width: '100px',
    color: 'black !important',
  },
  radiodevrigth: {
    float: 'right',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    border: '2px solid #999',
    transition: '0.2s all linear',
    marginRight: '5px',
    position: 'relative',
    top: '4px',
  },
  squaredivbox: {
    cssFloat: 'left',
    width: '100px',
    height: '100px',
    background: ' #A6A6A6',
    padding: '4px',
    gap: '10px',
    color: 'white',
    textAlign: 'center',
    borderRadius: '4px',
  },
  videocontainer: {
    position: 'relative',
    width: '100%',
  },
  rightAudioBox: {
    padding: '18px 16px',
    background: theme.palette.colors.gray[50],
  },
  attachedVideo: {
    boxSizing: 'border-box',
    padding: '24px 20px',
    width: '100%',
    background: '#F8F8F8',
    border: '1px solid #E9E8E8',
    borderRadius: '8px',
  },
  audioHeading: {
    marginBottom: '26px',
    marginTop: '0px',
  },
  AudioImg: {
    width: '100%',
    height: '160px',
    borderRadius: '8px',
    background: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeVideo: {
    width: '100%',
    height: '220px',
    borderRadius: '8px',
    marginBottom: '16px !important',
  },
  radioWrapper: {
    marginTop: '20px',
    '& span': {
      color: '#5C5A61 !important',
    },
  },
  videothumbnail: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    msTransform: 'translate(-50%, -50%)',
    padding: '12px 12px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '15px',
    textAlign: 'center',
  },
  videoPlayer: {
    width: '324px',
    height: '163px',
    borderRadius: '6px',
  },

  //video player
  audioPlayer: {
    width: 'inherit',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '15px',
    padding: '18px 18px',
    backgroundColor: '#F1F1F1',
  },
  playpause: {
    cursor: 'pointer',
    position: 'absolute',
    background: '#FFFFFF',
    width: '42px',
    height: '42px',
    borderRadius: '4px',
    padding: '9px',
    // transform: props.isSmall ? 'scale(0.7) translateY(-5px)' : 'scale(0.7) translateY(-5px)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  container: {
    width: '100%',
    color: theme.palette.colors.gray[900],
  },
  audioName: {
    color: theme.palette.colors.gray[900],
  },
  timeWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '-8px',
  },
  timespan: {
    color: theme.palette.colors.gray[900],
  },
  fileNameWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '15px',
  },
  fileNameColor: {
    color: theme.palette.colors.gray[500],
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  fileIcon: {},
}));

export const CustomizedSlider = styled(Slider)(({ theme }) => ({
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
