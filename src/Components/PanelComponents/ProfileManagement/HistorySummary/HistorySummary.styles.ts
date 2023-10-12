import { makeStyles } from 'tss-react/mui';
import { IProps } from "./HistorySummary.types";

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  container:{
    position:"relative",
    background:"#FFFFFF",
    height:"inherit",
   },
   Headerwrapper:{
    padding:"1rem",
   },
   noHistoryColor: {
    color: '#5C5A61',
  },
   nothingToShow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
    flexDirection: 'column',
    gap: '20px',
  },
   cardWrap:{
    height:"calc(100% - 72px)",
    overflowY:"auto",
    overflowX:"hidden",
    padding:"0 1rem",
   }
}));
