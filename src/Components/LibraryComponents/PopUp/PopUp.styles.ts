import { makeStyles } from "tss-react/mui";
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  padding8px: {
    padding: "8px",
  },
  paddingBottom0px: {
    paddingBottom: "0px",
  },
  padding4px: {
    padding: "4px",
  },
  margin8px: {
    margin: "8px",
  },
  buttonWidth: {
    width: "42px",
  },
  flexButtons: {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    margin: "4px",
  },
  headerGrid: {
    display: "grid",
    gridTemplateColumns: "calc(100% - 32px) 32px",
    padding: "4px",
  },
  header: {
    //fontfamily: "Inter",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "30px",
  },
  body: {
    color: "#AEAEAE",
    //fontfamily: "Inter",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "18px",
  },
  closeCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    "& .MuiDialogTitle-root": {
      padding: "0px",
    },
    "& .MuiDialogActions-root": {
      display: "block",
    },
    "& .MuiDialog-paper": {
      borderRadius: "10px",
      background: "#3F4044",
    },
    "& .MuiBackdrop-root": {
      background: "none",
    },
    "& .MuiDialog-container": {
      background: "#1b1b1bb3",
    },
  },
  dialogContent: {
    padding: "8px !important",
  },
}));
