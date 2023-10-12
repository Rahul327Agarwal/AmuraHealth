import { makeStyles } from "tss-react/mui";
import { IProps } from "./TimeScale.types";
import {
  differenceFrom12AM,
  differenceInMilliseconds,
} from "./TimeScalse.functions";

export const useStyles = makeStyles<IProps>()((theme, props) => ({
  flex: {
    display: "flex",
  },
  hour: {
    //fontfamily: 'Inter',
    fontStyle: "normal",
    fontHeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
    color: `${theme.palette.colors.gray[900]} !important`,
  },
  equalSpace: {
    width: "calc(100% / 25)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
  },
  hourHeight: {
    height: "20px",
    width: "1px",
    backgroundColor: "#252427", //`${theme.palette.colors.gray[900]} !important`,
  },
  normalHourHeight: {
    height: "12px",
    width: "1px",
    backgroundColor: "#A6A6A6", //`${theme.palette.colors.gray[400]} !important`,
  },
  justifyCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  height18px: {
    height: "18px",
  },
  highlightTime: {
    backgroundColor: "#252427",
    height: "6px",
  },
  hightlightPosition: {
    left: `calc((((100% - (100% / 25)) / (24 * 60 * 60 * 1000)) * ${differenceFrom12AM(
      new Date(props.startTime)
    )}) + (100% / 50))`,
    width: `calc(((100% - (100% / 25)) / (24 * 60 * 60 * 1000)) * ${
      new Date(props.startTime).getTime() ===
        new Date(props.endTime).getTime() &&
      new Date(props.startTime).getHours() === 0 &&
      new Date(props.endTime).getHours() === 0
        ? 24 * 60 * 60 * 1000
        : differenceInMilliseconds(
            new Date(props.startTime),
            new Date(props.endTime)
          )
    } )`,
    bottom: "0px",
    position: "absolute",
  },
  body: {
    position: "relative",
  },
}));
