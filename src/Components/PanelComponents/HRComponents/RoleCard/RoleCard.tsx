import React from 'react';
import { IProps, IShiftSegment } from './RoleCard.types';
import { useStyles } from './RoleCard.styles';
import ShiftSegment from '../ShiftSegment/ShiftSegment';
import RoleDetails from '../RoleDetails/RoleDetails';
import { convertDaysToUTCDays } from '../../../../Common/Common.functions';

export default function RoleCard(props: IProps) {
  const { roleId, roleName, reportingTo, reportees, shiftSegments, is_active, handleEdit, handleActivation } = props;
  const { classes } = useStyles();
  return (
    <div className={classes.card}>
      <RoleDetails
        roleId={roleId}
        roleName={roleName}
        reportingTo={reportingTo.map((user) => user.userName).join(', ')}
        reportees={reportees.map((user) => user.userName).join(', ')}
        is_active={is_active}
        handleEdit={handleEdit}
        handleActivation={handleActivation}
      />
      <div>
        {shiftSegments.map((shift: IShiftSegment) => (
          <ShiftSegment shift={{ ...shift, weekDays: convertDaysToUTCDays(shift.startTime, shift.weekDays, false) }} />
        ))}
      </div>
    </div>
  );
}
