import { makeStyles } from "tss-react/mui";

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  shiftSegments: {
    margin: "8px",
    border: "1px solid #3F4044",
    boxSizing: "border-box",
    borderRadius: "5px",
    padding: "4px 0px 9px 0px",
  },
  shiftSegmentHeader: {
    padding: "5.5px 8px",
    display: "flex",
  },
  shiftHeaderSpan: {
    //fontfamily: 'Inter',
    fontStyle: "normal",
    fontHeight: 500,
    fontSize: "14px",
    lineHeight: "18px",
    color: "#FFFFFF",
    flex: "auto",
  },
  alignCenter: {
    display: "flex",
    alignItems: "center",
  },
  shiftTimings: {
    padding: "4px",
  },
  shiftTime: {
    display: "flex",
  },
  shiftDates: {
    //fontfamily: 'Inter',
    fontStyle: "normal",
    fontHeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
    color: "#FFFFFF",
    flex: "auto",
  },
  shiftTiming: {
    //fontfamily: 'Inter',
    fontStyle: "normal",
    fontHeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
    color: "#AEAEAE",
  },
  marginTop12px: {
    marginTop: "12px",
  },
  RoleDetails: {
    margin: "0px 8px",
  },
  RoleDetailsHeader: {
    padding: "4px",
    display: "flex",
  },
  RoleHeaderSpan: {
    //fontfamily: 'Inter',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
    color: "#00FFCC",
    flex: "auto",
  },
  IconsSpan: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: "4px",
    cursor: "pointer",
  },
  ReportsTo: {
    padding: "4px",
  },
  marginTop16px: {
    marginTop: "16px",
  },
  ReportsToNames: {
    //fontfamily: 'Inter',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "18px",
    color: "#FFFFFF",
  },
  Reportees: {
    padding: "4px",
  },
  ReporteesNames: {
    //fontfamily: 'Inter',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "18px",
    color: "#AEAEAE",
  },
  RoleDate: {
    padding: "4px",
  },
  RoleStartDate: {
    //fontfamily: 'Inter',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
    color: "#AEAEAE",
  },
  PanelHeader: {
    marginBottom: "12px",
  },
  PanelName: {
    //fontfamily: 'Inter',
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "30px",
    color: "#FFFFFF",
  },
  card: {
    backgroundColor: theme.palette.colors.theme.primary,
    padding: "8px",
    borderRadius: "10px",
    marginBottom: "8px",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)",
    },
  },
  checkBox: {
    padding: "0px !important",
  },
}));
