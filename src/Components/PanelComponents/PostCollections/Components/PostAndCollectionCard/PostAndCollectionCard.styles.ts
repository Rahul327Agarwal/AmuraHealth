import { makeStyles } from 'tss-react/mui';
import { IProps } from './PostAndCollectionCard.types';

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps | any>()((theme, props) => ({
  mainContainer: {
    display: 'flex',
    backgroundColor: props.isBgWhite || props.isEmergency ? '#FFF' : '#F1F1F1',
    padding: '12px 20px',
    flexDirection: 'column',
    borderTop: '1px solid #fff',
    borderBottom: '1px solid #fff',
    cursor: 'pointer',
    borderRadius: props.isBorderRadius ? '8px' : '0px',
    '& *': { boxSizing: 'border-box' },
    position: 'relative',
    // cursor: handleSelect ? "pointer" : "initial",
    '&::before': {
      content: "''",
      position: 'absolute',
      bottom: '-2px',
      top: '-2px',
      left: 0,
      width: '6px',
      backgroundColor: props.isEmergency ? '#FF3B30' : 'transparent',
    },
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
    borderRadius: props.isBorderRadius ? '8px' : '0px',
    '& .ticIconStyle': {
      right: '24px',
      top: '50%',
      zIndex: 3,
      position: 'absolute',
      transform: 'translateY(-50%)',
    },
  },
  avatarCon: {
    padding: '0px 2px 8px 0px',
    display: 'flex',
    alignItems: 'center',
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
    '&.MuiAvatar-colorDefault': {
      backgroundColor: '#E1E1E1 !important',
    },
  },
  profileDiv: {
    height: '44px',
    width: '44px',
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
  postIconSmall: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px 8px',
    borderRadius: '50%',
    backgroundColor: props?.isBgWhite || props?.isEmergency ? '#F1F1F1' : '#FFF',
    '& svg': {
      width: '16px',
    },
  },
  statusIocn: {
    position: 'absolute',
    zIndex: 1,
    left: '33px',
  },
  logoIcon: {
    position: 'absolute',
    top: '29px',
    zIndex: 1,
    left: '32px',
  },
  subContainer: {
    display: 'grid',
    gridTemplateColumns: '44px calc(100% - 44px)',
  },
  audioContainer: {
    display: 'grid',
    gridTemplateColumns: '30px calc(100% - 30px)',
    marginBottom: '8px',
  },
  postContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '8px',
  },
  mainDescription: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
  },
  subContainer2: {
    display: 'grid',
    gridTemplateColumns: 'auto 8%',
    alignItems: 'center',
    marginBottom: '8px',
  },
  lastCon: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    alignItems: 'center',
    justifyContent: 'sapce-between',
  },
  subContainer3: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
  },
  leftBox: {
    display: 'flex',
    gap: '12px',
  },
  icondiv: {
    height: '30px',
    width: '30px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '50%',
    justifyContent: 'center',
    backgroundColor: '#E1E1E1',
  },
  dotIconDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    width: '9px',
    height: '24px',
  },
  subContainer5: {
    display: 'grid',
    gridTemplateColumns: '30px auto',
    alignItems: 'center',
  },
  subContainer6: {
    display: 'grid',
    gridTemplateColumns: '42px auto 58px',
    alignItems: 'center',
    marginBottom: '8px',
  },
  phaseContainer: {
    display: 'grid',
    backgroundColor: '#252427',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFFFFF',
    borderRadius: '4px',
    width: '100%',
    marginRight: '8px',
    height: '20px',
  },
  msgText: {
    padding: '0px 16px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  paddingleft: {
    paddingLeft: '12px',
  },
  userNametext: {
    color: theme.palette.colors.gray[900],
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontWeight: 600,
  },
  DotsDiv: {
    padding: '5px 4px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: 'inset 0px 0px 1px rgba(0, 0, 0, 0.25)',
    marginRight: '2px',
  },
  captionCon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px 8px',
    backgroundColor: props?.isBgWhite || props?.isEmergency ? '#F1F1F1' : '#FFF',
    borderRadius: '4px',
    flex: '1',
    maxWidth: 'max-content',
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
  postWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px 8px',
    backgroundColor: props?.isBgWhite || props?.isEmergency ? '#F1F1F1' : '#FFF',
    borderRadius: '4px',
  },
}));
