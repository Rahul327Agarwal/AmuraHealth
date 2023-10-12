import { makeStyles } from "tss-react/mui";

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  wrapper: {
    position: "relative",
    height: "100%",
    background: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    // overflowY:"auto",
    // overflowX:"hidden",
    padding: "20px !important",
    "& .middleContainer": {
      paddingLeft: "37px !important",
    },
  },

  headerWrap: {
    display: "flex",
    minHeight: "22px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    // height:"80px",
    alignItems: "center",
  },
  backArrowStyle: {
    "& svg": {
      marginRight: "8px",
      "& path": {
        fill: "#5C5A61 !important",
      },
    },
    "& path": {
      fill: "#5C5A61 !important",
    },
  },
  caption: {
    color: "#A6A6A6",
    display: "block",
    paddingLeft: "32px",
    transform: "translateY(-9px)",
    marginBottom: "40px",
    marginTop: "10px",
  },
  slideItem: {
    position: "relative",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  imgWrap: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "144px",
    width: "144px",
    borderRadius: "50%",
    border: "2px solid #A6A6A6",
  },
  imgCaption: {
    display: "block",
    marginBottom: "14px",
    color: "#A6A6A6",
  },
  textCenter: {
    display: "block",
    textAlign: "center",
  },
  playVedio: {
    color: "#252427",
    display: "inline-block",
    marginLeft: "5px",
  },
  playBtnWrap: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    paddingTop: "30px",
    marginBottom: "30px",
  },
  // description: {
  //   color: "#5C5A61",
  //   padding: "0 40px",
  //   minHeight: "auto",
  //   marginTop:"20px",
  // },
  description: {
    padding: "30px 0px 0px 0px",
    textAlign: "center",
    "& p": {
      wordBreak: "break-word",
    },
  },
  slideContent: {
    position: "relative",
  },
  buttonWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "32px",
    marginTop: "20px",
  },
  playBtns: {
    margin: "0px 5px",
    cursor: "pointer",
  },
  backBtn: {},
  pauseBtn: {},
  nextBtn: {},
  stepsNumber: {
    color: "#5C5A61",
    textAlign: "center",
    margin: "0 12px",
    // width:"80px"
  },
  totalSteps: {
    color: "#5C5A61",
    paddingLeft: "5px",
  },
  finalWrapper: {
    // display: 'flex',
    // flexDirection: 'column',
    // flexFlow: 'column',
    // alignContent: 'center',
    // justifyContent: 'center',
    overflow: "auto",
  },
  finalImg: {
    marginBottom: "40px",
    display: "flex",
    justifyContent: "center",
  },
  finalContent: {
    color: " #5C5A61",
    textAlign: "center",
    width: "85%",
    margin: "0 auto",
    marginBottom: "44px",
  },
  finalScreenWrapper: {
    textAlign: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    overflow: "auto",
    margin: "0 -20px",
  },
  prevLink: {
    cursor: "pointer",
    marginTop: "20px",
    textAlign: "center",
    display: "block",
  },
  recipeImg: {
    height: "140px",
    width: "230px",
    display: "block",
    margin: "auto",
  },
  footerWrapper: {
    position: "relative",
  },
  footerContent: {
    // position:"fixed",
    // bottom:"7px",
    // width:"315px",
    // display:"flex",
    // justifyContent:"center",
    // marginLeft:"6%",
    background: "#ffffff",
  },
  hidden: {
    // display:"none",
    visibility: "hidden",
    margin: "0px 5px",
  },
  scrollBody: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    // gap: '31px',
    overflowY: "auto",
    overflowX: "hidden",
    margin: "0 -16px",
    padding: "0 16px",
  },
}));
