import { makeStyles } from 'tss-react/mui';
import { IProps } from './KnowledgeBaseCard.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme, props) => ({
  cardWrap: {
    background: '#F1F1F1',
    padding: '12px 16px 12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    cursor: 'pointer',
    height: '92px',
    borderRadius: '8px',
    marginBottom: '10px',
    gap: '16px',
  },
  imgWrap: {
    background: '#626262',
    height: '60px',
    width: '60px',
    borderRadius: '50%',
    position: 'relative',
  },
  logoIcon: {
    position: 'absolute',
    top: '40px',
    zIndex: 1,
    left: '44px',
  },
  profilePic: {
    borderRadius: '50%',
    height: '60px',
    width: '60px',
    color: '#FFFFFF',
    position: 'relative',
    fontSize: '12px',
    fontFamily: 'Graphik',
    fontWeight: 400,
    background: '#E1E1E1',
  },
  cardContentWrap: {
    width: 'calc(100% - 76px)',
  },
  cardTitle: {
    color: theme.palette.colors.theme.primary,
    display: 'block',
    marginBottom: '8px',
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  discription: {
    color: theme.palette.colors.gray[500],
    // display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    wordBreak: 'break-word',
  },
  flexWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
  },
  heading: {
    color: '#252427',
    marginBottom: '12px',
  },
  description: {
    color: '#5C5A61',
    wordBreak: 'break-word',
  },
  headerDiv: {
    padding: '0 16px',
    transition: 'transform 0.3s ease-in-out',
    "&[data-shadow='true']": { boxShadow: '4px 0px 24px 0px #00000026' },
  },

  expendedViewMainContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },

  scrollBody: {
    flex: '1',
    overflow: 'auto',
    padding: '0 16px',
  },
  headerWrapper: {
    margin: '12px 0',
  },
  disable: {
    pointerEvents: 'none',
    cursor: 'default',
    '& svg': {
      '& path': {
        fill: '#A6A6A6',
      },
    },
  },
  cursorPointer: {
    cursor: 'pointer',
    marginRight: '16px',
  },
  chatHeader: {
    background: theme.palette.colors.gray[50],
    padding: '16px',
    wordBreak: 'break-word',
  },
  KBmain: {
    // padding: '16px',
    // boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.01)',
    // borderRadius: '8px 0px 8px 8px',

    margin: '0px 10px 20px 10px',
  },
  rightReadDetailBox: {
    color: theme.palette.colors.gray[400],
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px',
    justifyContent: 'right',
    marginRight: '20px',
  },
  hightLightText: {
    color: theme.palette.colors.theme.primary,
    '& mark': {
      backgroundColor: 'mark', //'#33252427',
      padding: '0px',
      //opacity:0.2
    },
    '& span': {
      color: '#007AFF',
    },
    '& span.tagged': {
      padding: '0 !important',
      backgroundColor: 'transparent !important',
      color: theme.palette.colors.blue[400],
    },
  },
  downArrow:{
    fill:"#5C5A61",
    position: 'absolute',
    top: 0,
    right: 0,
  },
  downArrowBG:{
    position: 'absolute',
    width: '25px',
    top: 0,
    right: 0,
    height: '25px',
    background: theme.palette.colors.gray[25],
    filter: 'blur(5px)',
    '&.bgDarkRight': {
      background: ' #E1E1E1',
    },
    '&.Right': {
      background: theme.palette.colors.gray[50],
    },
    '&.switchBgRight': {
      background: theme.palette.colors.gray[25],
    },
    '&.bgTeamRight': {
      background: theme.palette.colors.gray[50],
    },
    '&.Left': {
      background: theme.palette.colors.gray[25],
    },
    '&.switchBgLeft': {
      background: theme.palette.colors.gray[50],
    },
  },
  downArrowWrapper:{
    position: 'relative',
    float: 'right',
    left: '10px',
    zIndex: 100,
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
