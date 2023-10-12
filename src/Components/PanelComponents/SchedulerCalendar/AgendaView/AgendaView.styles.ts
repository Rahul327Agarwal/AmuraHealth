import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    padding: '0 20px',
    overflowX: 'hidden',
  },
  date: {
    display: 'block',
    borderBottom: '1px solid #252427',
    marginBottom: '16px',
    marginTop: '42px',
  },
  wrapper:{
    display:'flex',
    justifyContent:'center',
    alignItems:'self-start',
    background:theme.palette.colors.system.white,
    padding: '32px',
    gap: '32px',
    margin: '50px 45px 0px 45px',
    boxShadow: ' 2px 2px 54px 0px #0000000D', // 2px 2px 54px rgba(0, 0, 0, 0.05);
    borderRadius: '24px',
    flexDirection:'column'
  },
  subHeaderStyle:{
    color:'#A6A6A6',
    display:'block',
    marginBottom:'6px'
  },
  mainHeading:{
    marginBottom:'6px',
    color:'#252427'
  }
}));
