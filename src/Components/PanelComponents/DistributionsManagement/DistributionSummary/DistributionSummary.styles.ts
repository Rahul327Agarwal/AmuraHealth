import { makeStyles } from 'tss-react/mui';
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    position: "relative",
    height: "inherit",
    backgroundColor: theme.palette.colors.gray[50],
    boxSizing: "border-box",
  },
  nameChardWrapper: {
    "& > div:first-child": { borderTop: "none", "&::before": { top: 0 } },
    "& > div:last-child": { borderBottom: "none", "&::before": { bottom: 0 } },
    height: "calc(100% - 170px)",
  },
  addButton: {
    position: "absolute",
    right: "20px",
    bottom: "56px",
    transform: "translateY(50%)",
    background: `${theme.palette.colors.gray[900]} !important`,
    "& path": {
      fill: `${theme.palette.colors.system.white} !important`,
    },
  },
  addmargin: {
    marginBottom: "16px",
  },
}));
