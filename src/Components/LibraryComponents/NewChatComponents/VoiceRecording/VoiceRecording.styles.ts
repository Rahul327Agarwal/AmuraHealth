import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  recorderContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "0 15px",
  },
  rightButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
  },
  label: {
    color: "#fff",
  },
  clearRecord: {
    color: "#FF8989",
    cursor: "pointer",
  },
  recordTime: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    width: "80px",
    "& svg": {
      color: "#FF4539",
    },
  },
  delete: {
    cursor: "pointer",
    marginRight: "25px",
  },
  audioContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "0 20px 0 10px",
  },
}));
