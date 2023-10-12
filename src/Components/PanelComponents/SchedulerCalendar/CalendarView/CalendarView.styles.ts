import { MAGNIFY_MAP, VIEW_COUNT_MAP } from "../SchedulerCalendar.function";
import { IProps } from "./CalendarView.types";
import { makeStyles } from "tss-react/mui";

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, { viewType, magnifyCounter }) => {
  let gridColumn = "";
  for (let i = 0; i < VIEW_COUNT_MAP[viewType]; i++) {
    gridColumn += `${(100 - 20) / VIEW_COUNT_MAP[viewType]}%${i === VIEW_COUNT_MAP[viewType] - 1 ? "" : " "}`;
  }
  return {
    relativeContainer: {
      overflow: "auto",
      position: "relative",
      overflowX: "hidden",
    },
    calendarContainer: {
      position: "relative",
      marginTop: "-10px",
      overflow: "hidden",
    },
    // ==== START CALENDAR STYLE ===
    calendarViewGrid: {
      display: "grid",
      gridTemplateColumns: `20% ${gridColumn}`,
      height: `${MAGNIFY_MAP[magnifyCounter]}px`,
      '&[data-label="true"]': {
        height: `${MAGNIFY_MAP[0]}px !important`,
        background: theme.palette.colors.system.white,
        userSelect: "none",
      },
    },
    timeStyle: {
      color: theme.palette.colors.gray[500],
      display: "block",
      textAlign: "end",
      position: "relative",
      top: "-8px",
      paddingRight: "8px",
      userSelect: "none",
      '&[data-time-zone="true"]': {
        // top: 'calc( 100% - 8px)',
        top: "50%",
        translate: "0 -50%",
      },
    },
    timeDayBox: {
      // padding: '1px',
      borderTop: `1px solid ${theme.palette.colors.gray[100]}`,
      borderLeft: `1px solid ${theme.palette.colors.gray[100]}`,
      '&[data-y-final="true"]': { borderBottom: `1px solid ${theme.palette.colors.gray[100]}` },
      '&[data-x-final="true"]': { borderRight: `1px solid ${theme.palette.colors.gray[100]}` },
      '&[data-y-first="true"]': { borderTop: `none !important` },
    },
    eventsWrapper: {
      position: "relative",
      height: "100%",
      width: "100%",
      userSelect: "none",
    },
    eventDurationSelector: {
      backgroundColor: theme.palette.colors.green[50],
      position: "absolute",
      margin: "0 0 0 70px",
      zIndex: 500,
      top: "0px",
      left: "0px",
      height: "0px",
      width: "85px",
      userSelect: "none",
      pointerEvents: "none",
      "&[data-start='false']": {
        display: "none !important",
      },
    },
    eventLabel: {
      color: theme.palette.colors.gray[500],
      position: "absolute",
      padding: "2px",
      userSelect: "none",
      pointerEvents: "none",
    },
    dateBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // flexDirection: viewType === "OneDay" ? "row" : "column",
      flexDirection:'column',
      gap: "2px",
      borderBottom: `1px solid ${theme.palette.colors.gray[100]}`,
      paddingBottom: viewType === "OneDay" ? "16px" : "0",
    },
    dateText: {
      color: theme.palette.colors.gray[500],
      userSelect: "none",
    },
  };
});
