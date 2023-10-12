import { Slider, styled } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  timeWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mt: -2,
  },
  timespan: {
    color: theme.palette.colors.gray[900],
  },
  audioPlayer: {
    width: '100%',
    display: 'flex',
  },
  playpause: {
    cursor: 'pointer',
    width: '40px',
    position: 'relative',
    '& > *': {
      position: 'absolute',
      top: '6px',
      transform: ' scale(1.3)',
    },
  },
  container: {
    width: '100%',
  },
}));

export const CustomizedSlider = styled(Slider)({
  color: '#252427',
  '& .MuiSlider-thumb': {
    width: 15,
    height: 15,
    transition: '0.3s linear',
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
  '& .MuiSlider-rail , & .MuiSlider-track': {
    height: '4px',
    borderRadius: '4px',
    transition: '0.3s linear',
  },
});
