import { makeStyles } from "tss-react/mui";
export const useStyles = makeStyles()((theme) => ({
  primary: {
    background: "#F1F1F1",
    borderRadius: "8px",
    margin: "0px 0px",
  },
  wrap: {
    margin: "8px 0px 16px 0px",
  },
  wrapper: {
    display: "flex",
    // justifyContent:'center',
    alignItems: "center",
    width: "100%",
    padding: "12px 0 8px 8px",
  },
  wrapperMylist: {
    display: "flex",
    // justifyContent:'center',
    alignItems: "center",
    width: "100%",
    padding: "29px 0 18px 8px",
  },
  heading: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  Eventwrapper: {
    display: "flex",
    // justifyContent:'center',
    alignItems: "center",
    width: "100%",
  },
  mainDiv: {
    padding: "12px 12px 8px 8px",
    flex: 1,
    width: "80%",
  },
  textLight: {
    color: "#5C5A61",
    display: "block",
  },
  subHeading: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  scrollButton: {
    background: "#E1E1E1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "36px",
    width: "36px",
    borderRadius: "4px",
  },
  nameWrap: {
    marginTop: "12px",
  },
  name: {
    color: "#5C5A61",
    marginRight: "24px",
  },
  percent: {
    marginLeft: "12px",
    padding: "2px 6px",
    color: "#FFFFFF",
    background: "#000000",
    borderRadius: "14px",
  },
  timeWrap: {
    border: "1px solid #5C5A61",
    borderRadius: "14px",
    color: "#5C5A61",
    padding: "2px 6px",
    marginLeft: "16px",
    fontSize: "10px",
  },
}));
