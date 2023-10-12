import { makeStyles } from "tss-react/mui";
import { IProps } from "../MyListHome.types";
export const useStyles = makeStyles()((theme, props) => ({
  rootContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    height: "100%",
    width: "inherit",
    transform: "translate(-355px, 0px)",
    transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
  },
  swipeIn: {
    transform: "translate(0px,0px)",
  },
  swipeOut: {
    transform: "translate(-355px, 0px)",
  },
  statusWrap: {
    background: theme.palette.colors.system.white,
    width:  `inherit`,
    height: `100%`,
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    paddingTop: "12px",
    position: "relative",
  },
  headerStyle: {
    height: "60px",
    boxSizing: "border-box",
    padding: "0 20px !important",
  },
  footerStyle: {
    height: "100px",
    boxSizing: "border-box",
    borderRadius: "0px 0px 8px 8px"
  },
  bodyContainer: {
    height: "calc(100% - 160px)",
    overflowY: "auto",
    boxSizing: "border-box",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  labelStyle: {
    color: theme.palette.colors.gray[500],
    marginBottom: "10px",
  },
  labelColor: {
    color: theme.palette.colors.gray[500],
    marginTop:'22px',
  },
  daterangeWrapper: {
    display: "flex",
    gap: "15px",
  },
  selectWrap: {
    marginBottom: "30px",
    position: "relative",
  },
  accordianWrap: {
    position: "relative",
    margin: "0 -20px",
    "& .MuiTypography-body1": {
      width: "100% !important",
    },
    "& .MuiAccordionSummary-root": {
      transform: "translateY(-5px) !important",
    },
    "& .MuiPaper-elevation1": {
      boxShadow: "none",
    },
  },
  rangeSlider: {
    "& .MuiSlider-rail": {
      background: "#F1F1F1 !important",
    },
    "& .MuiSlider-track": {
      background: "#5C5A61 !important",
    },
    "& .MuiSlider-thumb": {
      background: "#252427 !important",
      "&:before": {
        content: "''",
        position: "absolute",
        height: "15px",
        width: "15px",
        borderRadius: "50%",
        background: "#fff",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      },
    },
  },
  ageValue: {
    position: "absolute",
    top: "12px",
    right: "12%",
    color: "#373639",
    zIndex: 9,
  },
  backdrop: {
    opacity: 0,
    transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    background: theme.palette.colors.gray[900],
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -2,
  },
  backdropOpacityIn: {
    opacity: 0.8,
  },
  backdropOpacityOut: {
    opacity: 0,
  },
  activeClearAll: {
    color: theme.palette.colors.theme.primaryLight
  },
  defaultClearAll: {
    color: theme.palette.colors.gray[400]
  },
  backArrow: {
    cursor: "pointer",
    display: "flex",
    alignItems: "inherit",
    marginRight: "15px",
  },
}));
