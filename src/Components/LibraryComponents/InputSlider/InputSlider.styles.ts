import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  rangeSlider: {
    '& .MuiSlider-thumb': {
      height: '24px',
      width: '24px',
      background: '#00FFCC',
      // marginTop: '-8px',
      boxShadow: 'none',
      margin: '0 !important',
    },
    '& .MuiSlider-track': {
      background: '#00FFCC',
      height: '8px',
      borderRadius: '4px',
    },
    '& .MuiSlider-rail': {
      background: '#2EAE94',
      height: '8px',
      opacity: 0.5,
      borderRadius: '4px',
    },
  },
}));
