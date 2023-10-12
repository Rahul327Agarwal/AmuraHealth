import React from 'react';
import { getFormattedDate } from '../../../../Common/Common.functions';
import { useCommonStyles } from '../../../../Common/Theme/CommonStyles';
import { Calendar, ClockIcon, EditIcon } from '../ShiftSegment.svg';
import { useStyles } from '../RoleCard/RoleCard.styles';
import TimeScale from '../TimeScale/TimeScale';
import { IProps } from './ShiftSegment.types';
import { getTimeAMPMFormat } from './ShiftSegment.functions'
// import { getTimeAMPMFormat } from "../../../UserRoleAssignment/ShiftSegment/ShiftSegment.types";

export default function ShiftSegment(props: IProps) {
  const { shift, handleEdit, roleId, isEditable } = props;
  const { classes } = useStyles();
  const commonClasses = useCommonStyles();
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <div className={classes.card}>
      <div className={classes.editHeader}>
        <span className={`${classes.shiftDates} ${classes.alignCenter} ${commonClasses.caption12Regular}`}>
          <i className={classes.calenderIcon}>{<Calendar />}</i>
          {`${getFormattedDate(shift.startDate.toString(), 'DD/MM/YYYY')} to ${
            !shift?.neverEnds ? getFormattedDate(shift.endDate.toString(), 'DD/MM/YYYY') : 'Never ends'
          }`}
        </span>

        {isEditable && (
          <div
            onClick={() => {
              if (handleEdit) handleEdit(roleId);
            }}
          >
            {<EditIcon />}
          </div>
        )}
      </div>
      <div>
        <span className={`${classes.shiftDates} ${classes.alignCenter} ${commonClasses.caption12Regular}`}>
          <i className={classes.calenderIcon}>{<ClockIcon />}</i>
          {/* {`${get12HourTime(
            new Date(shift.startTime).getTime()
          )} : ${get12HourTime(new Date(shift.endTime).getTime())}`} */}

          {`${getTimeAMPMFormat(new Date(shift.startTime))} to ${getTimeAMPMFormat(new Date(shift.endTime))}`}
        </span>
      </div>
      <div>
        <div className={classes.dflex}>
          {weekDays.map((data, index) => {
            return (
              <span
                className={`${commonClasses.caption12Medium} ${
                  shift.weekDays.includes(index) ? classes.daysSelected : classes.days
                }`}
              >
                {data}
              </span>
            );
          })}
        </div>
      </div>
      <div>
        <TimeScale startTime={shift.startTime} endTime={shift.endTime} />
      </div>
    </div>
  );
}
