import React, { useEffect, useState } from "react";
import { useStyles } from "../UserRoleAssignment.styles";
import { createTimeDropdown, IProps } from "./ShiftSegment.types";
// import DatePicker from "../../LibraryComponents/DatePicker/DatePicker";
// import Dropdown from "../../LibraryComponents/Dropdown/Select/Select";
// import Check from "../../LibraryComponents/CheckBox/CheckBox";
// import { Delete } from "../../LibraryComponents/SVG/Delete";
// import InputField from "../../LibraryComponents/InputField/InputField";
// import ClickAndConfirm from "../../LibraryComponents/ClickAndConfirm/ClickAndConfirm";
import { PMS_LOCALE } from "../../../../Utils";
import ClickAndConfirm from "../../../LibraryComponents/ClickAndConfirm/ClickAndConfirm";
import InputField from "../../../LibraryComponents/InputField/InputField";
import Checkbox from "../../../LibraryComponents/MUICheckbox/MUICheckbox";
import MUIDatePicker from "../../../LibraryComponents/MUIDatePicker/MUIDatePicker";
import Dropdown from "../../../LibraryComponents/Select/Select";
import { DeleteIcon, RefreshIcon } from "../../../SVGs/Common";

export default function ShiftSegment(props: IProps) {
  const {
    segmentId,
    segmentName,
    weekDays,
    startDate,
    endDate,
    startTime,
    endTime,
    is_active,
    neverEnds,
    handleChange,
    handleDelete,
    handleReset,
    error,
  } = props;
  const { classes } = useStyles();
  const [timeDropdown, setTimeDropDown] = useState(
    createTimeDropdown(startDate)
  );
  const displayWeekDays = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];
  // useEffect(() => {
  //   setTimeDropDown(createTimeDropdown(startDate));
  // }, [startDate]);
  return (
    <div className={classes.AddShiftSegments}>
      <div className={classes.AddshiftSegmentHeader}>
        <div>
          <InputField
            placeholder={"Enter Segment Name"}
            value={segmentName}
            onBlur={() => {}}
            onChange={(value: any) =>
              handleChange(segmentId, "segmentName", value)
            }
            errorText={error?.segmentName}
            showError={true}
          />
        </div>
        <div className={classes.displayFlexAndCenter}>
          <span
            className={`${classes.RefreshIconColor}`}
            onClick={() => {
              handleReset(segmentId);
            }}
          >
            {<RefreshIcon />}
          </span>
        </div>
        <div className={classes.displayFlexAndCenter}>
          <span className={`${classes.RefreshIconColor}`}>
            <ClickAndConfirm
              clickableElement={<DeleteIcon />}
              confirmLabel="Confirm"
              cancelLabel="Cancel"
              confirmationHeader="Confirm Delete"
              confirmationMessage={
                "Are you sure you want to delete this segment?"
              }
              onConfirm={() => {
                handleDelete(segmentId);
              }}
              onCancel={() => {}}
            />
          </span>
        </div>
      </div>
      <div className={classes.padding8}>
        <div>
          <span className={classes.label} title={`Select Start and end date`}>
            {PMS_LOCALE.translate(`Select Start and end date`)}
          </span>
        </div>
        <div className={classes.dateRange}>
          {/*TODO: <MUIDatePicker
            // variant="date"
            date={startDate as any}
            placeholder="Start Date"
            handleDateChange={(e: Date) => {
              handleChange(segmentId, "startDate", e);
              let newTimeDropdown = createTimeDropdown(e);
              setTimeDropDown(newTimeDropdown);
              handleChange(segmentId, "startTime", newTimeDropdown[0].id);
              handleChange(
                segmentId,
                "endTime",
                newTimeDropdown[newTimeDropdown.length - 1].id
              );
            }} 
          />*/}
          <div className={classes.displayFlexAndCenter}>
            <span className={classes.label} title={":"}>
              {PMS_LOCALE.translate(":")}
            </span>
          </div>
          {/* TODO: <MUIDatePicker
            disabled={neverEnds}
            variant="date"
            startDate={endDate}
            placeholder="End Date"
            handleDateChange={(e: Date) => {
              handleChange(segmentId, "endDate", e);
            }}
          /> */}
        </div>
        {error?.startDate ? (
          <div>
            <span className={classes.errorText}>{error.startDate}</span>
          </div>
        ) : null}
        {error?.endDate ? (
          <div>
            <span className={classes.errorText}>{error.endDate}</span>
          </div>
        ) : null}
        <div className={classes.shiftSegmentEnd}>
          <Checkbox
            value={neverEnds}
            title="Never ends"
            onChange={(e: any) => {
              handleChange(segmentId, "neverEnds", e);
            }}
            // labelPlacement={"bottom"}
          />
        </div>
      </div>
      <div className={classes.selectTime}>
        <div className={classes.selectTimeLabel}>
          <span className={classes.label} title={`Select Shift Time`}>
            {PMS_LOCALE.translate(`Select Shift Time`)}
          </span>
        </div>
        <div className={classes.TimeSelector}>
          {/* TODO: <Dropdown
            options={timeDropdown as any}
            value={startTime.toString()}
            onChange={(e:any) => {
              handleChange(segmentId, "startTime", e);
            }}
            disabled={false}
            labelParameter={"id"}
            placeHolder={"Start Time"}
          />
          <Dropdown
            options={timeDropdown as any}
            value={endTime.toString()}
            onChange={(e:any) => {
              handleChange(segmentId, "endTime", e);
            }}
            disabled={false}
            labelParameter={"id"}
            placeHolder={"End Time"}
          /> */}
        </div>
        {error?.startTime ? (
          <div>
            <span className={classes.errorText}>{error.startTime}</span>
          </div>
        ) : null}
        {error?.endTime ? (
          <div>
            <span className={classes.errorText}>{error.endTime}</span>
          </div>
        ) : null}
        <div className={classes.selectDays}>
          <div className={classes.selectTimeLabel}>
            <span className={classes.label} title={`Select Days`}>
              {PMS_LOCALE.translate(`Select Days`)}
            </span>
          </div>
          <div className={classes.DaysLabel}>
            {displayWeekDays.map((day, index) => (
              <div
                className={`${classes.weekdaySpan} ${classes.flexJustifyCenter}`}
              >
                <div
                  className={`${classes.dayDivWidth} ${
                    weekDays.includes(index) ? classes.dayDivSelected : ""
                  }`}
                  onClick={() => {
                    let tempWeekdays = [...weekDays];
                    if (tempWeekdays.includes(index))
                      tempWeekdays = tempWeekdays.filter(
                        (item) => item !== index
                      );
                    else tempWeekdays.push(index);
                    handleChange(segmentId, "weekDays", tempWeekdays);
                  }}
                >
                  <span className={classes.dayDivSpan}>{day}</span>
                </div>
              </div>
            ))}
          </div>
          {error?.weekDays ? (
            <div>
              <span className={classes.errorText}>{error.weekDays}</span>
            </div>
          ) : null}
        </div>
        <div className={classes.shiftSegmentEnd}>
          <Checkbox
            value={is_active}
            title="Is active"
            onChange={(e: any) => {
              handleChange(segmentId, "is_active", e);
            }}
            // labelPlacement={"bottom"}
          />
        </div>
      </div>
    </div>
  );
}
