import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  cardWrap: {
    padding: '12.5px 0px',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
  },
  contentWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  IDnumber: {
    fontSize: '12px',
    padding: '0px 15px',
  },
  imgWrap: {
    width: '38px',
    height: '38px',
    background: '#F5F6F8',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  description: {
    fontSize: '12px',
    margin: '0px 12px',
    marginLeft: '12px',
    // whiteSpace: "nowrap",
    // overflow: "hidden",
    // textOverflow: "ellipsis"
  },
}));
