import { makeStyles } from 'tss-react/mui';
export const useStyles = makeStyles()((theme) => ({
    unitSelectButton: {
    marginLeft: '2px',
    cursor: 'pointer',
    '&:hover': {
      color: '#00ffcc !important',
    },
  },
  allergenCard: {
    margin: '4px 6px',
    padding: '10px 10px',
    "& span":{
        fontSize: '14px !important' 
    },
    '&:hover': {
      background: '#171d20',
      boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)',
    },
  },
  allergyTitle: {
    fontSize: "16px !important",
    marginLeft: "0px !important",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    marginBottom: "0px !important"
  },
  allergenHeader: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer"
  },
}));
