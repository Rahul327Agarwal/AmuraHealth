import { makeStyles } from 'tss-react/mui';
import { styled, Slider } from '@mui/material';
import { IProps } from './VoiceRecording.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  recorderContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '0px',
    gap: '16px',
  },
  sliderRightButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '25.74px',
    width: '80px',
  },
  rightButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '25.74px',
    width: '100%',
  },
  label: {
    // color: "#fff",
  },
  deleteIcon: {
    // marginRight: '15px',

    '& svg': {
      '& path': {
        fill: '#5C5A61',
      },
    },
  },
  SpeakIcon: {
    // marginRight: '20px',
    '& svg': {
      '& path': {
        fill: '#5C5A61',
      },
    },
  },
  pointer: {
    cursor: 'pointer',
  },
  playpause: {
    cursor: 'pointer',
    marginRight: '18px',
  },
  clearRecord: {
    color: '#FF8989',
    cursor: 'pointer',
  },
  sliderRecordTime: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '18px',

    // color: "#fff",
    width: '100%',
    '& svg': {
      color: '#FF4539',
    },
  },
  recordTime: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '45px',
    flex: 1,
    '& svg': {
      color: '#FF4539',
    },
  },
  delete: {
    cursor: 'pointer',
    marginRight: '25px',
  },
  audioContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '0 20px 0 0',
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
  },
  caption12Medium: {
    fontFamily: 'Graphik !important',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 600,
    fontStyle: 'normal',
  },
  caption12Regular: {
    fontFamily: 'Graphik !important',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
    fontStyle: 'normal',
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
