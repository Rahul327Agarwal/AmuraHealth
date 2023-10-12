import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<any>()((theme, props) => ({
  iconStyles: {
    fill: theme.palette.colors.gray[500],
    stroke: theme.palette.colors.gray[500],
    margin: '6%',
    border: '1px solid transparent',
    borderRadius: '4px',
    '& svg:hover': {
      fill: theme.palette.colors.gray[900],
      stroke: theme.palette.colors.gray[900],
      border: `1px solid ${theme.palette.colors.gray[900]}`,
      borderRadius: '4px',
    },
    '& svg': {
      border: '1px solid transparent',
      cursor: 'pointer',
    },
  },
  disabledPreview: {
    margin: '6%',
    fill: theme.palette.colors.gray[400],
    stroke: theme.palette.colors.gray[400],
  },
  disableApprove: {
    margin: '6%',
    fill: theme.palette.colors.gray[400],
    stroke: theme.palette.colors.gray[400],
  },
  footer: {
    display: 'grid',
    gridTemplateColumns: '33.33% 33.33% 33.33%',
    width: `${props.panelWidth}px`,
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  panelFooter: {
    backgroundColor: "#e1e1e1",
    borderRadius: "0px 0px 8px 8px",
    marginBottom: "0px !important",
    bottom: "0",
    height: "56px",
    position: "absolute",
    width: "100%"
  }
}));
