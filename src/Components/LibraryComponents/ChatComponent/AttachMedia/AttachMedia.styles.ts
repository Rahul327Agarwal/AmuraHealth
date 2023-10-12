import { makeStyles } from "tss-react/mui";

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mediaContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignItems: "center",
  },
  header: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  },
  photosBox: {
    display: "grid",
    placeItems: "center",
    "& img": {
      maxHeight: "264px",
      maxWidth: "333px",
      objectFit: "cover",
      borderRadius: "6px",
    },
  },
  videoPlayer: {
    width: "324px",
    height: "163px",
    borderRadius: "6px",
  },
  audioBox: {},
  musicIconBox: {
    width: "324px",
    height: "152px",
    background: theme.palette.colors.gray[25],
    display: "grid",
    placeItems: "center",
    "& svg": {
      width: "53px",
      height: "53px",
    },
  },
  audioPlayerBox: {
    background: theme.palette.colors.gray[50],
    padding: "18px",
    boxSizing: "border-box",
  },
  footer: {},

  fileDetails: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: theme.palette.colors.gray[500],
  },
  mediaWrapper: {
    width: "270px",
  },
  selectedFileCon: {
    margin: "36px",
    borderRadius: "6px",
    border: "1px solid red",
    width: "324px",
    height: "260px",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  functioniconsCon: {
    display: "flex",
    width: "calc(100% - 36px)",
    border: "1px solid red",
    justifyContent: "end",
    padding: "4px 0px",
  },
  funcIcon: {
    marginLeft: "20px",
    cursor: "pointer",
  },
  filesContainer: {
    width: "calc(100% - 32px)",
    display: "flex",
    border: "1px solid red",
    overflowX: "auto",
  },
  fileNameText: {
    //fontfamily: 'Inter',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "17px",
    lineHeight: "22px",
    color: theme.palette.colors.gray[500],
  },
  countStyle: {
    //fontfamily: 'Inter',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "17px",
    lineHeight: "22px",
    color: theme.palette.colors.gray[400],
    textAlign: "right",
    whiteSpace: 'nowrap',
  },

  nameandCountCon: {
    display: "grid",
    width: "calc(100% - 32px)",
    gridTemplateColumns: "auto 40px",
    padding: "4px",
    marginBottom: "8px",
  },
  eachIconDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0px 8px",
  },
  iconDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "60px",
    maxWidth: "60px",
    margin: "4px",
    height: "60px",
    borderRadius: "4px",
    backgroundColor: "url(sam-moghadam-khamseh-Lq1zv9qAJls-unsplash.jpg)",
    cursor: "pointer",
  },

  filesView: {
    width: "100%",
    height: "100%",
    borderRadius: "4px",
  },
  filesViewActive: {
    border: "3px solid #252427",
  },
  iconText: {
    color: theme.palette.colors.gray[400],
  },
  iconDivActive: {
    backgroundColor: "url(anna-pelzer-IGfIGP5ONV0-unsplash.jpg)",
    border: "3px solid #252427",
  },
  iconColor: {
    color: theme.palette.colors.system.white,
  },
  iconTextActive: {
    color: theme.palette.colors.gray[900],
  },
}));
