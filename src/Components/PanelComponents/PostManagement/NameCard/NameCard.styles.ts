import { makeStyles } from 'tss-react/mui';
import { IProps } from './NameCard.types';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme, { isBorderRadius, isClientSelected, isExtend, ...props }) => ({
  mainContainer: {
    display: 'flex',
    width: 'inherit',
    backgroundColor: isClientSelected ? theme.palette.colors.system.white : theme.palette.colors.gray[50],
    // borderTop: "1px solid #fff",
    borderBottom: '2px solid #fff',
    cursor: 'pointer',
    borderRadius: isBorderRadius ? '8px' : '0px',
    '& *': { boxSizing: 'border-box' },
    position: 'relative',
    height: isExtend ? '192px' : '',
  },
  bannerDiv: {
    width: '6px',
    height: 'inherit',
  },
  contentContainer: {
    padding: '12px 20px 12px 14px',
    flex: 1,
    width: 'inherit',
  },
  profilecontainer: {
    marginRight: '12px',
  },
  nameCardHeader: {
    marginBottom: '12px',
    display: 'grid',
    height: '64px',
    width: '100%',
    gridTemplateColumns: '54px calc(100% - 54px)',
  },
  nameContainer: {
    flex: 1,
  },
  nameContainerHead: {
    display: 'grid',
    gridTemplateColumns: 'auto 68px',
    alignItems: 'center',
    marginBottom: '8px',
  },
  nameConatinerHeadMenu: {
    flex: 0,
    display: 'flex',
    alignItems: 'center',
  },
  overlayStyle: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    position: 'absolute',
    backgroundColor: 'rgba(37, 36, 39, 0.5)',
    cursor: 'pointer',
    borderRadius: isBorderRadius ? '8px' : '0px',
    '& .ticIconStyle': {
      right: '24px',
      top: '50%',
      zIndex: 3,
      position: 'absolute',
      transform: 'translateY(-50%)',
    },
  },
  avatarCon: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  profilePic: {
    borderRadius: '50%',
    height: '44px',
    width: '44px',
    color: '#FFFFFF',
    position: 'relative',
    fontSize: '12px',
    fontFamily: 'Graphik',
    fontWeight: 400,
    backgroundColor: theme.palette.colors.gray[100],
  },
  profileDiv: {
    height: '47px',
    width: '47px',
    position: 'relative',
  },
  profilegroupCon: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
  contentCon: {
    marginLeft: '12px',
  },
  GreenDot: {
    display: 'block',
    height: '10px',
    width: '10px',
    position: 'absolute',
    zIndex: 1,
    right: '1px',
    top: '2px',
  },
  logoIcon: {
    display: 'block',
    height: '18px',
    width: '18px',
    position: 'absolute',
    top: '28px',
    zIndex: 1,
    left: '28px',
  },
  subContainer: {
    display: 'grid',
    gridTemplateColumns: '47px auto',
  },
  subContainer4: {
    display: 'grid',
    gridTemplateColumns: `${isExtend ? '116px' : 'auto 116px'}`,
    marginBottom: '8px',
  },

  subContainer2: {
    display: 'grid',
    gridTemplateColumns: 'auto 30%',
    alignItems: 'center',
    marginBottom: '8px',
  },
  lastCon: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    alignItems: 'center',
    justifyContent: 'sapce-between',
    marginTop: '12px',
  },
  subContainer3: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
  },
  dotIconDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
  },
  subContainer5: {
    display: 'grid',
    gridTemplateColumns: '30px auto',
    alignItems: 'center',
  },
  subContainer6: {
    display: 'grid',
    gridTemplateColumns: '60px auto 74px',
    alignItems: 'center',
    minHeight: '20px',
  },
  messageColor: {
    color: theme.palette.colors.gray[400],
    display: 'block',
  },
  MessageTime: {
    textAlign: 'right',
  },
  phaseContainer: {
    display: 'grid',
    backgroundColor: '#252427',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFFFFF',
    borderRadius: '4px',
    marginRight: '8px',
    height: '20px',
  },
  msgText: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  statusIcon: {
    marginRight: '12px',
    display: 'block',
    height: '24px',
  },
  iconGroup: {
    display: 'flex',
  },
  userNametext: {
    color: theme.palette.colors.gray[900],
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontWeight: 600,
    flex: 1,
    marginRight: '6px',
  },
  DotsDiv: {
    padding: '5px 4px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: !isClientSelected ? theme.palette.colors.system.white : theme.palette.colors.gray[50],
    borderRadius: '8px',
    boxShadow: 'inset 0px 0px 1px rgba(0, 0, 0, 0.25)',
    marginRight: '2px',
  },
  captionCon: {
    padding: '4px 8px',
    backgroundColor: props?.isBgWhite || isClientSelected ? theme.palette.colors.gray[50] : theme.palette.colors.system.white,
    borderRadius: '4px',
    width: 'fit-content',
    color: '#5C5A61',
    overflow: 'hidden',
    margin: '0px',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    height: '24px',
    lineHeight: 'unset !important',
    marginLeft: isExtend ? 'left' : 'auto',
  },
  textColor: {
    color: theme.palette.colors.gray[400],
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  floorbarStyle: {
    marginBottom: '20px',
  },
  timelineWrapper: {
    height: '16px',
  },
  timeLineWrapperExtended: {
    height: '30px',
    paddingTop: '16px',
  },
  nameContainerDesc: {
    display: 'flex',
    // justifyContent: "space-between",
    // gap: "10px",
  },
  leftBox: {},
  rightbox: {
    backgroundColor: !isClientSelected ? theme.palette.colors.system.white : theme.palette.colors.gray[50],
    padding: '4px 8px',
    borderRadius: '4px',
    flex: 0,
    maxWidth: '100%',
  },
  description: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    display: 'block',
    width: '100%',
  },
  gcStatusIcon: {
    '& rect': {
      fill: !isClientSelected ? theme.palette.colors.system.white : theme.palette.colors.gray[50],
    },
    '& path': {
      fill: props.edgeColor || '',
    },
  },
}));
//background: theme.palette.colors.theme.primaryLight,
