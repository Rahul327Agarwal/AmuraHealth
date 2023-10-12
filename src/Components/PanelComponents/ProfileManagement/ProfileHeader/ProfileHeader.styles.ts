import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainProfileHeader: {
    display: "grid",
    gridTemplateColumns: "84px calc(100% - 108px)",
    columnGap: "24px",
    rowGap: "5px",
  },
  profileImageBox: {
    position: "relative",
  },
  profileAvatar: {
    height: "84px",
    width: "84px",
    textTransform: "uppercase",
    // backgroundColor: "transparent",
    color: "#FFFFFF",
    position: "relative",
    fontWeight: 400,
    backgroundColor: theme.palette.colors.gray[900],
  },
  profileEditBottom: {
    background: `${theme.palette.colors.theme.primary} !important`,
    position: "absolute",
    bottom: "0",
    right: "0",
    border: `3px solid ${theme.palette.colors.system.white}`,
    height: "36px",
    width: "36px",
    padding: 0,
    translate: "15% 15%",
    "& svg": {
      width: "16px",
      height: "16px",
    },
  },
  profileDetailsBox: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    justifyContent: "center",
  },
  profileName: {
    marginBottom: "4px",
    color: theme.palette.colors.theme.primary,
  },
  textOverflow: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  },
  profileUserName: {
    color: theme.palette.colors.gray[400],
  },
  editableButton: {
    gridArea: "2/2",
    width: "fit-content",
    padding:"5px 16px !important",
    background:'#373639 !important',
    display:'flex',
    alignItems:'center',
    "& svg":{
      height:'16px',
      width:'14px'
    }
  },
}));
