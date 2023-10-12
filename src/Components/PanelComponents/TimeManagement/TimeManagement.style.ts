import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles<any>()(
  (theme, { rowGap, columnGap, alignStart, alignEnd, iconBottomMargin, panel, Label, eventsData }) => ({
    rootRelativeContainer: {
      height: 'inherit',
      position: 'relative',
    },
    mainContainer: {
      backgroundColor: theme.palette.colors.system.white,
      display: 'flex',
      flexDirection: 'column',
      // gap: '31px',
      padding: '20px',
      height: 'inherit',
      // margin: '-1rem', //NOTE: DEV ONLY
      // height: '100vh', //NOTE: DEV ONLY
      position: 'relative',
    },
    overlapDrawerContainer: {
      backgroundColor: theme.palette.colors.system.white,
      display: 'flex',
      flexDirection: 'column',
      // gap: '24px',
      padding: '20px',
      height: '100%',
    },
    overlapDrawer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1050,
      bottom: 0,
      // height: '100vh', //NOTE: DEV ONLY
      // margin: '-1rem', //NOTE: DEV ONLY
      '& .MuiDrawer-paper': {
        width: '100%',
        position: 'initial',
        borderRadius: '8px',
        background: 'transparent !important',
      },
    },
    dividerStyle: {
      backgroundColor: theme.palette.colors.gray[100],
      // margin: '0 -20px',
    },
    reportdiv: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    attachmentWrapper: {
      display: 'grid',
      gridAutoFlow: 'column',
      alignItems: 'center',
      gridAutoColumns: '90% 10%',
      '& svg': {
        cursor: 'pointer',
      },
    },
    bigGrayButton: {
      wordBreak: 'break-word',
      padding: '16px',
      color: theme.palette.colors.theme.primaryLight,
      backgroundColor: `${theme.palette.colors.gray[50]} !important`,
      borderRadius: '4px',
      fontSize: '15px !important',
      '& .MuiIconButton-label': {
        fontSize: 'inherit',
      },
    },
    modalWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '25px',
      marginBottom: '10px',
    },
    wrapperStyle: {
      margin: '30px 0',
    },
    fullWidth: {
      width: '100%',
    },
    tokendiv: {
      marginTop: '-10px',
      '& .MuiChip-outlined': {
        '& .MuiChip-label': {
          color: `#5C5A61 !important`,
        },
      },
    },
    scrollBody: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      overflowY: 'auto',
      overflowX: 'hidden',
      margin: '0 -20px',
      padding: '24px 20px',
      // position: 'relative',
    },
    footerStyle: {
      margin: 'auto -20px -20px',
    },

    primaryText: {
      color: theme.palette.colors.theme.primary,
    },
    secondryText: {
      color: theme.palette.colors.gray[500],
    },

    iconBox: {
      display: 'flex',
    },

    errorStyle: {
      color: theme.palette.colors.red[700],
    },
    titleWrap: {
      marginBottom: '24px',
    },
    selectWrap: {
      // marginBottom:"32px",
    },
    sectionOneWrapper: {
      marginBottom: '-15px',
    },
    radioWrap: {
      marginBottom: '10px',
    },
    addWrapper: {
      margin: '-15px 0 -20px 0',
    },
    ownerdiv: {
      display: 'flex',
      gap: '15px',
    },
    //==== START ICON CONTAINER STYLE====
    iconContainerBox: {
      display: 'grid',
      rowGap: rowGap || '24px',
      columnGap: columnGap || '5px',
      alignItems: alignStart ? 'flex-start' : alignEnd ? 'flex-end' : 'center',
      gridTemplateColumns: '30px 1fr',
      // alignItems: 'end',
    },

    iconWrapper: {
      paddingBottom: iconBottomMargin ? iconBottomMargin : '',
    },
    iconChildrenBox: {
      gridArea: Label ? '2/2' : '1/2',
      display: 'grid',
      gridAutoFlow: 'column',
      gap: '30px',
      alignItems: 'start',
    },
    iconStyle: {
      marginBottom: '5px',
    },
    //==== END ICON CONTAINER STYLE====

    //==== START ADD PEOPLE STYLE====
    addPeopleBox: {},
    searchedResult: {
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '4px 0px 24px 0px #00000026',
      padding: ' 12px 12px 0 12px',
      background: '#FFFFFF',
      zIndex: '1',
      position: 'absolute',
      top: '125px',
      maxHeight:'calc(100% - 233px)',
      overflowX:'auto',
      width: 'calc(100% - 40px)',
    },
    contentWrap: {
      display: 'flex',
      flexDirection: 'column',
    },
    selectMenu: {
      backgroundColor: `${theme.palette.colors.system.white} !important`,
      fontSize: '15px',
      color: theme.palette.colors.gray[500],
      borderBottom: `0.5px solid ${theme.palette.colors.gray[100]}`,
      padding: '16px 16px',
      display: 'block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '&:last-child': { borderBottom: 'none' },
      '&:hover': {
        backgroundColor: `${theme.palette.colors.gray[50]} !important`,
        color: theme.palette.colors.theme.primary,
      },
    },
    //==== END ADD PEOPLE STYLE====

    //==== START EVENT STYLE====
    switchBox: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '20px',
    },
    switchLabel: {
      color: `${theme.palette.colors.theme.primary} !important`,
      margin: '0',
      padding: '0',
      cursor: 'pointer',
    },
    addedPeopleBox: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      gap: '10px',
      padding: '10px 0',
      alignItems: 'center',
      cursor: 'pointer',
    },
    borderBottom: {
      borderBottom: '1px solid #f1f1f1',
    },
    profilePic: {
      borderRadius: '50%',
      height: '34px',
      width: '34px',
      color: theme.palette.colors.system.white,
      backgroundColor: theme.palette.colors.gray[900],
      fontSize: '12px',
      fontWeight: 600,
      fontFamily: 'Graphik',
    },
    peopleTokenBox: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
      '& .MuiChip-root': {
        '& .MuiChip-label': {
          maxWidth: '200px !important',
        },
      },
      '& .MuiChip-label': {
        maxWidth: '200px !important',
      },
    },
    buttonLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
    },
    notificationBox: {
      display: 'flex',
      flexDirection: 'column',
    },
    notifyLabelRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 0',
    },
    channelBox: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },

    avatarBorder: {
      color: `${theme.palette.colors.system.white} !important`,
      fontSize: '8px !important',
      fontWeight: 600,

      height: '24px !important',
      width: '24px !important',
      backgroundColor: theme.palette.colors.gray[900],
      '& .MuiSvgIcon-root': { visibility: 'visible' },
      '& .MuiChip-root .MuiChip-avatar': { color: '#000' },
      '& img': {
        borderRadius: '50%',
        color: '#00000',
      },
    },
    peopleToken: {
      height: '36px !important',
      borderRadius: '50px !important',
      border: `1px solid ${theme.palette.colors.gray[400]} !important`,
    },
    muiChipHeight: {
      height: 'fit-content !important',
      padding: '2px',
    },
    //==== END EVENT STYLE====

    //==== START SLOT STYLE====
    errorMsg: {
      color: '#f44336',
    },
    bookedBox: {},
    bookedHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${theme.palette.colors.theme.primary}`,
    },
    tableBox: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      margin: '20px 0',
    },
    color: {
      color: '#5C5A61',
    },
    pcolor: {
      color: '#5C5A61',
      marginBottom: '4px',
    },
    pcolor2: {
      color: '#A6A6A6',
      marginBottom: '8px',
    },
    tableRow: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    bookedFooter: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      borderTop: `1px solid ${theme.palette.colors.theme.primary}`,
      paddingTop: '20px',
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
    },
    //==== END SLOT STYLE====

    //==== START ADD NOTIFICATION STYLE====
    notifyTokenBox: {
      // gap: '5px',
      display: 'flex',
      flexWrap: 'wrap',
      maxHeight: '100px',
      overflow: 'auto',
      margin: '0 -20px',
      padding: '0 20px',
      gap: '8px',
    },
    notifyBox: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    notifyCheckBox: {
      display: 'flex',
      flexDirection: 'column',
    },
    menuListStyle: {
      transition: '.3s ease',
      display: 'grid',
      gridAutoFlow: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '10px',
      cursor: 'pointer',
      padding: '14px 0',
      borderBottom: `1px solid ${theme.palette.colors.gray[100]}`,
      '&:last-child': { borderBottom: 'none' },
    },
    customNotofyBox: {
      gap: '24px',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '60vh',
      overflow: 'auto',
      margin: '0 -20px',
      padding: '0 20px 20px',
    },

    customInputBox: {
      display: 'grid',
      gridAutoFlow: 'column',
      gap: '16px',
      gridTemplateColumns: '114px 114px auto',
      alignItems: 'end',
    },
    customNotofyInputBox: {
      display: 'flex',
      flexDirection: 'column',
      gap: '28px',
    },
    minusIxon: {
      padding: 0,
      width: 'fit-content',
    },
    removePaddingRL12: {
      padding: '12px 0px !important',
      width:"48px"
    },
    //==== END ADD NOTIFICATION STYLE====

    //==== START CUSTOM REPEAT STYLE====
    repeatBody: {
      display: 'flex',
      flexDirection: 'column',
      gap: '26px',
      padding: '20px 0 50px',
      overflowY: 'auto',
    },
    repeatSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    repeatEveryBox: {
      display: 'grid',
      gridTemplateColumns: '30% 40%',
      gap: '24px',
    },
    endsBox: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      '& .MuiFormControlLabel-root': {
        margin: '0',
        color: `${theme.palette.colors.gray[500]} !important`,
        gap: '12px',
        '&:checked': {
          color: `${theme.palette.colors.theme.primary} !important`,
        },
      },
    },
    endsSection: {
      marginLeft: '36px',
    },

    //==== END CUSTOM REPEAT STYLE====

    //==== START DAYS CHECKBOX STYLE====
    daysBox: {
      display: 'flex',
      gap: '12px',
    },
    daysButton: {
      display: 'inline-block',
      '& label': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '36px',
        height: '36px',
        padding: '0px',
        backgroundColor: theme.palette.colors.system.white,
        borderRadius: '50%',
        transition: '.3s ease',
        cursor: 'pointer',
        color: `${theme.palette.colors.gray[500]} !important`,
        border: `1px solid ${theme.palette.colors.gray[100]}`,
      },
      '& input': {
        display: 'none',
        '&:checked + label': {
          color: `${theme.palette.colors.theme.primary} !important`,
          border: `1px solid ${theme.palette.colors.theme.primary}`,
        },
      },
    },
    //==== END DAYS CHECKBOX STYLE====

    //==== START CUSTOM DURATION STYLE====
    customDurationBox: {
      display: 'grid',
      gridAutoFlow: 'column',
      gap: '16px',
      alignItems: 'start',
      margin: '40px 0 40px',
    },
    inputStyle: {
      fontSize: '17px !important',
    },
    customWrapper: {
      margin: '40px 0 40px',
    },
    errormsg: {
      color: ' #f44336',
      fontSize: '0.75rem',
    },
    //==== END CUSTOM DURATION STYLE====

    //==== START EVENT VIEW STYLE====

    viewHeaderBox: {
      display: 'grid',
      alignItems: 'flex-start',
      gridAutoFlow: 'column',
      gap: '20px',
      gridTemplateColumns: '1fr auto auto',
      backgroundColor: (eventsData?.bookables || []).length !== 0 ? theme.palette.colors.blue[50] : '',
      padding: '0px 20px 0px 20px',
      margin: '0 -1rem',
      // width: '100%',
      '& > button': {
        padding: '0',
      },
    },
    tokenAvatar: {
      maxHeight: '26px',
      maxWidth: '26px',
      borderRadius: '50%',
      color: theme.palette.colors.system.white,
      backgroundColor: theme.palette.colors.gray[900],
      fontSize: '10px',
      fontWeight: 600,
    },
    datetimebox: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    channelbox: {
      display: 'flex',
      alignItems: 'center',
    },
    channeliconBox: {
      display: 'inline-flex',
      margin: '0 16px 0 26px',
    },
    guestsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    guestsBox: {
      display: 'flex',
      gap: '16px',
    },
    avatarBox: {
      position: 'relative',
      alignSelf: 'self-start',
    },
    guestStatusIcon: {
      position: 'absolute',
      width: '12px',
      height: '12px',
      bottom: '0',
      right: '-4px',
      display: 'flex',
    },
    guestTextBox: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    wrapText: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      wordBreak: 'break-all',
    },
    title: {
      color: theme.palette.colors.theme.primary,
      wordBreak: 'break-word',
    },
    otherText: {
      color: theme.palette.colors.gray[500],
      wordBreak: 'break-word',
    },
    textEllipsis: {
      // overflow: 'hidden',
      wordBreak: 'break-word',
      // display: '-webkit-box',
      // WebkitLineClamp: 1,
      // WebkitBoxOrient: 'vertical',
    },
    marginTop16: {
      marginTop: '16px',
    },
    searchBoxBgStyle: {
      borderRadius: '6px',
      backgroundColor: theme.palette.colors.gray[25],
    },
    //==== END EVENT VIEW STYLE====

    headerSection: {
      background: theme.palette.colors.gray[25],
      padding: '4px 20px',
      margin: '0 -20px 20px -20px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
    },
    tenantTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: theme.palette.colors.gray[500],
    },
    dflex: {
      display: 'flex',
      alignItems: 'center',
    },
    cardSelectSection: {
      display: 'grid',
      gap: '10px',
      gridAutoFlow: 'column',
      alignItems: 'center',
      gridTemplateColumns: '1fr 80px',
      boxSizing: 'border-box',
    },
    profileSection: {
      position: 'relative',
      display: 'flex',
    },
    tenantIcon: {
      display: 'flex',
      position: 'absolute',
      right: 0,
      bottom: 0,
      zIndex: 1,
      translate: '50% 0',
    },
    cardContainer: {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      position: 'relative',
      width: '100%',
      padding: '12px 20px',
      borderRadius: '8px',
      backgroundColor: theme.palette.colors.gray[50],
      boxSizing: 'border-box',
      marginBottom: '8px',
    },
    profilePicture: {
      borderRadius: '50%',
      height: '40px',
      width: '40px',
      color: theme.palette.colors.theme.primary,
      backgroundColor: theme.palette.colors.gray[100],
      fontSize: '12px',
      fontWeight: 600,
    },
    iconTitle: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
    },
    profileContentSection: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    textPrimary: {
      color: theme.palette.colors.theme.primary,
      width: '100%',
      overflow: 'hidden',
      wordBreak: 'break-word',
      display: '-webkit-box',
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
    },
    checkFlexbox: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      minWidth: 'fit-content',
      justifySelf: 'self-end',
    },
    radioStyle: {
      // color: theme.palette.colors.gray[500],
      // padding: '0px',
      // '&.Mui-checked': {
      //   color: theme.palette.colors.gray[900],
      // },
      // '& .MuiSvgIcon-root': {
      //   fontSize: 18,
      // },
    },
    roleName: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: '100px',
      display: 'block',
    },
    cardWrapper: {
      marginBottom: '24px',
    },
    tokenWrap: {
      marginBottom: '8px',
    },
    marginStyles: {
      '&.marginB24': {
        marginBottom: '24px',
      },
      '&.marginT24': {
        marginTop: '24px',
      },
    },
    showEventStatus: {
      display: 'flex',
      height: '100px',
      margin: 'auto -20px -20px',
      boxShadow: '0px 14px 74px 0px rgba(0, 0, 0, 0.15)',
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: theme.palette.colors.system.white,
      backgroundColor: '#FFF',
      gap: '8px',
    },
    statusText: {
      color: theme.palette.colors.gray[500],
    },
    statusChange: {
      cursor: 'pointer',
      color: '#373639',
    },
    origzerDiv:{
      marginBottom: '24px'
    },
    organizerHeading:{
      color:'#A6A6A6',
      marginBottom:'8px',
      display:'block'
    },
    addBtn:{
      display:'-webkit-inline-box !important',
      '-webkit-box-pack': 'unset !important',
      width:'24px',
      padding:'0'
    },
    origzerWraper:{
      marginBottom:'12px'
    },
    wrapGuest:{
      display:'flex',
      flexWrap:'wrap',
      gap:'12px'
    },
    wordBreak:{
      wordBreak:'break-word'
    }
  })
);
