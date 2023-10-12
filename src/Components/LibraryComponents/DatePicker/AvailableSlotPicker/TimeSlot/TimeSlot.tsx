import React from "react";
import { IProps } from "./TimeSlot.types";
import { useStyles } from "./TimeSlot.styles";
import { formatAMPM } from "../../DatePicker.functions";
import { PMS_LOCALE } from "../../../../../Utils";

export default function TimeSlot(props: IProps) {
  const { timeSlot, participants, isSelected, handleClick } = props;
  const { classes } = useStyles(props);
  return (
    <div
      className={classes.timeSlotContainer}
      onClick={() => {
        handleClick(new Date(timeSlot));
      }}
    >
      <div className={classes.timeContainer}>
        <span
          className={classes.timeSpan}
          title={formatAMPM(new Date(timeSlot))}
        >
          {PMS_LOCALE.translate(formatAMPM(new Date(timeSlot)))}
        </span>
      </div>
      <div className={classes.circlesContainer}>
        {participants.map((participant) => (
          <div
            className={classes.circle}
            style={{ background: participant.color }}
          ></div>
        ))}
      </div>
    </div>
  );
}
