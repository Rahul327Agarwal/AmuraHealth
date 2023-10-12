import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  partyAttachmentBox: {
    display: 'flex',
    flexDirection: 'column',
    //gap: '15px',
    // marginBottom: '12px',
    cursor: 'pointer',
    //minWidth: '270px',
  },
  attachmentImg: {
    '& img': {
      width: '100%',
      height: '180px',
      objectFit: 'cover',
    },
  },
  attachmentWrapper: {
    // position: 'relative',
    margin: '0 0 15px 0',
  },
  imgWrapper: {
    display: 'flex',
    backgroundColor: theme.palette.colors.system.white,
    '& img': {
      objectFit: 'cover',
      width: '100%',
      height: '80px',
    },
  },
  downloadButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
  },
  errorMessage: {
    color: theme.palette.colors.red[700],
    textAlign: 'center',
  },
  attachmentDetails: {
    display: 'grid',
    gridTemplateColumns: 'calc(15% - 10px) calc(50% - 10px) calc(35%)',
    alignItems: 'center',
    gap: '10px',
  },
  attachmentDetailsWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  flex1: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  attachmentName: {
    color: theme.palette.colors.theme.primary,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  attachmentCount: {
    color: theme.palette.colors.gray[500],
  },
  downloadWrapper: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
  downloadIcon: {
    cursor: 'pointer',
  },
  downloadSize: {
    // maxWidth: '80px',
    // display: 'flex',
    // justifyContent: 'space-between',
    // alignItems: 'baseline',
    margin: '5px 0 0 7px',
    textAlign: 'end',
  },
  dropdown: {
    background: '#FFFFFF',
    borderRadius: '8px 0px 8px 8px',
    width: '154px',
    position: 'absolute',
    top: '20px',
    right: '0',
  },
  dropownOption: {
    padding: '12px',
    cursor: 'pointer',
  },
  downArrow: {
    cursor: 'pointer',
  },
  arrowWraper: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    width: '100%',
  },
  download: {
    color: '#252427',
  },
  downloadIconWrap: {
    padding: '0',
  },
  downloadMenu: {
    '& .MuiTooltip-tooltip': {
      marginTop: '0 !important',
      translate: '-9px !important',
      '& > ul': {
        minWidth: '140px !important',
      },
    },
  },

  messageTextWrapper: {
    marginTop: '12px',
  },
}));
