import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  postPreviewContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '26px',
  },
  dividerStyle: {
    backgroundColor: theme.palette.colors.gray[100],
  },
  addingPadding: {
    padding: '20px',
    border: '1px solid #E1E1E1',
    borderRadius: '8px',
    marginLeft:"30px"
  },
  headerWrap: {
    height: "calc(100% - 60px)",
    overflow: "auto",
    margin: "0 -1rem",
    padding: "0 1rem",
  },
  heading: {
    color: theme.palette.colors.gray[900], //"#252427",
    marginBottom: "0",
    wordBreak:"break-word"
  },
  title: {
    color: theme.palette.colors.gray[500], //"#5C5A61",
    marginTop: "10px",
    marginBottom: "0px",
    wordBreak:"break-word"
  },
  mainhead: {
    display: "flex",
    gap: "16px",
  },
  iconwrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    backgroundColor: theme.palette.colors.gray[50], //"#F1F1F1",
    width: "32px",
    height: "32px",
  },
  mainwrapper: {
    marginBottom: "20px",
  },

  divborder: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "24px 20px",
    gap: "24px",
    width: "100%",
    background: "#F8F8F8",
    border: "1px solid #E9E8E8",
    borderRadius: "8px",
    flex: "none",
    order: 2,
    flexGrow: 0,
  },
  docpreview: {
    position: "relative",
    borderRadius: "8px",
    width: "100%",
    height: "200px",
  },

  radioDiv: { padding: "20px" },
  radiolabel: {
    display: "inline-block",
    position: "relative",
    width: "100px",
    color: "black !important",
  },
  radiodevrigth: {
    float: "right",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    border: "2px solid #999",
    transition: "0.2s all linear",
    marginRight: "5px",
    position: "relative",
    top: "4px",
  },
  squaredivbox: {
    cssFloat: "left",
    width: "100px",
    height: "100px",
    background: " #A6A6A6",
    padding: "4px",
    gap: "10px",
    color: "white",
    textAlign: "center",
    borderRadius: "4px",
  },
  videocontainer: {
    position: "relative",
    width: "100%",
  },
  videothumbnail: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    msTransform: "translate(-50%, -50%)",
    padding: "12px 12px",
    border: "none",
    cursor: "pointer",
    borderRadius: "15px",
    textAlign: "center",
  },
  recipeVideo: {
    width: "100%",
    height: "220px",
    borderRadius: "8px",
    marginBottom: "16px !important",
  },
  AudioImg: {
    width: "100%",
    height: "160px",
    borderRadius: "8px",
    background: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  radioWrapper: {
    marginTop: "20px",
    "& span": {
      color: "#5C5A61 !important",
    },
  },
  dflex: {},
  titleWraper: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    boxSizing: "border-box",
  },
  iconStyle: {
    cursor: "pointer",
    "& path": {
      fill: "#5C5A61",
    },
  },
  rightAudioBox: {
    padding: "18px 16px",
    background: theme.palette.colors.gray[50],
  },
  attachedVideo: {
    boxSizing: "border-box",
    padding: "24px 20px",
    width: "100%",
    background: "#F8F8F8",
    border: "1px solid #E9E8E8",
    borderRadius: "8px",
  },
  audioHeading: {
    marginBottom: "26px",
    marginTop: "0px",
  },
  subTitle: {
    marginBottom: "2px",
    display: "block",
  },
  subPostTitle: {
    marginBottom: "24px",
    display: "block",
    color: "#A6A6A6",
  },
  postsWrapper: {
    display: "grid",
    gridTemplateColumns: " 30px calc(100% - 40px)",
    gap: "8px",
    marginBottom: "40px",
  },
  postsSubWrapper: {
    display: "grid",
    gridTemplateColumns: " 30px calc(100% - 40px)",
    gap: "8px",
  },
  postCount: {
    height: "27px",
    width: "27px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#5C5A61",
    color: "#FFFFFF",
    borderRadius: "4px",
  },
  postTitleWrapper: {
    display: "flex",
    //alignItems: "center",
    gap: "8px",
    marginBottom: "26px",
  },
  labelContainer: {
    width: "100%",
    display: "grid",
    height: "27px",
    gap: "12px",
    //gridTemplateColumns: "27px calc(100% - 85px) 24px",
    gridTemplateColumns: "27px calc(100% - 40px)",
    alignItems: "center",
  },
  labelStyle: {
    background: "#A6A6A6",
    textAlign: "center",
    borderRadius: "4px",
    color:"white"
  },
  labelOption: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "block"
  },
  noResult: {
    minHeight: "inherit",
    width: "100%",
    display: "grid",
    placeItems: "center",
    fontFamily: "Graphik !important",
    fontSize: "20px",
    fontWeight: 500,
    color: theme.palette.colors.theme.primary,
  },
  border: {
    border: "1px solid #E1E1E1",
    borderRadius: "8px",
    boxSizing: "border-box",
    padding: "14px",
    marginBottom: "24px",
  },
  wordWrap:{
    wordBreak:"break-word"
  }
}));
