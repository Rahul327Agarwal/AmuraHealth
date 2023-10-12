import { Slider, styled } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { IProps } from './AudioPlayer.types';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  playbackSpeedBtn: {
    padding: '4px 11px',
    cursor: 'pointer',
    background: theme.palette.colors.gray[200],
    color: theme.palette.colors.gray[900],
    borderRadius: '20px',
    marginRight: '12px',
    minWidth: '44px',
    display: 'inline-block',
    textAlign: 'center',
  },
  audioPlayer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '18px',
  },
  playpause: {
    cursor: 'pointer',
    position: 'relative',
    transform: props.isSmall ? 'scale(0.7) translateY(-5px)' : 'initial',
    '& svg': {
      width: props.voiceNote ? '21px' : '30px',
      height: props.voiceNote ? '21px' : '30px',
    },
  },
  container: {
    width: '100%',
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
    minWidth: '40px',
  },
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
