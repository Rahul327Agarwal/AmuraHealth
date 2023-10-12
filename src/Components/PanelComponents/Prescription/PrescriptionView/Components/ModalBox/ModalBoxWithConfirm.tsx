import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { PMS_LOCALE } from '../../../../../../Utils';
import MUIButton from '../../../../../LibraryComponents/MUIButton/MUIButton';
import { CloseIcon } from '../../../../../SVGs/Common';
interface IProps {
  open: boolean;
  handleClosePopOver: any;
  handleSubmitPopOver: any;
  panelWidth: string;
  warningMessage: string;
}

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
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
  buttonStyles: {
    textAlign: 'right' as const,
    marginTop: '12px',
  },
  dialogueContentText: {
    color: theme.palette.colors.gray[500],
  },
  dialogueTitle: { color: theme.palette.colors.theme.primary, paddingTop: '0px', fontSize: '18px', fontWeight: 500 },
}));

const areaStyle = {
  width: '100%',
  resize: 'none' as 'none',
};
export default function ModalBoxWithConfirm(props: IProps) {
  const { classes } = useStyles();
  return (
    <Dialog
      open={props.open}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      className={classes.dialogueBox}
    >
      <div style={{ width: `${props.panelWidth}px`, maxWidth: `${props.panelWidth}px` }}>
        <div style={{ width: `${props.panelWidth}px`, height: '20px' }}>
          <CloseIcon
            style={{ cursor: 'pointer', float: 'right', marginTop: '10px', marginRight: '12px', width: '18px', height: '18px' }}
            onClick={() => {
              props.handleClosePopOver();
            }}
          />
        </div>
        <DialogTitle className={classes.dialogueTitle} title="State change ?" id="alert-dialog-slide-title">
          {PMS_LOCALE.translate('Warning !')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogueContentText} id="alert-dialog-slide-description">
            {PMS_LOCALE.translate(props.warningMessage)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className={classes.buttonStyles}>
            <MUIButton variant="text" className={classes.cancelIconStyle} onClick={() => props.handleClosePopOver()}>
              {PMS_LOCALE.translate('Cancel')}
            </MUIButton>
            <MUIButton
              style={{
                textDecoration: 'none',
                textTransform: 'none',
                margin: '16px',
              }}
              variant="contained"
              onClick={() => {
                props.handleSubmitPopOver();
              }}
              color="primary"
            >
              {PMS_LOCALE.translate('OK')}
            </MUIButton>
          </div>
        </DialogActions>
      </div>
    </Dialog>
  );
}
