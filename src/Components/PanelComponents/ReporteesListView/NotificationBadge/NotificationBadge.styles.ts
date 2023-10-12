import { makeStyles } from 'tss-react/mui';
export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    display: 'flex',
    maxheight: '22px',
    maxWidth: '48px',
    boxSizing: 'border-box',
    '& *': { boxSizing: 'border-box' },
    gap: '4px',
  },
  circleContainer: {
    width: '22px',
    height: '22px',
    backgroundColor: theme.palette.colors.system.white,
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    boxShadow: '0px 4px 4px rgba(0,0,0,0.04)',
  },
  circle: {
    borderRadius: 'inherit',
    width: '15px',
    height: '15px',
    backgroundColor: '#252427',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: '15px !important',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
}));
