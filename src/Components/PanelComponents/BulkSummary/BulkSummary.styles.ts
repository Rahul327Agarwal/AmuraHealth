import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  summaryPanelWrap: {
    background: '#fff',
    paddingTop: '20px',
    height: 'inherit',
    overflowY: 'auto',
  },
  threeDotWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    // paddingRight: "20px",
    // paddingLeft: "20px",
    position: 'relative',
    zIndex: 2,
    gap: '30px',
  },
  backArrow: {
    cursor: 'pointer',
  },
  profileCardWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexFlow: 'column',
    marginBottom: '10px',
    transform: 'translateY(-17px)',
    '& .MuiAvatar-root': {
      background: '#252427 !important',
      color: '#FFFFFF !important',
    },
  },
  profilePic: {
    width: '68px',
    height: '68px',
    borderRadius: '50%',
    background: '#626262',
  },
  profileName: {
    color: '#252427',
    display: 'inline-block',
    padding: '16px 0px 8px',
  },
  caption: {
    color: '#5C5A61',
    display: 'block',
    marginBottom: '10px',
    textAlign: 'center',
  },
  packageCardWrap: {
    background: '#F8F8F8',
    padding: '24px',
    margin: '0px -15px',
  },
  versionCardWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  versionWrap: {
    height: '44px',
    width: '44px',
    borderRadius: '50%',
    background: '#252427',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  versionTextWrap: {
    marginLeft: '12px',
  },
  versionText: {
    color: '#252427',
    marginBottom: '5px',
    display: 'block',
  },
  versionCaption: {
    color: '#252427',
  },
  versionSubCaption: {
    color: '#A6A6A6',
  },
  batchWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  batchText: {
    color: '#5C5A61',
    marginRight: '30px',
  },
  batchIcon: {
    display: 'inline-block',
    marginRight: '17px',
  },
  listingWrap: {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: '0px',
    padding: '28px 20px',
    position: 'relative',
    '&:before': {
      content: "''",
      position: 'absolute',
      height: '1px',
      width: 'calc(100% - 80px)',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#F1F1F1',
      bottom: '0px',
    },
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    width: '130px',
    marginRight: '10px',
    marginBottom: '10px',
    '&:nth-child(3)': {
      // marginRight: "0px"
    },
  },
  listIcon: {
    display: 'inline-block',
    marginRight: '5px',
  },
  featureWrap: {
    padding: '0px 0px 20px',
  },
  featureCard: {
    display: 'flex',
    cursor: 'pointer',
    padding: '16px 20px',
  },
  featureIcon: {
    display: 'block',
    marginRight: '10px',
    height: '32px',
    width: '32px',
    borderRadius: '50%',
  },
  featureTitle: {
    display: 'block',
    color: '#252427',
    marginBottom: '7px',
  },
  featureText: {
    color: '#5C5A61',
    height: '40px',
    overflow: 'hidden',
    margin: '0px',

    wordBreak: 'break-word',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  clamp: {
    margin: 0,
    textOverflow: 'ellipsis',
    overflowWrap: 'break-word',
    // wordBreak: "break-all",
    wordBreak: 'initial',
    '& .hideText': {
      color: '#5C5A61',
      height: 'auto',
      overflow: 'visible',
      wordBreak: 'initial',
    },
  },
  longTRext: {
    overflow: 'visible',
  },
  hideText: {
    margin: 0,
    color: '#5C5A61',
    height: 'auto',
    overflow: 'visible',
    // wordBreak: "break-all",
  },
  readMoreBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    '&:focus': {
      outline: 'none !important',
    },
  },
  contentWrap: {
    width: 'calc(100% - 42px)',
    paddingTop: '7px',
  },
  inject: {
    '& path': {
      fill: '#5C5A61 !important',
    },
  },
  position: {
    position: 'relative',
  },
  textOver: {
    visibility: 'hidden',
    zIndex: -4,
    position: 'absolute',
    wordBreak: 'initial',
  },
  readMoreButton: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  location: {
    marginRight: '8px',
  },
  selectedSnippet: {
    backgroundColor: theme.palette.colors.gray[25],
  },
  textCenter: {
    textAlign: 'center',
    padding: '22px 0',
  },
  sickLeave: {
    padding: '4px 8px',
    border: `1px solid ${theme.palette.colors.gray[900]}`,
    borderRadius: '20px',
    cursor: 'pointer',
    color: theme.palette.colors.gray[900],
  },
  leaveWrapper: {
    background: '#F8F8F8',
    padding: '16px 20px',
    display: 'flex',
  },
  flex: {
    display: 'flex',
    gap: '20px',
    flex: 1,
  },
  leave: {
    display: 'block',
    color: '#5C5A61',
  },
  leaveCircle: {
    height: '36px',
    width: '36px',
    borderRadius: '50%',
    background: '#5C5A61',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    padding: '16px 20px',
    color: '#5C5A61',
  },
  hrStyle: {
    border: '1px solid #F1F1F1',
  },
}));
