import React, { useState } from 'react';
import InputField  from '../../../../LibraryComponents/InputField/InputField';
import MUIButton  from '../../../../LibraryComponents/MUIButton/MUIButton';
import MUIDrawer  from '../../../../LibraryComponents/MUIDrawer/MUIDrawer';
import { useStyles } from '../../DiagnosticCondition.styles';
import { IProps } from './AddReasonDrawer.types';

const STATUS_OPTIONS = [
  { type: 'YES', description: 'Activate' },
  { type: 'NO', description: 'Stop' },
  { type: 'PAUSE', description: 'Pause' },
];

export default function AddReasonDrawer(props: IProps) {
  const { open, headerTitle, onClose, existingStatus, onSubmitModal } = props;
  const { classes } = useStyles(props);

  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const onInputChange = (e: any) => {
    const value = e.target.value;
    setReason(value);
  };

  const onSubmit = async () => {
    if (!reason?.trim().length) return setError('The field is empty/invalid.');
    setError('');
    onSubmitModal({ reason: reason.trim(), status });
    setReason('');
    setStatus('');
    onClose();
  };

  return (
    <MUIDrawer open={open} anchor={'bottom'} headerTitle={headerTitle} handleClose={onClose}>
      <div className={classes.drawerBody}>
        <div className={classes.filterButtonWrapper}>
          {STATUS_OPTIONS.map((data) => {
            if (data.type === existingStatus) return null;
            return (
              <MUIButton
                key={data.type}
                className={classes.filterButton}
                onClick={() => setStatus(data.type)}
                variant={status === data.type ? 'outlined' : 'text'}
              >
                {data.description}
              </MUIButton>
            );
          })}
        </div>
        <InputField label="Add reason" value={reason} helperText={error} onChange={onInputChange} multiline maxRows={5} />
        <div className={classes.drawerFooterStyle}>
          <MUIButton onClick={onClose}>Cancel</MUIButton>
          <MUIButton disabled={!Boolean(reason?.trim().length) || !Boolean(status)} variant="contained" onClick={onSubmit}>
            Submit
          </MUIButton>
        </div>
      </div>
    </MUIDrawer>
  );
}
