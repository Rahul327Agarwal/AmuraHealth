import { IProps } from "./TimeSlot.types";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles<IProps>()((theme, props) => ({
  timeSlotContainer: {
    border:
      "1px solid " +
      `${props.isSelected ? theme.palette.primary.main : "#AEAEAE"}`,
    width: "78px",
    borderRadius: "5px",
    padding: "8px",
    color: props.isSelected ? theme.palette.primary.main : "#C6C6C6",
    cursor: "pointer",
    "&:hover": {
      background: !props.isSelected
        ? theme.palette.colors.system.link
        : "transparent",
    },
  },
  timeSpan: {
    fontSize: "12px",
    lineHeight: "16px",
  },
  timeContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
  },
  circleDiv: {
    width: "10px",
    height: "10px",
  },
  circlesContainer: {
    marginTop: "4px",
    display: "flex",
  },
  circle: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    margin: "2px",
  },
}));
