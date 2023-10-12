import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { makeStyles, withStyles } from 'tss-react/mui';
import { PMS_LOCALE } from '../../../../../../Utils';
import { default as MUIButton } from '../../../../../LibraryComponents/MUIButton/MUIButton';
import { CloseIcon } from '../../../../../SVGs/Common';

interface IProps {
  open: boolean;
  handleClosePopOver: any;
  handleSubmitPopOver: any;
  panelWidth: string;
}

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
const DescriptionTextField = withStyles(TextField, (theme, props) => ({
  root: {
    '& label': {
      color: '#FFFFFF !important',
    },
    '& label.Mui-disabled': {
      color: '#FFFFFF !important',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#FFFFFF !important',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#FFFFFF !important',
      },
      '&:hover fieldset': {
        borderColor: '#FFFFFF !important',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FFFFFF !important',
      },
      '&.Mui-disabled fieldset': {
        borderColor: '#FFFFFF !important',
      },
    },
  },
}));

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
const useStyles = makeStyles()((theme) => ({
  'MuiDialog-paperWidthSm': {
    display: 'none !important',
  },
  textBackground: {
    background: 'transparent !important',
    '& .MuiInputBase-input': {
      background: 'transparent !important',
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
      padding: '6px !important',
      background: 'transparent !important',
    },
  },
  dialogueBox: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: '4000px !important',
    },
  },
  innerContainer: {
    // colors hardcoded as color already doesn't exist in palette
    background: 'rgba(4,4,4,.9) !important',
    '& .MuiDialogTitle-root': {
      color: '#00FFC2 !important',
    },
    '& .MuiInputBase-root': {
      color: theme.palette.colors.system.white,
      padding: '12px !important',
    },
    '& .MuiDialogContent-root ':{
      paddingTop:'24px !important'
    },
    '& .MuiDialogActions-root': {
      padding: '21px',
    },
    '& .MuiButton-root.MuiButton-contained': {
      background: '#00FFC2 !important',
      color: theme.palette.colors.system.black,
    },
    '& .MuiButton-root.MuiButton-contained.Mui-disabled': {
      background: 'rgb(86, 87, 91) !important',
      color: theme.palette.colors.system.black,
    },
  },
}));

const areaStyle = {
  width: '100%',
  resize: 'none' as 'none',
};
export default function ModalBoxWithInput(props: IProps) {
  const { classes } = useStyles();
  const [description, setDescription] = useState('');
  // console.log(props)

  useEffect(() => {
    setDescription('');
  }, [props.open]);
  return (
    <Dialog
      open={props.open}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      className={classes.dialogueBox}
    >
      <div style={{ width: `${props.panelWidth}px`, maxWidth: `${props.panelWidth}px` }} className={classes.innerContainer}>
        <div style={{ width: `${props.panelWidth}px`, height: '20px' }}>
          <CloseIcon
            style={{ cursor: 'pointer', float: 'right', marginTop: '10px', marginRight: '12px', width: '18px', height: '18px' }}
            onClick={() => {
              props.handleClosePopOver();
            }}
          />
        </div>
        <DialogTitle
          style={{ paddingTop: '0px', fontSize: '18px', fontWeight: 500 }}
          title="State change ?"
          id="alert-dialog-slide-title"
        >
          {PMS_LOCALE.translate('State change ?')}
        </DialogTitle>
        <DialogContent>
          <DescriptionTextField
            variant="outlined"
            InputProps={{ className: classes.textBackground }}
            value={description}
            className={classes.root}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            multiline
            style={areaStyle}
            rows={5}
            placeholder={'Record the observations'}
          />
        </DialogContent>
        <DialogActions>
          <MUIButton
            variant="contained"
            disabled={description === ''}
            onClick={() => {
              props.handleSubmitPopOver(description);
            }}
          >
            OK
          </MUIButton>
        </DialogActions>
      </div>
    </Dialog>
  );
}
