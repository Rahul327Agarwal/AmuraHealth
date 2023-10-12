import { SLOTS_WIDTH } from "../../SchedulerCalendar.function";
import { IProps } from "./AvailabilitySlot.types";
import { makeStyles } from "tss-react/mui";

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, { disabled, viewType, isRsvpDecline, opacity }) => ({
  slotContainer: {
    boxSizing: "border-box",
    background: isRsvpDecline ? theme.palette.colors.system.white : theme.palette.colors.blue[50],
    userSelect: "none",
    overflow: "hidden",
    opacity: opacity || 1,
    border: `1px solid ${theme.palette.colors.blue[200]}`,
    borderRadius: "20px",
    width: `${SLOTS_WIDTH[viewType] || 20}px`,
    padding: "2px",
    pointerEvents: disabled ? "none" : "unset",
  },
  slotContentWrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    height: "100%",
    gap: "8px",
    alignItems: "center",
  },
  iconDiv: {
    boxSizing: "border-box",
    width: "14px",
    height: "14px",
    border: `2px solid ${theme.palette.colors.gray[400]}`,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  slotContent: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    boxSizing: "border-box",

    display: viewType === "OneDay" ? "block" : "none",
    color: theme.palette.colors.gray[500],
    transform: "rotate(180deg)",
    writingMode: "vertical-lr",
  },
}));
