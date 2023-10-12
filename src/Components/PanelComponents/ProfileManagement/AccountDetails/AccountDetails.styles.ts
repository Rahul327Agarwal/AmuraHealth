import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  container: {
    flexGrow: 1,
    overflow: "auto",
    margin: "0 -20px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    paddingBottom: "20px",
  },
  pannelFooterStyle: {
    margin: "auto -20px -20px",
  },
  changePassword:{
   color: "#373639 !important",
  }
}));
