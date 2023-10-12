import { TextField } from '@mui/material';
import { makeStyles, withStyles } from 'tss-react/mui';

export const CssTextField = withStyles(TextField, {
  root: {
    '& label.Mui-focused': {
      color: '#00FFC2 !important',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#00FFC2 !important',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#FFFFFF !important',
      },
      '&:hover fieldset': {
        borderColor: '#FFFFFF !important',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00FFC2 !important',
      },
    },
  },
});

export const CssTextFieldWithValue = withStyles(TextField, {
  root: {
    '& label.Mui-focused': {
      color: '#00FFC2 !important',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#00FFC2 !important',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#00FFC2 !important',
      },
      '&:hover fieldset': {
        borderColor: '#00FFC2 !important',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00FFC2 !important',
      },
    },
  },
});

export const DescriptionTextField = withStyles(TextField, {
  root: {
    '& label': {
      color: '#00FFC2 !important',
    },
    '& label.Mui-disabled': {
      color: '#4B4E50 !important',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#00FFC2 !important',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#00FFC2 !important',
      },
      '&:hover fieldset': {
        borderColor: '#00FFC2 !important',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00FFC2 !important',
      },
      '&.Mui-disabled fieldset': {
        borderColor: '#4B4E50 !important',
      },
    },
  },
});

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()(() => ({
  textBackground: {
    background: 'transparent !important',
    '& .MuiInputBase-input': {
      background: 'transparent !important',
      color: '#FFFFFF',
    },
    '& .MuiInputBase-input:hover': {
      background: 'transparent !important',
    },
    '& .MuiInputBase-input:focus': {
      background: 'transparent !important',
    },
  },
  root: {
    '& .MuiInputBase-root': {
      background: 'transparent !important',
    },
  },
  allergensSelect: {
    '& .MuiInputBase-input': {
      padding: '11px 20px !important',
      background: 'transparent !important',
      color: '#FFFFFF',
    },
  },

  buttonStyles: {
    marginTop: '10px',
    textAlign: 'right' as const,
  },
  descriptionButtons: {
    padding: '16px 4px',
  },
  cancelIconStyle: {
    border: '1px solid #FFFFFF',
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
  selectBox: {
    background: 'linear-gradient(0deg,hsla(0,0%,100%,.12),hsla(0,0%,100%,.12)),#121212',
    boxShadow: '0 8px 10px rgb(0 0 0 / 14%), 0 3px 14px rgb(0 0 0 / 12%), 0 5px 5px rgb(0 0 0 / 20%)',
    margin: '20px 5px',
  },
  descriptionBox: {
    background: 'linear-gradient(0deg,hsla(0,0%,100%,.12),hsla(0,0%,100%,.12)),#121212',
    boxShadow: '0 8px 10px rgb(0 0 0 / 14%), 0 3px 14px rgb(0 0 0 / 12%), 0 5px 5px rgb(0 0 0 / 20%)',
    margin: '20px 5px',
    padding: '16.85px 10px',
  },
}));

export const areaStyle = {
  width: '100%',
  resize: 'none' as 'none',
};
