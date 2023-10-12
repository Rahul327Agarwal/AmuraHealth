import { styled } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  headerWrap: {
    backgroundColor: theme.palette.colors.system.white,
    height: 'inherit',
    //padding: ' 32px 20px 24px',
    //overflow: 'auto',
  },
  heading: {
    color: theme.palette.colors.gray[900], //"#252427",
    margin: '0',
    wordBreak: 'break-word',
  },
  labelContainer: {
    width: '100%',
    display: 'grid',
    height: '27px',
    gap: '12px',
    gridTemplateColumns: '27px calc(100% - 40px)',
    alignItems: 'center',
  },
  labelStyle: {
    background: '#A6A6A6',
    textAlign: 'center',
    borderRadius: '4px',
    color: 'white',
  },
  labelOption: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
  },
  noResult: {
    minHeight: 'inherit',
    width: '100%',
    display: 'grid',
    placeItems: 'center',
    fontFamily: 'Graphik !important',
    fontSize: '20px',
    fontWeight: 500,
    color: theme.palette.colors.theme.primary,
  },
  title: {
    color: theme.palette.colors.gray[500], //"#5C5A61",
    marginTop: '10px',
    marginBotom: '0px',
    wordBreak: 'break-word',
  },
  mainhead: {
    display: 'flex',
    gap: '16px',
  },
  iconStyle: {
    cursor: 'pointer',
    // "& svg": {
    //   width: "30px",
    //   height: "30px",
    // },
    '& path': {
      fill: '#5C5A61',
    },
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    marginBottom: '24px',
    paddingTop: '8px',
  },
  Headerflex: {
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: "center",
    boxSizing: 'border-box',
    marginBottom: '24px',
    paddingTop: '8px',
  },
  iconwrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: theme.palette.colors.gray[50], //"#F1F1F1",
    width: '32px',
    height: '32px',
  },
  mainwrapper: {
    padding: '0px 0px',
  },
  mainwrapper2: {
    paddingBottom: '10px',
  },
  headerwrapper: {
    padding: '32px 20px 0px',
  },
  scroll: {
    height: 'calc(100% - 180px)',
    overflow: 'auto',
    padding: '0px 20px',
  },
  divborder: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '24px 20px',
    gap: '24px',
    width: '100%',
    //height: "328px",
    background: '#F8F8F8',
    border: '1px solid #E9E8E8',
    borderRadius: '8px',
    flex: 'none',
    order: 2,
    flexGrow: 0,
  },
  docpreview: {
    position: 'relative',
    borderRadius: '8px',
    width: '100%',
    height: '200px',
  },

  radioDiv: { padding: '20px' },
  radiolabel: {
    display: 'inline-block',
    position: 'relative',
    width: '100px',
    color: 'black !important',
  },
  radiodevrigth: {
    float: 'right',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    border: '2px solid #999',
    transition: '0.2s all linear',
    marginRight: '5px',
    position: 'relative',
    top: '4px',
  },
  squaredivbox: {
    cssFloat: 'left',
    width: '100px',
    height: '100px',
    background: ' #A6A6A6',
    padding: '4px',
    gap: '10px',
    color: 'white',
    textAlign: 'center',
    borderRadius: '4px',
  },
  videocontainer: {
    position: 'relative',
    width: '100%',
  },
  rightAudioBox: {
    padding: '18px 16px',
    background: theme.palette.colors.gray[50],
  },
  attachedVideo: {
    boxSizing: 'border-box',
    padding: '24px 20px',
    width: '100%',
    background: '#F8F8F8',
    border: '1px solid #E9E8E8',
    borderRadius: '8px',
  },
  audioHeading: {
    marginBottom: '26px',
    marginTop: '0px',
  },
  AudioImg: {
    width: '100%',
    height: '160px',
    borderRadius: '8px',
    background: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeVideo: {
    width: '100%',
    height: '220px',
    borderRadius: '8px',
    marginBottom: '16px !important',
  },
  radioWrapper: {
    marginTop: '20px',
    '& span': {
      color: '#5C5A61 !important',
    },
  },
  videothumbnail: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    msTransform: 'translate(-50%, -50%)',
    padding: '12px 12px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '15px',
    textAlign: 'center',
  },
  post_preview: {
    marginBottom: '27px',
  },
  footerWrapper: {
    padding: '20px',
  },
}));

export const MenuListStyled = styled('ul')({
  margin: 0,
  width: '100%',
  listStyleType: 'none',
  padding: '10px 0',
  //marginBottom: "25px",
  paddingRight: '6px',
});

export const MenuListItemStyled = styled('li')(({ theme, optionsTypeReverse, isDivider }: any) => ({
  color: theme.palette.colors.gray[500],
  fontSize: '20px',
  fontFamily: 'Graphik',
  transition: '.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  flexDirection: optionsTypeReverse ? 'row-reverse' : 'row',
  //cursor: "pointer",
  marginBottom: '16px',
  // borderBottom: isDivider
  //   ? `1px solid ${theme.palette.colors.gray[100]}`
  //   : "none",
  '&:last-child': { borderBottom: 'none' },
  '& > :nth-child(1)': { width: '100%' },
  '& > :nth-child(2)': { width: '30px' },
}));
