import { makeStyles } from 'tss-react/mui';
import { IProps } from './CallWizard.types';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<IProps>()((theme) => ({
  '& *': {
    boxSizing: 'border-box',
  },

  // padding: ({ paddingX }: any) => `0 ${paddingX || "0"} `,

  // middleContainer: (props: IProps) => ({

  mainContainer: {
    borderRadius: '8px',
    background: theme.palette.colors.gray[25], // #F8F8F8 25  #F1F1F1 50
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    '& *': {
      boxSizing: 'border-box',
    },
    //margin: '14px',
  },
  evnetTitle: {
    color: theme.palette.colors.gray[500], //#5C5A61
  },

  longTexthandle: {
    // textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
    // overflow: 'hidden',
    wordBreak: 'break-word',
  },
  headerWithLink: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
    gap: '8px',
  },

  channelWithdurationCon: {
    margin: '0px 0px 12px 0px',
    display: 'flex',
    height: '24px',
    alignItems: 'center',
  },
  textStyle: {
    color: theme.palette.colors.gray[500], //#5C5A61
    '&.marginStyle': {
      marginRight: '28px',
    },
    '&.marginL8': {
      marginLeft: '8px',
    },
    // '&.marginT4': {
    //   marginTop: '4px',
    // },
    '&.marginL36': {
      marginLeft: '36px',
    },
    '&.marginL12': {
      marginLeft: '12px',
    },
    height: '24px',
  },
  iconStyle: {
    //color:theme.palette.colors.gray[500],//#5C5A61
    marginRight: '8px',
  },
  btnsCon: {
    height: '28px',
    marginTop: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
  },
  confirmContainer: {
    marginTop: '12px',
    height: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelContainer: {
    marginTop: '12px',
    display: 'flex',
    flexDirection: 'column',
  },
  statusContainer: {
    height: '20px',
    display: 'flex',
    aligntItems: 'center',
  },
  statusText: {
    color: theme.palette.colors.gray[500], //#5C5A61
    margin: '3px 6px',
    height: '20px',
  },
  description: {
    color: theme.palette.colors.gray[900], //#252427
    wordBreak: 'break-word',
    '&.margin24': {
      marginLeft: '24px',
    },
    '&.marginTB12': {
      margin: '12px 0px',
    },
    '&.marginB12': {
      marginBottom: '12px',
    },
  },
  timeContainer: {
    display: 'flex',
    height: '24px',
    alignItems: 'center',
    color: theme.palette.colors.gray[500], //#5C5A61
    margin: '0px 0px 12px 0px',
    '&.marginB4': {
      marginBottom: '4px',
    },
  },
  allNamesCon: {
    display: 'flex',
    flexDirection: 'column',
    //padding: '0px 4px',
    maxHeight: '118px',
    overflow: 'auto',
  },
  nameConDiv: {
    display: 'flex',
    //padding: '4px 0px',
    margin: '2px 0px',
    overflow: 'hiden',
    flexWrap: 'wrap',
  },
  marginRight: {
    marginRight: '8px',
    marginBottom: '9px',
  },
  copyLink: {
    cursor: 'pointer',
    '& > svg > path': {
      fill: theme.palette.colors.gray[500],
    },
  },
  // Avaibility drawer style
  tokenWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    //margin: '17px 0px 28px 0px',
    flexWrap: 'wrap',
    maxHeight: '145px',
    overflowY: 'auto',
  },
  tokenWrapper2: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    //margin: '17px 0px 28px 0px',
    flexWrap: 'wrap',
    maxHeight: '680px',
    overflowY: 'auto',
  },
  devider: {
    width: '100%',
    border: '1px solid #E1E1E1',
    marginBottom: '28px',
  },
  calenderBg: {
    background: '#FFFFFF !important',
    margin: '0',
  },
  timeSlotsGrid: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    padding: '15px 0px',
  },
  wrapper: {
    position: 'relative',
    height: '550px',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '680px',
    backgroundColor: theme.palette.colors.gray[25],
  },
  fixedTop: {},
  scrollBody: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 'inherit',
    overflowY: 'auto',
    overflowX: 'hidden',
    margin: '0 -20px',
    padding: '0 20px',
  },
  slotWidth: {
    '& > div': {
      width: '90px !important',
    },
  },
  noSlot: {
    textAlign: 'center',
    color: '#5C5A61',
  },
  noSlotsStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    //paddingTop:"15px"
  },
  wrapperCancel: {},
  wrapperText: {
    textAlign: 'center',
    color: '#5C5A61',
    margin: '44px 0',
    display: 'block',
  },
  footerStyle: {
    gap: '15px',
    display: 'flex',
    marginBottom: '32px',
    justifyContent: 'center',
  },
  showMore: {
    color: '#373639',
    cursor: 'pointer',
  },
  marginT12: {
    marginTop: '12px',
  },
  loaderCon: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  //conifrmed wizard style//
  titleWithLink: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  linkContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  marginStyles: {
    '&.marginB16': {
      marginBottom: '16px',
    },
    '&.marginB8': {
      marginBottom: '8px',
    },
    '&.marginT16': {
      marginTop: '16px',
    },
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '&.marginT8': {
      marginTop: '8px',
    },
  },
  buttonStyle: {
    height: '44px',
    minWidth: 'auto !important',
    padding: '12px 24px !important',
    '&.marginL16': {
      marginLeft: '16px',
    },
    '&.height28PaddingTB4LR16': {
      height: '28px  !important',
      padding: '4px 16px  !important',
    },
  },
  sectionContainer: {
    margin: '0px 14px 14px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  organizerWrap: {
    marginBottom: '20px',
  },
  heading: {
    color: '#A6A6A6',
    display: 'block',
    marginBottom: '8px',
  },
  participantLabel: {
    color: theme.palette.colors.gray[900],
    marginBottom: '12px',
  },
  wrap: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  organizerShowMoreCon: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
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
