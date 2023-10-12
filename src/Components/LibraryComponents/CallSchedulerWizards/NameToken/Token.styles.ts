import { makeStyles } from 'tss-react/mui';
import { IProps } from './Token.types';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, props) => ({
  '& *': {
    boxSizing: 'border-box',
  },

  // padding: ({ paddingX }: any) => `0 ${paddingX || "0"} `,

  // middleContainer: (props: IProps) => ({

  mainContainer: {
    maxHeight: '48px',
    //maxWidth: '250px',
    borderRadius: '64px',
    border: `1px solid ${theme.palette.colors.gray[100]}`, //#E1E1E1
    background: theme.palette.colors.system.white, // #FFFFFF
    padding: '8px 12px 8px 8px',
    display: 'flex',
    flexDirection: 'row',
    width: ' fit-content',
    alignItems: 'center',
    '& *': {
      boxSizing: 'border-box',
    },
  },
  avatarContainer: {
    width: '32px',
    height: '32px',
    position:'relative'
  },
  icon:{
    position:'absolute',
    border:'1px solid #FFFFFF',
    right:'-3px',
    bottom:'0px',
    width: '12px',
    height: '12px',
    borderRadius:'50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center'
  },
  avatarBorder: {
    color: `${theme.palette.colors.system.white} !important`,
    fontSize: '12px !important',
    fontWeight: 600,

    //border: `1px solid ${theme.palette.colors.gray[100]}`, //#E1E1E1
    //padding: '2px',
    height: '100% !important',
    width: '100% !important',
    backgroundColor: theme.palette.colors.gray[900],
    '& .MuiSvgIcon-root': { visibility: 'visible' },
    '& .MuiChip-root .MuiChip-avatar': { color: '#000' },
    '& img': {
      borderRadius: '50%',
      color: '#00000',
    },
  },
  subContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: `calc(100% - 32px)`,
    alignItems:'center',
    gap:'16px'
  },
  contentContainer: {
    marginLeft: '8px',
    height: '38px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '200px',
  },
  userNameStyle: {
    color: theme.palette.colors.gray[500], //#5C5A61
  },
  marginBottom:{
    marginBottom:'4px'
  },
  roleNameStyle: {
    color: theme.palette.colors.gray[500], //A6A6A6
  },
  longTexthandle: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  dotStyles: {
    '& > svg > circle': {
      fill: `${props.dotColor || 'red'}`,
    },
    display: 'flex',
    alignItems: 'center',
    margin: '0px 4px 0px 12px',
  },
  flex:{
    display:'flex',
    alignItems:'center',
    gap:'4px',
    color:'#A6A6A6'
  },
  crossIcon:{
    display: 'flex',
    alignItems: 'center',
    cursor:'pointer',
    marginRight:'4px',
    '& svg':{
      height:'10px',
      width:'10px',
      '& path':{
        fill:'#5C5A61'
      }
    }
  }
}));
