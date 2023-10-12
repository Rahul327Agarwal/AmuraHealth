import { makeStyles } from 'tss-react/mui';
import { IModalBoxProps } from './ModalBox.types';

export const useStyles = makeStyles<Partial<IModalBoxProps>>()((theme, { panelWidth, buttonPlacement }) => ({
  dialogueBox: {
    zIndex: 1700,
    '& .MuiDialog-paperWidthSm': {
      maxWidth: '4000px !important',
    },
    '& .MuiPaper-rounded': {
      borderRadius: '33px !important',
    },
  },
  modalContainer: {
    background: theme.palette.colors.system.white,
    padding: '33px 20px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    // gap: "20px",
    width: `${panelWidth}px`,
    maxWidth: '426px',
    boxSizing: 'border-box',
    '@media (max-width: 800px)': {
      width: `auto`,
    },
  },
  closeIcon: {
    top: '33px',
    right: '20px',
    color: theme.palette.colors.theme.primary,
    cursor: 'pointer',
    fontSize: '20px',
  },
  modalTitle: {
    color: theme.palette.colors.theme.primary,
    marginBottom: '40px',
  },
  modalBody: {
    color: theme.palette.colors.gray[500],
    textAlign: 'center',
    marginBottom: '40px',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: buttonPlacement || 'center',
    gap: '20px',
    marginBottom: '20px',
  },
  inputStyle: {
    '& .MuiFormLabel-root': {
      fontSize: '15px !important',
    },
  },
  marginR16: {
    margin: '0px 0px 0px 16px',
    float: 'right',
  },
}));
