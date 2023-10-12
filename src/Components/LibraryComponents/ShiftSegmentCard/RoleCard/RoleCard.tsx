import React from 'react';
import { IProps, IShiftSegment } from './RoleCard.types';
import { useStyles } from './RoleCard.styles';
import ShiftSegment  from '../ShiftSegment/ShiftSegment';
import RoleDetails  from '../RoleDetails/RoleDetails';

export default function RoleCard(props: IProps) {
  const { roleId, shiftSegments, is_active, handleEdit, handleActivation } = props;
  const { classes } = useStyles();
  return (
    <div className={classes.card}>
      {shiftSegments.map((shift: IShiftSegment) => (
        <ShiftSegment shift={shift} roleId={roleId} handleEdit={handleEdit} isEditable={false} />
      ))}
    </div>
  );
}
