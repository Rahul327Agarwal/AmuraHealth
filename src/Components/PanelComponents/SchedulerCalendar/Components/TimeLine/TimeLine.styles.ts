import { VIEW_COUNT_MAP } from "../../SchedulerCalendar.function";
import { getIndexposition } from "./TimeLine.function";
import { makeStyles } from "tss-react/mui";
import { IProps } from "./TimeLine.types";

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => {
  let indexvalues = getIndexposition(props);
  let index = getIndexposition(props);

  let gridColumn = "";
  for (let i = 0; i < VIEW_COUNT_MAP[props?.viewType]; i++) {
    gridColumn += `${(100 - 20) / VIEW_COUNT_MAP[props?.viewType]}%${i === VIEW_COUNT_MAP[props?.viewType] - 1 ? "" : " "}`;
  }

  return {
    viewGrid: {
      display: "grid",
      gridTemplateColumns:
        index === -1
          ? `20% ${gridColumn}`
          : `${20 + (index * (100 - 20)) / VIEW_COUNT_MAP[props?.viewType]}% ${gridColumn.split(" ").slice(index).join(" ")}`,
    },
    hour: {
      height: "10px",
      width: "10px",
      borderRadius: "50%",
      backgroundColor: theme.palette.colors.theme.primary,
      top: "-5px",
      right: "-10px",
      position: "relative",
    },
    width: {
      width: "100%",
      height: "1px",
      backgroundColor: theme.palette.colors.theme.primary,
    },
    justifyContentEnd: {
      display: "flex",
      justifyContent: "end",
    },
    relativePosition: {
      pointerEvents: "none",
      position: "relative",
      zIndex: 999,
      visibility: indexvalues === -1 ? "hidden" : "initial",
    },
  };
});
