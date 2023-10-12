import { makeStyles } from "tss-react/mui";

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
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
    color: `${theme.palette.colors.gray[900]} !important`,
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
    color: `${theme.palette.colors.gray[900]} !important`,
    flex: "auto",
    marginBottom: "16px",
  },
  shiftTiming: {
    //fontfamily: 'Inter',
    fontStyle: "normal",
    fontHeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
    color: `${theme.palette.colors.gray[900]} !important`,
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
    color: `${theme.palette.colors.gray[900]} !important`,
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
    color: `${theme.palette.colors.gray[900]} !important`,
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
    color: `${theme.palette.colors.gray[900]} !important`,
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
    color: `${theme.palette.colors.gray[900]} !important`,
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
    color: `${theme.palette.colors.gray[900]} !important`,
  },
  card: {
    backgroundColor: theme.palette.colors.gray[25],
    padding: "16px 16px 0 16px",
    borderRadius: "8px",
    border: "1px solid #E1E1E1",
    marginBottom: "8px",
  },
  checkBox: {
    padding: "0px !important",
  },
  calenderIcon: {
    marginRight: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      height: "16px",
      width: "16px",
      "& path":{
        fill:theme.palette.colors.gray[500]
      }
    },
  },
  dflex: {
    display: "flex",
    gap: "10px",
    marginBottom: "16px",
  },
  days: {
    height: "24px",
    width: "24px",
    borderRadius: "50%",
    border: "1px solid #E1E1E1",
    color: "#5C5A61",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  daysSelected: {
    height: "24px",
    width: "24px",
    borderRadius: "50%",
    border: "1px solid #252427",
    color: "#252427",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  editHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));
