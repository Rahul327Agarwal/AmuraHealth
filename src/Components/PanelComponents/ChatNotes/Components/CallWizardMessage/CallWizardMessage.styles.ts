import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  '& *': {
    boxSizing: 'border-box',
  },
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px 0',
  },
  evnetTitle: {
    color: theme.palette.colors.gray[500],
  },
  longTexthandle: {
    wordBreak: 'break-word',
  },
  headerWithLink: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
    gap: '8px',
  },
  description: {
    color: theme.palette.colors.gray[900],
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
  tokenWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
    maxHeight: '145px',
    overflowY: 'auto',
  },
  showMore: {
    color: theme.palette.colors.theme.primaryLight,
    cursor: 'pointer',
  },
  titleWithLink: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
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
  organizerWrap: {
    marginBottom: '20px',
  },
  heading: {
    color: theme.palette.colors.gray[400],
    display: 'block',
    marginBottom: '8px',
  },
  participantLabel: {
    color: theme.palette.colors.gray[900],
    marginBottom: '12px',
  },
  organizerShowMoreCon: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
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
  statusContainer: {
    height: '20px',
    display: 'flex',
    aligntItems: 'center',
  },
  statusText: {
    color: theme.palette.colors.gray[500],
    margin: '3px 6px',
    height: '20px',
  },
}));
