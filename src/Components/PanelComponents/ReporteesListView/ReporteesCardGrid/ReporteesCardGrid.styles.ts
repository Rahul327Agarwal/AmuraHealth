import { makeStyles } from 'tss-react/mui';
import { IProps } from './ReporteesCardGrid.types';
export const useStyles = makeStyles<IProps>()((theme, { level, allowSelect, active }) => ({
  mainContainer: {
    display: 'flex',
    borderTop: `1px solid ${theme.palette.colors.system.white}`,
    borderBottom:active?  `1px solid ${theme.palette.colors.gray[50] }` : 'none',
    backgroundColor: active ? theme.palette.colors.system.white : theme.palette.colors.gray[50],
    cursor: 'pointer',
    // height: '88px',
    '& *': { boxSizing: 'border-box' },
  },
  gridViews: {
    display: 'grid',
    gridTemplateColumns: `repeat(${level},28px)`,
  },
  bodyContainer: {
    display: 'grid',
    height: '100%',
    flexGrow: 1,
    padding: '14px 16px 14px 20px',
    position: 'relative',
    gap: '10px',
  },
  nameContainer: {
    display: 'grid',
    gridTemplateColumns: allowSelect ? 'calc(100% - 137px) 132px' : 'calc(100% - 77px) 72px',
    alignItems: 'center',
    gap: '8px',
    marginBottom:'12px'
    // height: '24px',
    //marginLeft: '20px',
  },
  circleCon: {
    width: '20px',
    height: '20px',
    backgroundColor: theme.palette.colors.gray[500],
    borderRadius: '10px',
    color: theme.palette.colors.system.white,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    position: 'absolute',
    top: '16px',
    left: '-10px',
  },
  partyName: {
    color: theme.palette.colors.gray[500],
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  roleName: {
    color: theme.palette.colors.gray[400],
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    // gap: '5px',
  },
  codeContainer: {
    display: 'flex',
    // width: allowSelect ? '132px' : '72px',
    alignItems: 'center',
    height: '24px',
    justifyContent: 'end',
    gap: '30px',
  },
  caretIconStyle: {
    transform: 'rotate(0deg)',
    transition: 'transform 0.2s linear',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
  },
  open: {
    transform: 'rotate(180deg)',
    transition: 'transform 0.2s linear',
  },
  TBDiv: {
    display: 'grid',
    gridTemplateRows: '26px calc(100% - 26px)',
    height: '100%',
  },
  badgeContainer: {
    display: 'flex',
    gap: '16px',
    height: '22px',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // marginTop: '14px',
  },
  discriptionIcon: {
    cursor: 'pointer',
  },
  circularloader: {
    color: `${theme.palette.colors.gray[900]} !important`,
  },
  RLCode:{
    background: active ?  theme.palette.colors.gray[50] : theme.palette.colors.system.white,
    borderRadius:'4px',
    padding:'4px 8px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    '& span':{
      color:'#5C5A61'
    }
  },
  iconsContainer:{
    display:'flex',
    alignItems:'end',
    justifyContent:'end',
    gap:'28px'
  },
  arrowDiv:{
    width:'20px'
  }
}));

export const highlightBorder = (right, left) => ({
  borderRight: right ? `1px dashed #A6A6A6` : '',
  borderLeft: left ? '1px dashed #A6A6A6' : '',
  borderBottom: left ? '1px dashed #A6A6A6' : '',
  borderBottomLeftRadius: left ? '4px' : '',
});
