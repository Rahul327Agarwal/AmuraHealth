import { makeStyles } from "tss-react/mui";
import { CSSProperties } from "react";
export const useStyles = makeStyles()((theme) => ({
  timeSlotsGrid: {
    display: "grid",
    gridTemplateColumns: "auto auto auto",
    gridGap: "8px",
  },
  pickerBackground: {
    background: theme.palette.background.paper,
  },
}));

export const getAlignment = (index: number): CSSProperties => {
  if (index % 3 === 0) {
    return { display: "flex", justifyContent: "center" };
  }
  if (index % 3 === 1) {
    return { display: "flex", justifyContent: "center" };
  }
  if (index % 3 === 2) {
    return { display: "flex", justifyContent: "center" };
  }
};
