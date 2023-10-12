import { Tab, Tabs } from "@mui/material";
import { makeStyles, withStyles } from "tss-react/mui";
import { IProps } from "./MUIBlockTabs.types";

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<any>()((theme, props) => ({
  rootTabsContainer: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `0 ${props.paddingX || "0"} `,
  },
  liststylecustom:{
    "&:not(:first-child)":{
      flex:1,
    },
    // flex:1,
    borderRight:'1px  solid #E1E1E1'
  },
  borderLeft: {
    borderLeft: `1px solid ${theme.palette.colors.gray[100]}`,
  },
  threeDoticon: {
    width: "40px",
    height: "40px",
    background: `${theme.palette.colors.system.white} !important`,
    borderRadius: "8px",
    padding: 0,
  },
  threeDotMenuStyle: {
    "& .MuiTooltip-tooltip": {
      translate: "-8px 8px !important",
      borderRadius: "8px !important",
    },
  },
  tabLabel: {
    maxWidth: "100px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  botBox: {
    display: "flex",
    gap: "2px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  dotIcon: {
    display: "inline-block",
    height: "4px",
    width: "4px",
    borderRadius: "50%",
    background: theme.palette.colors.gray[100],
    '&[data-blackdot="true"]': {
      background: theme.palette.colors.theme.primary,
    },
    '&[data-bluedot="true"]': { background: theme.palette.colors.system.link },
    '&[data-reddot="true"]': { background: theme.palette.colors.system.delete },
  },
  // rootTabsContainer: {
  //   display: "flex",
  //   gap: "10px",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   padding: `0 ${(props as any).paddingX || "0"} `,
  //   "& .MuiTabs-scrollButtons": {
  //     display: "none",
  //   },
  // },
  // borderLeft: {
  //   borderLeft: `1px solid ${theme.palette.colors.gray[100]}`,
  // },
  // threeDoticon: {
  //   width: "40px",
  //   height: "40px",
  //   background: `${theme.palette.colors.system.white} !important`,
  //   borderRadius: "8px",
  //   padding: 0,
  // },
  // threeDotMenuStyle: {
  //   "& .MuiTooltip-tooltip": {
  //     translate: "-8px 8px !important",
  //     borderRadius: "8px !important",
  //   },
  // },
  // tabLabel: {
  //   maxWidth: "100px",
  //   overflow: "hidden",
  //   textOverflow: "ellipsis",
  //   whiteSpace: "nowrap",
  // },
  // botBox: {
  //   display: "flex",
  //   gap: "2px",
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // dotIcon: {
  //   display: "inline-block",
  //   height: "4px",
  //   width: "4px",
  //   borderRadius: "50%",
  //   background: theme.palette.colors.gray[100],
  //   '&[data-blackdot="true"]': {
  //     background: theme.palette.colors.theme.primary,
  //   },
  //   '&[data-bluedot="true"]': { background: theme.palette.colors.system.link },
  //   '&[data-reddot="true"]': { background: theme.palette.colors.system.delete },
  // },
}));

export const TabsStyled = withStyles(Tabs, (theme) => ({
  root: {
    width: "100%",
    minHeight: "40px",
    background: theme.palette.colors.gray[25],
    border: `1px solid ${theme.palette.colors.gray[100]}`,
    borderRadius: "8px",
    overflow: "hidden",
  },
  indicator: {
    display: "none",
  },
  flexContainer: {
    "& > .MuiButtonBase-root": {
      borderRight: `1px solid ${theme.palette.colors.gray[100]}`,
      "&:last-child": {
        borderRight: `1px solid transparent`,
      },
    },
  },
}));

export const TabStyled: any = withStyles(Tab, (theme) => ({
  root: {
    textTransform: "initial",
    color: theme.palette.colors.gray[400],
    position: "relative",
    flexGrow: 1,
    maxWidth: "100% !important",
    width:'100%',
    minWidth: "fit-content !important",
    minHeight: "40px !important",
    height: "100%",
    display: "flex",
    gap: "8px",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "0 12px",
    "&::after": {
      content: "unset",
    },
    // TODO: Following code to be removed if exisiting works fine
    // '& .MuiButtonBase-root': {
    //   height: '100%',
    //   display: 'flex',
    //   gap: '8px',
    //   flexDirection: 'row',
    //   justifyContent: 'flex-start',
    //   alignItems: 'center',
    //   padding: '0 12px',
    // },
  },
  selected: {
    backgroundColor: theme.palette.colors.system.white,
    color: `${theme.palette.colors.theme.primary} !important`,
  },
}));
