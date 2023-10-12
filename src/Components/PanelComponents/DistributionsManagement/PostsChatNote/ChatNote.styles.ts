import { makeStyles } from "tss-react/mui";
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  messageBody: {
    flex: "1",
    overflow: "auto",
    position: "relative",
    padding: "8px 12px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  notesPanel: {
    background: theme.palette.colors.system.white,
    height: "inherit",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  reAnswerQuestion: {
    color: theme.palette.colors.theme.primary,
    marginBottom: "40px",
  },
  drawerFooter: {
    margin: "-20px",
    marginTop: "0",
  },
  calenderBox: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    background: theme.palette.colors.gray[25],
    paddingBottom: "32px",
  },
  calenderButton: {
    marginLeft: "auto",
    marginRight: "20px",
    marginTop: "-10px",
  },
  questionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    color: theme.palette.colors.gray[500],
  },
  inputDrawerBox: {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
  },
  sendButton: {
    width: "48px",
    height: "48px",
    background: `${theme.palette.colors.theme.primary} !important`,
    boxSizing: "border-box",
    boxShadow:
      "0px 4px 14px rgba(0, 0, 0, 0.25), inset 0px 4px 14px rgba(255, 255, 255, 0.25)",
    borderRadius: "4px",
    "&.Mui-disabled": {
      opacity: "0.5 !important",
    },
  },
  selectInputDrawerBox: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    background: theme.palette.colors.gray[25],
    padding: "24px 16px",
  },
  selectInputWrapper: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
  },
  selectInputWrapperWithlabel: {
    display: "flex",
    alignItems: "baseline",
    gap: "10px",
  },
  selectTimeStyle: {
    "& .MuiPopover-paper": {
      maxHeight: "120px",
    },
  },
  selectInputButton: {
    marginLeft: "auto",
  },
  labelHeader: {
    color: theme.palette.colors.theme.primary,
    padding: "0px 40px 0 0",
  },
  inputTimeStyle: {
    "& input[type='time']::-webkit-calendar-picker-indicator": {
      background: "none !important",
    },
    "& input[type='time']::-webkit-datetime-edit-year-field:not([aria-valuenow])":
      {
        color: "transparent !important",
      },
    "& input[type='time']::-webkit-datetime-edit-month-field:not([aria-valuenow]) ":
      {
        color: "transparent !important",
      },
    "& input[type='time']::-webkit-datetime-edit-day-field:not([aria-valuenow])":
      {
        color: "transparent !important",
      },
  },
  timeType: {
    "& .MuiFilledInput-input": {
      height: "43px !important",
    },
    "& .MuiFilledInput-root:after": {
      border: "1px solid black !important",
    },
  },
}));
