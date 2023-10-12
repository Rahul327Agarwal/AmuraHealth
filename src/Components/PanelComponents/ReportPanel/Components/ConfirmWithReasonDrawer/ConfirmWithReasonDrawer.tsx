import React, { useState } from 'react';
import InputField from './../../../../LibraryComponents/InputField/InputField';
import Button from './../../../../LibraryComponents/MUIButton/MUIButton';
import MUIDrawer from './../../../../LibraryComponents/MUIDrawer/MUIDrawer';
import { postReportsAPI } from '../../Reports/Reports.functions';
import { useStyles } from './ConfirmWithReasonDrawer.styles';
import { IProps } from './ConfirmWithReasonDrawer.types';
import { useCurrentPanel } from '../../../../../DisplayFramework/Components/Panel/Panel.hooks';

export default function ConfirmWithReasonDrawer(props: IProps) {
  const { open, onClose, reportId } = props;
  const { classes } = useStyles();
  const { id: panelId } = useCurrentPanel();
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const onInputChange = (e: any) => {
    const value = e.target.value;
    setReason(value);
  };

  const onDeactivateComfirm = async () => {
    if (!reason?.trim().length) return setError('The field is empty/invalid.');
    setError('');
    const payload = { action: 'DEACTIVATE', reportId, reasonForDeactivation: reason };
    await postReportsAPI(props, payload, panelId);
    setReason('');
    onClose();
  };

  return (
    <MUIDrawer open={open} anchor={'bottom'} headerTitle="Confirm deactivation" handleClose={onClose}>
      <div className={classes.drawerBody}>
        <InputField
          label="Reason for deactivation"
          value={reason}
          helperText={error}
          onChange={onInputChange}
          multiline
          maxRows={5}
        />
        <div className={classes.footerStyle}>
          <Button onClick={onClose}>Cancel</Button>
          <Button disabled={!Boolean(reason.length)} padding="12px 24px" variant="contained" onClick={onDeactivateComfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </MUIDrawer>
  );
}
