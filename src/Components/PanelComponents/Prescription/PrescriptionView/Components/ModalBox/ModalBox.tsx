import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { PMS_LOCALE } from '../../../../../../Utils';
interface IProps {
  errorMsgDialog: string;
  handleClosePopOver: any;
  messageType?: string;
}
export default function ModalBox(props: IProps) {
  // console.log(props)
  return (
    <Dialog
      open={props.errorMsgDialog.length > 0}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      hideBackdrop
    >
      <div>
        <DialogTitle style={{ color: '#00FFCC' }} id="alert-dialog-slide-title">
          {PMS_LOCALE.translate(props.messageType ? 'Success' : 'Warning !')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: '#FFF' }} id="alert-dialog-slide-description">
            {PMS_LOCALE.translate(props.errorMsgDialog)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ backgroundColor: '#00FFCC', color: 'black', margin: '16px' }}
            onClick={props.handleClosePopOver}
            color="primary"
          >
            {PMS_LOCALE.translate('OK')}
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
