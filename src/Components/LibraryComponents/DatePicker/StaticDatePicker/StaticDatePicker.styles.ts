// @ts-nocheck
import { createTheme } from "@mui/material";
export const materialTheme = createTheme({
  overrides: {
    MuiIconButton: {
      root: { "&.Mui-disabled": { color: "#626262" } },
    },
    MuiTouchRipple: {
      root: {
        display: "none",
      },
    },
    MuiPickersStaticWrapper: {
      staticWrapperRoot: {
        backgroundColor: "#3f4044",
        width: "100%",
        borderRadius: "10px",
      },
    },
    MuiPickersBasePicker: {
      pickerView: {
        maxWidth: "100%",
      },
      container: {
        backgroundColor: "#3F4044",
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        display: "none",
      },
    },
    MuiPickersCalendar: {
      transitionContainer: {
        marginBottom: "16px",
      },
      week: {
        "& > *": {
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
        },
      },
    },
    MuiPickersCalendarHeader: {
      dayLabel: {
        flexGrow: 1,
        //fontfamily: "Inter",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "18px",
        color: "#FFFFFF",
      },
      iconButton: {
        outline: "none !important",
        backgroundColor: "#3F4044",
        color: "#FFFFFF",
        "&:hover": {
          backgroundColor: "#3F4044",
        },
      },
      transitionContainer: {
        //fontfamily: "Inter",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "16px",
        lineHeight: "24px",
        color: "#FFFFFF",
      },
    },
    MuiTypography: {
      body1: {
        //fontfamily: "Inter",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "16px",
        lineHeight: "24px",
        color: "#FFFFFF",
      },
    },
    MuiPickersDay: {
      day: {
        transition: "none",
        //fontfamily: "Inter",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "18px",
        color: "#FFFFFF",
        borderRadius: "4px",
        "&:hover": {
          backgroundColor: "#4B4E50",
        },
      },
      daySelected: {
        backgroundColor: "#00FFCC",
        color: "#1B1B1B",
        "&:hover": {
          backgroundColor: "#00FFCC",
        },
      },
      dayDisabled: {
        color: "#626262",
      },
      current: {
        color: "#00FFCC",
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: "#FFFFFF",
      },
    },
  },
});
