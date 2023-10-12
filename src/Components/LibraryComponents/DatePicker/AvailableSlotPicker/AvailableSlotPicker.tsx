import React from "react";
import StaticDatePicker from "../StaticDatePicker/StaticDatePicker";
import { IProps } from "./AvailableSlotPicker.types";
import TimeSlot from "./TimeSlot/TimeSlot";
import { getAlignment, useStyles } from "./AvailableSlotPicker.styles";

export default function AvailableSlotPicker(props: IProps) {
  const { classes } = useStyles();
  const {
    selectedDate,
    handleDateChange,
    availableDates,
    availableTimeSlots,
    onTimeSlotSelected,
  } = props;
  const [currentSelectedDate, setCurrentSelectedDate] =
    React.useState(selectedDate);
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<Date>(null);
  return (
    <div className={classes.pickerBackground}>
      <StaticDatePicker
        startDate={currentSelectedDate}
        handleDateChange={(e: any) => {
          setCurrentSelectedDate(new Date(e));
          handleDateChange(new Date(e));
        }}
        showAvailableDatesOnly={true}
        availableDates={availableDates}
      />
      <div className={classes.timeSlotsGrid}>
        {availableTimeSlots.map((slot, index) => (
          <div style={getAlignment(index)}>
            <TimeSlot
              timeSlot={slot.timeSlot}
              participants={slot.participants}
              isSelected={
                new Date(slot.timeSlot).getTime() ===
                selectedTimeSlot?.getTime()
              }
              handleClick={(e) => {
                setSelectedTimeSlot(new Date(e));
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
