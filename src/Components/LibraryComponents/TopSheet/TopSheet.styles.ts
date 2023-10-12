import { makeStyles } from "tss-react/mui";
export const useStyles = makeStyles()((theme) => ({
  tab: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0",
    // background: theme.palette.system.bg,
    opacity: "0.75",
    zIndex: 1000,
  },
  profile: { height: "24px", width: "24px", color: "#FFFFFF" },
  tabContent: {
    // background: theme.palette.system.webpanel,
    opacity: "1",
    position: "absolute",
    borderRadius: "10px",
    width: "calc(100%)",
    top: "0",
    boxShadow: "0px -2px 4px #E9E8E8, 0px 4px 10px #E9E8E8",
    padding: "16px",
    zIndex: 1000,
  },
  tabContentBottom: {
    // background: theme.palette.system.webpanel,
    opacity: "1",
    position: "absolute",
    borderRadius: "10px",
    width: "calc(100%)",
    bottom: "0",
    boxShadow: "0px -2px 4px #E9E8E8, 0px 4px 10px #E9E8E8",
    zIndex: 1000,
  },
  dropdownWrap: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    "&.active": {
      height: "fit-content",
      visibility: "visible",
    },
  },
}));
