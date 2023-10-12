import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  popover: {
    "& .MuiBackdrop-root":{
      background:'#000000',
      opacity:'0.2 !important',
    },
    zIndex: 1600,
    '& .MuiPaper-root': {
      background: `${theme.palette.colors.system.white} !important`,
      borderRadius: '8px 8px 8px 0',
    },
  },
  statusOption: {
    padding: '14.5px 12px',
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.colors.gray[50],
    },
    gap: '12px',
    display: 'flex',
    alignItems: 'center',
  },
  isCurrentStatus: { background: theme.palette.colors.gray[50] },

  statusAndDate: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  currentStatusIcon: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: theme.palette.colors.system.white,
  },
  loader: {
    color: '#FFFFFF',
    width: '16px !important',
    height: '16px !important',
  },
  loaderSpan: {
    height: '18px',
    marginRight: '4px',
  },
  modalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
  },
  blackBg: {
    '& rect': {
      fill: theme.palette.colors.gray[900],
    },
  },

  hovered: {
    '& rect': {
      fill: theme.palette.colors.system.white,
    },
  },
  currentStatus: {
    '& rect': {
      fill: theme.palette.colors.system.white,
    },
  },
}));
