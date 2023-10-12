import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((themes) => ({
  headerWrap: {
    color: themes.palette.colors.gray[900],
  },
  description: {
    color: themes.palette.colors.gray[500],
    marginBottom: "30px",
    paddingTop: "10px",
  },
  Date: {
    marginTop: "20px",
    color: themes.palette.colors.gray[500],
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    width: "50%",
    marginBottom: "20px",
  },
  pmargin: { margin: "0" },
}));
