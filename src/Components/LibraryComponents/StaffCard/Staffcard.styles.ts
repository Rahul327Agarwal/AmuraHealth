import { makeStyles } from 'tss-react/mui';
import { IProps } from './Staffcard.types';

export const useStyles = makeStyles<IProps>()((theme, { injectConponentEnd, ratingValue, lastSeen, ...props }) => ({
  mainContainer: {
    display: 'flex',
    // backgroundColor: isClientSelected ? theme.palette.colors.system.white : theme.palette.colors.gray[50],
    backgroundColor: '#F8F8F8',
    // borderTop: "1px solid #fff",
    borderRadius: '8px',
    '& *': { boxSizing: 'border-box' },
    position: 'relative',
    
  },

  teamCard: {
    height: '100%',
    width: props.width || '100%',
  },
  staffCard: {
    height: '105px',
    // margin: '5px',
    width: '355px',
  },
  card: {
    "&:last-child":{
      marginBottom:'108px'
    }
  },
  bannerDiv: {
    width: '6px',
    height: 'inherit',
  },
  contentContainer: {
    padding: '12px 16px',
    flex: 1,
    display: 'grid',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilecontainer: {
    marginRight: '12px',
  },
  nameCardHeader: {
    display: 'grid',
    gridTemplateColumns: '45px calc(100% - 45px - 12px)',
    gridGap: '12px',
  },
  staffNameCardHeader: {
    display: 'grid',
    gridTemplateColumns: '63px calc(100% - 63px - 12px)',
    gridGap: '12px',
  },
  nameContainer: {
    display: 'grid',
    gridTemplateColumns: !injectConponentEnd ? 'calc(100%)' : 'calc(100% - 24px) 24px',
  },
  nameContainerHead: {},
  nameGrid: {
    display: 'grid',
    gridTemplateColumns: ratingValue ? 'calc(100% - 42px - 12px) 42px' : 'calc(100%)',
    gridGap: '12px',
    alignItems: 'center',
    marginBotton: '4px',
  },
  roleGrid: {
    display: 'grid',
    gridTemplateColumns: lastSeen ? 'calc(100% - 65px - 12px) 65px' : 'calc(100%)',
    gridGap: '12px',
    alignItems: 'center',
  },
  nameConatinerHeadMenu: {
    flex: 0,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  avatarCon: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  staffProfilePic: {
    borderRadius: '50%',
    height: '45px',
    width: '45px',
    color: '#FFFFFF',
    position: 'relative',
    fontSize: '12px',
    fontFamily: 'Graphik',
    fontWeight: 400,
    backgroundColor: theme.palette.colors.gray[900],
  },
  staffProfileDiv: {
    height: '63px',
    width: '63px',
    position: 'relative',
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
    backgroundColor: theme.palette.colors.gray[900],
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
    top: '0px',
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
  flagIcon: {
    display: 'block',
    height: '18px',
    width: '18px',
    position: 'absolute',
    top: '28px',
    zIndex: 1,
    left: '0px',
  },
  dotIconDiv: {
    display: 'flex',
    justifyContent: 'end',
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
    // flex: 1,
    width: '80%',
    //marginRight: "6px",
  },
  staffUserNametext: {
    // color: theme.palette.colors.gray[900],
    color: '#252427',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontWeight: 600,
    // flex: 1,
    width: '80%',
    //marginRight: "6px",
    marginBottom: '6px',
  },
  roleNameText: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: '#5C5A61',
  },
  DotsDiv: {
    padding: '5px 4px',
    display: 'flex',
    alignItems: 'center',
    // backgroundColor: (!isClientSelected ? theme.palette.colors.system.white : theme.palette.colors.gray[50]),
    backgroundColor: theme.palette.colors.system.white,
    borderRadius: '8px',
    boxShadow: 'inset 0px 0px 1px rgba(0, 0, 0, 0.25)',
    marginRight: '2px',
  },

  textColor: {
    color: theme.palette.colors.gray[400],
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },

  nameContainerDesc: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  leftBox: {},
  gcStatusIcon: {
    '& rect': {
      // fill: !isClientSelected ? theme.palette.colors.system.white : theme.palette.colors.gray[50],
      fill: theme.palette.colors.system.white,
    },
    '& path': {
      // fill: edgeColor || "",
      fill: '',
    },
  },

  starIcon: {
    marginRight: '6px',
    display: 'flex',
    alignItems: 'flex-start',
    '& path': {
      fill: '#252427 !important',
    },
  },
  desktopIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  rating: {
    color: theme.palette.colors.gray[500],
  },
  userProfile: {
    color: theme.palette.colors.gray[500],
  },
  dFlex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dFlexEnd: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
  },
  modalBody: {},
  conformText: {
    color: theme.palette.colors.gray[500],
  },
  //select role
  roleContainer: {
    position: 'relative',
    height: '100vh',
    boxSizing: 'border-box',
  },
  selectFooter: {
    position: 'absolute',
    bottom: '0',
    width: '97%',
  },
  mb3: {
    marginBottom: '30px',
  },
  mb2: {
    marginBottom: '16px',
  },
}));
//background: theme.palette.colors.theme.primaryLight,
